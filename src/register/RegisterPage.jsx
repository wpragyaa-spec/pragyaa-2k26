import { useEffect, useMemo, useRef, useState } from 'react';
import {
  apiConfigured,
  ApiError,
  fetchEvents,
  fetchPaymentInfo,
  submitRegistration,
} from './api.js';

const MAX_SHOT_BYTES = 2 * 1024 * 1024; // mirrors backend MAX_SCREENSHOT_KB default (server is authoritative)
const SHOT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M} .'\-]*$/u;
const EMAIL_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/;

const emptyMember = () => ({ full_name: '', email: '', phone: '', college: '' });

function normPhone(v) {
  const d = String(v || '').replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  return d;
}

function formatInr(n) {
  const num = Number(n);
  return `₹${Number.isInteger(num) ? num : num.toFixed(2)}`;
}

function Field({ label, error, hint, required, children }) {
  return (
    <label className={`reg-field${error ? ' has-error' : ''}`}>
      <span className="reg-label">
        {label}
        {required ? <b aria-hidden="true"> *</b> : null}
      </span>
      {children}
      {hint && !error ? <span className="reg-hint">{hint}</span> : null}
      {error ? <span className="reg-error" role="alert">{error}</span> : null}
    </label>
  );
}

export default function RegisterPage() {
  const slug = useMemo(() => (new URLSearchParams(window.location.search).get('event') || '').trim(), []);

  const [phase, setPhase] = useState('loading'); // loading | ready | error | done
  const [loadError, setLoadError] = useState('');
  const [event, setEvent] = useState(null);
  const [payment, setPayment] = useState(null);

  const [f, setF] = useState({
    full_name: '', email: '', phone: '', college: '', department: '', year_of_study: '',
    team_name: '', utr: '', website: '', // "website" is the honeypot; real users never see it
  });
  const [members, setMembers] = useState([]);
  const [shot, setShot] = useState(null);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    document.title = 'Register — PRAGYAA 2027';
    if (!apiConfigured) {
      setPhase('error');
      setLoadError('not-configured');
      return;
    }
    if (!slug) {
      setPhase('error');
      setLoadError('no-event');
      return;
    }
    let alive = true;
    (async () => {
      try {
        const [events, pay] = await Promise.all([fetchEvents(), fetchPaymentInfo()]);
        if (!alive) return;
        const ev = events.find((e) => e.slug === slug) || null;
        setPayment(pay);
        setEvent(ev);
        if (ev) document.title = `Register — ${ev.title} — PRAGYAA 2027`;
        setPhase('ready');
      } catch (e) {
        if (!alive) return;
        setPhase('error');
        setLoadError(e instanceof ApiError ? e.message : 'Something went wrong while loading.');
      }
    })();
    return () => { alive = false; };
  }, [slug]);

  const isTeam = !!event?.is_team;
  const minMembers = isTeam ? Math.max(0, event.min_team_size - 1) : 0;
  const maxMembers = isTeam ? Math.max(0, event.max_team_size - 1) : 0;
  const feeSet = event && event.fee_amount !== null && event.fee_type !== null;
  const paymentReady = !!payment?.configured;
  const open = !!event?.registration_open && feeSet && paymentReady;

  // Make sure a team form starts with the minimum number of member rows.
  useEffect(() => {
    if (isTeam && members.length < minMembers) {
      setMembers((m) => [...m, ...Array.from({ length: minMembers - m.length }, emptyMember)]);
    }
  }, [isTeam, minMembers, members.length]);

  const teamSize = 1 + (isTeam ? members.length : 0);
  const estimate = !feeSet ? null
    : event.fee_type === 'per_person' ? event.fee_amount * teamSize : event.fee_amount;

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const setMember = (i, k, v) => setMembers((m) => m.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  function validate() {
    const er = {};
    const need = (k, v, label) => { if (!String(v).trim()) er[k] = `${label} is required.`; };
    need('full_name', f.full_name, 'Full name');
    if (f.full_name.trim() && (f.full_name.trim().length < 2 || !NAME_RE.test(f.full_name.trim()))) {
      er.full_name = 'Use letters, spaces, dots, hyphens or apostrophes only.';
    }
    need('email', f.email, 'Email');
    if (f.email.trim() && !EMAIL_RE.test(f.email.trim())) er.email = 'Enter a valid email address.';
    need('phone', f.phone, 'Mobile number');
    if (f.phone.trim() && !/^[6-9][0-9]{9}$/.test(normPhone(f.phone.trim()))) {
      er.phone = 'Enter a valid 10-digit Indian mobile number.';
    }
    need('college', f.college, 'College / institute');
    if (f.college.trim() && f.college.trim().length < 2) er.college = 'Must be at least 2 characters.';
    const utr = f.utr.replace(/\s+/g, '');
    need('utr', utr, 'UTR / transaction reference');
    if (utr && !/^[0-9A-Za-z]{6,40}$/.test(utr)) er.utr = 'Enter the UTR / transaction reference number from your payment app.';

    if (isTeam) {
      need('team_name', f.team_name, 'Team name');
      if (f.team_name.trim() && f.team_name.trim().length < 2) er.team_name = 'Must be at least 2 characters.';
      if (teamSize < event.min_team_size || teamSize > event.max_team_size) {
        er.members = `Team size (including you) must be between ${event.min_team_size} and ${event.max_team_size}.`;
      }
      members.forEach((m, i) => {
        const n = m.full_name.trim();
        if (!n) er[`members.${i}.full_name`] = 'Member name is required.';
        else if (n.length < 2 || !NAME_RE.test(n)) er[`members.${i}.full_name`] = 'Use letters, spaces, dots, hyphens or apostrophes only.';
        if (m.email.trim() && !EMAIL_RE.test(m.email.trim())) er[`members.${i}.email`] = 'Enter a valid email address.';
        if (m.phone.trim() && !/^[6-9][0-9]{9}$/.test(normPhone(m.phone.trim()))) er[`members.${i}.phone`] = 'Enter a valid 10-digit mobile number.';
      });
    }
    if (shot) {
      if (!SHOT_TYPES.includes(shot.type)) er.screenshot = 'Only JPG, PNG or WEBP images are allowed.';
      else if (shot.size > MAX_SHOT_BYTES) er.screenshot = 'Screenshot must be 2 MB or smaller.';
    }
    return er;
  }

  function onShot(e) {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setShot(file);
    setErrors((p) => { const { screenshot, ...rest } = p; return rest; });
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (submitting || !open) return;
    setFormError('');
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) {
      setFormError('Please correct the highlighted fields.');
      requestAnimationFrame(() => {
        const first = document.querySelector('.reg-field.has-error input, .reg-field.has-error select');
        if (first) first.focus();
      });
      return;
    }
    const payload = {
      event: event.slug,
      full_name: f.full_name, email: f.email, phone: f.phone, college: f.college,
      department: f.department, year_of_study: f.year_of_study,
      utr: f.utr, website: f.website,
    };
    if (isTeam) {
      payload.team_name = f.team_name;
      payload.members = members.map((m) => ({
        full_name: m.full_name, email: m.email, phone: m.phone, college: m.college,
      }));
    }
    setSubmitting(true);
    try {
      const reg = await submitRegistration(payload, shot);
      setResult({ ...reg, email: f.email.trim().toLowerCase() });
      setPhase('done');
      window.scrollTo({ top: 0 });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.details && typeof err.details === 'object') setErrors(err.details);
        setFormError(err.message);
        if (err.code === 'DUPLICATE_UTR') setErrors((p) => ({ ...p, utr: err.message }));
        if (err.code === 'ALREADY_REGISTERED') setErrors((p) => ({ ...p, email: err.message }));
        if (['EVENT_CLOSED', 'FEE_NOT_SET', 'EVENT_FULL'].includes(err.code)) {
          // The event state changed after the page loaded: reflect it and close the form.
          setEvent((ev) => (ev ? { ...ev, registration_open: false } : ev));
        }
      } else {
        setFormError('Something went wrong. Please try again.');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  }

  const upiLink = payment?.upi_id && estimate
    ? `upi://pay?pa=${encodeURIComponent(payment.upi_id)}&pn=${encodeURIComponent(payment.payee_name || '')}&am=${encodeURIComponent(Number(estimate).toFixed(2))}&cu=INR&tn=${encodeURIComponent(`PRAGYAA 2027 ${event.title}`.slice(0, 40))}`
    : null;

  const siteHref = import.meta.env.BASE_URL || '/';

  return (
    <div className="reg-shell">
      <header className="reg-top">
        <a className="reg-brand" href={siteHref}>PRAGYAA <span>2027</span></a>
        <span className="reg-tag">// EVENT REGISTRATION</span>
      </header>

      <main className="reg-main">
        {phase === 'loading' && <p className="reg-state" role="status">LOADING EVENT DATA…</p>}

        {phase === 'error' && (
          <section className="reg-card reg-notice" role="alert">
            <h1>Registration unavailable</h1>
            {loadError === 'not-configured' && (
              <p>The registration server address has not been configured for this site yet
                (<code>VITE_API_BASE_URL</code>). Registration is closed until it is set.</p>
            )}
            {loadError === 'no-event' && <p>No event was selected. Open an event on the PRAGYAA site and press “Register Now”.</p>}
            {loadError !== 'not-configured' && loadError !== 'no-event' && <p>{loadError}</p>}
            <a className="reg-btn ghost" href={siteHref}>Back to PRAGYAA 2027</a>
          </section>
        )}

        {phase === 'ready' && !event && (
          <section className="reg-card reg-notice" role="alert">
            <h1>Registration not open yet</h1>
            <p>This event is not available for registration yet. Please check back soon.</p>
            <a className="reg-btn ghost" href={siteHref}>Back to PRAGYAA 2027</a>
          </section>
        )}

        {phase === 'ready' && event && (
          <>
            <section className="reg-card reg-event">
              <p className="reg-kicker">{event.category}</p>
              <h1>{event.title}</h1>
              <dl className="reg-facts">
                <div><dt>Format</dt><dd>{isTeam ? `Team (${event.min_team_size}–${event.max_team_size} members)` : 'Individual'}</dd></div>
                <div>
                  <dt>Fee</dt>
                  <dd>
                    {feeSet
                      ? `${formatInr(event.fee_amount)} ${event.fee_type === 'per_person' ? 'per person' : 'per team'}`
                      : 'Fee to be announced'}
                  </dd>
                </div>
                <div><dt>Status</dt><dd className={open ? 'ok' : 'warn'}>{open ? 'REGISTRATION OPEN' : 'REGISTRATION CLOSED'}</dd></div>
              </dl>
              {!event.registration_open && !feeSet && (
                <p className="reg-banner warn" role="alert">The fee for this event has not been announced yet. Registration is closed until it is confirmed.</p>
              )}
              {!event.registration_open && feeSet && (
                <p className="reg-banner warn" role="alert">Registration for this event is not open right now.</p>
              )}
              {event.registration_open && !paymentReady && (
                <p className="reg-banner warn" role="alert">Official payment details have not been published yet. Registration stays closed until they are available.</p>
              )}
            </section>

            {open && (
              <form className="reg-card reg-form" onSubmit={onSubmit} noValidate>
                {formError && <p className="reg-banner err" role="alert">{formError}</p>}

                <div className="reg-hp" aria-hidden="true">
                  <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
                </div>

                <h2>{isTeam ? 'Team leader details' : 'Your details'}</h2>
                <div className="reg-grid">
                  <Field label="Full name" required error={errors.full_name}>
                    <input value={f.full_name} onChange={set('full_name')} autoComplete="name" maxLength={100} />
                  </Field>
                  <Field label="Email" required error={errors.email} hint="Your confirmation is sent here.">
                    <input type="email" value={f.email} onChange={set('email')} autoComplete="email" maxLength={190} />
                  </Field>
                  <Field label="Mobile number" required error={errors.phone}>
                    <input type="tel" inputMode="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" maxLength={20} />
                  </Field>
                  <Field label="College / institute" required error={errors.college}>
                    <input value={f.college} onChange={set('college')} autoComplete="organization" maxLength={150} />
                  </Field>
                  <Field label="Department" error={errors.department}>
                    <input value={f.department} onChange={set('department')} maxLength={100} />
                  </Field>
                  <Field label="Year of study" error={errors.year_of_study}>
                    <input value={f.year_of_study} onChange={set('year_of_study')} maxLength={20} />
                  </Field>
                </div>

                {isTeam && (
                  <>
                    <h2>Team</h2>
                    <div className="reg-grid">
                      <Field label="Team name" required error={errors.team_name}>
                        <input value={f.team_name} onChange={set('team_name')} maxLength={80} />
                      </Field>
                    </div>
                    <p className="reg-note">
                      Team size including you: <b>{teamSize}</b> (allowed {event.min_team_size}–{event.max_team_size}).
                    </p>
                    {errors.members && <p className="reg-error" role="alert">{errors.members}</p>}
                    {members.map((m, i) => (
                      <fieldset className="reg-member" key={i}>
                        <legend>Member {i + 2}</legend>
                        <div className="reg-grid">
                          <Field label="Full name" required error={errors[`members.${i}.full_name`]}>
                            <input value={m.full_name} onChange={(e) => setMember(i, 'full_name', e.target.value)} maxLength={100} />
                          </Field>
                          <Field label="Email" error={errors[`members.${i}.email`]}>
                            <input type="email" value={m.email} onChange={(e) => setMember(i, 'email', e.target.value)} maxLength={190} />
                          </Field>
                          <Field label="Mobile number" error={errors[`members.${i}.phone`]}>
                            <input type="tel" inputMode="tel" value={m.phone} onChange={(e) => setMember(i, 'phone', e.target.value)} maxLength={20} />
                          </Field>
                          <Field label="College / institute" error={errors[`members.${i}.college`]}>
                            <input value={m.college} onChange={(e) => setMember(i, 'college', e.target.value)} maxLength={150} />
                          </Field>
                        </div>
                        {members.length > minMembers && (
                          <button type="button" className="reg-btn ghost small" onClick={() => setMembers((x) => x.filter((_, j) => j !== i))}>
                            Remove member
                          </button>
                        )}
                      </fieldset>
                    ))}
                    {members.length < maxMembers && (
                      <button type="button" className="reg-btn ghost" onClick={() => setMembers((x) => [...x, emptyMember()])}>
                        + Add team member
                      </button>
                    )}
                  </>
                )}

                <h2>Payment</h2>
                <div className="reg-pay">
                  <div className="reg-pay-info">
                    <p className="reg-amount">
                      Amount to pay: <b>{formatInr(estimate)}</b>
                      <span> {event.fee_type === 'per_person' ? `(${formatInr(event.fee_amount)} × ${teamSize} ${teamSize === 1 ? 'person' : 'people'})` : '(per team)'}</span>
                    </p>
                    <p className="reg-note">The organisers’ server calculates the final amount when you submit.</p>
                    <dl className="reg-facts stacked">
                      <div><dt>UPI ID</dt><dd className="mono">{payment.upi_id}</dd></div>
                      <div><dt>Payee name</dt><dd>{payment.payee_name}</dd></div>
                    </dl>
                    {upiLink && <a className="reg-btn ghost small" href={upiLink}>Open in UPI app</a>}
                  </div>
                  {payment.qr_url && (
                    <img className="reg-qr" src={payment.qr_url} alt={`UPI QR code for ${payment.payee_name || 'PRAGYAA 2027'}`} width="180" height="180" />
                  )}
                </div>
                <p className="reg-note">Pay the exact amount, then enter the UTR / transaction reference from your payment app below.</p>

                <div className="reg-grid">
                  <Field label="UTR / transaction reference" required error={errors.utr} hint="From your payment app’s transaction details. Each UTR can be used once.">
                    <input value={f.utr} onChange={set('utr')} inputMode="numeric" maxLength={40} autoComplete="off" />
                  </Field>
                  <Field label="Payment screenshot" error={errors.screenshot} hint="JPG, PNG or WEBP, up to 2 MB. Helps the organisers verify faster.">
                    <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onShot} />
                  </Field>
                </div>

                <p className="reg-banner info">
                  Submitting this form does not confirm your registration. Your payment is checked by the organisers
                  and your status stays <b>pending</b> until they verify it.
                </p>

                <button className="reg-btn primary" type="submit" disabled={submitting}>
                  {submitting ? 'SUBMITTING…' : 'SUBMIT REGISTRATION'}
                </button>
              </form>
            )}
          </>
        )}

        {phase === 'done' && result && (
          <section className="reg-card reg-done" role="status">
            <p className="reg-kicker">REGISTRATION RECEIVED</p>
            <h1>Pending payment verification</h1>
            <p className="reg-code-label">Your registration code</p>
            <p className="reg-code">{result.reg_code}</p>
            <dl className="reg-facts stacked">
              <div><dt>Event</dt><dd>{result.event}</dd></div>
              {result.team_size > 1 && <div><dt>Team size</dt><dd>{result.team_size}</dd></div>}
              <div><dt>Amount due</dt><dd>{formatInr(result.amount_due)}</dd></div>
              <div><dt>Status</dt><dd className="warn">PENDING VERIFICATION</dd></div>
            </dl>
            <p className="reg-banner info">
              Your registration is <b>not confirmed yet</b>. The organisers will verify your payment and email you at
              <b> {result.email}</b>. Keep this code safe; you will need it for check-in.
            </p>
            <a className="reg-btn ghost" href={siteHref}>Back to PRAGYAA 2027</a>
          </section>
        )}
      </main>

      <footer className="reg-foot">
        {payment?.contact_email || payment?.contact_phone ? (
          <p>Questions? {payment.contact_email}{payment.contact_email && payment.contact_phone ? ' · ' : ''}{payment.contact_phone}</p>
        ) : null}
      </footer>
    </div>
  );
}