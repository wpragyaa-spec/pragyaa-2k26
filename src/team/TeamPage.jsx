import { COMMITTEES, TEAM_TITLE, TEAM_SUBTITLE } from './teamData';

const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 13.4c0-3.1-1.66-5.15-4.38-5.15-1.6 0-2.62.87-3.08 1.62V8.5H9.62V20H13v-6.1c0-1.47.6-2.6 2-2.6 1.42 0 2.06 1.06 2.06 2.6V20h3.38v-6.6z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.8 6.6 12 13l8.2-6.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
};
const SOCIAL_LABEL = { linkedin: 'LinkedIn', instagram: 'Instagram', email: 'Email' };

function Socials({ member }) {
  const links = ['linkedin', 'instagram', 'email'].filter((k) => member[k]);
  if (!links.length) return null;
  return (
    <div className="tm-socials">
      {links.map((k) => {
        const isMail = k === 'email';
        return (
          <a
            key={k}
            className="tm-social-btn"
            href={isMail ? `mailto:${member[k]}` : member[k]}
            {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={`${member.name} on ${SOCIAL_LABEL[k]}`}
          >
            {ICONS[k]}
          </a>
        );
      })}
    </div>
  );
}

function MemberCard({ member, code }) {
  return (
    <article className="tm-card">
      <div className="tm-deco" aria-hidden="true">
        <span className="tm-logo">P<i /></span>
        <span className="tm-topline" />
        <span className="tm-star">✦</span>
        <span className="tm-arc tm-arc--outer" />
        <span className="tm-arc tm-arc--inner" />
        <span className="tm-planet" />
        <span className="tm-sideline" />
        <span className="tm-code">{code}</span>
        <span className="tm-plus">+</span>
      </div>
      {member.photo ? (
        <img className="tm-photo" src={member.photo} alt={member.name} loading="lazy" />
      ) : (
        <div className="tm-photo-ph">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="24" r="11" />
            <path d="M12 56c2-11 10-18 20-18s18 7 20 18" />
          </svg>
          <span>Photos coming soon</span>
        </div>
      )}
      <div className="tm-info">
        <h4 className="tm-name">{member.name}</h4>
        <p className="tm-role">{member.role}</p>
        <Socials member={member} />
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <>
      <header className="tp-topbar">
        <a className="tp-brand" href="/">PRAGYAA <span>2027</span></a>
        <a className="tp-back" href="/">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
          </svg>
          Back to site
        </a>
      </header>

      <main className="tp-page">
        <header className="tm-hero">
          <h1 className="tm-title">{TEAM_TITLE}</h1>
          <p className="tm-subtitle">{TEAM_SUBTITLE}</p>
          <span className="tm-divider" aria-hidden="true"><i /></span>
        </header>

        {COMMITTEES.map((c, cIdx) => (
          <section className="tm-committee" key={c.name} aria-labelledby={`tm-c-${cIdx}`}>
            <h2 className="tm-committee-title" id={`tm-c-${cIdx}`}>{c.name}</h2>
            <span className="tm-divider tm-divider--sm" aria-hidden="true"><i /></span>
            <div className="tm-grid">
              {c.members.map((m, mIdx) => (
                <MemberCard
                  key={mIdx}
                  member={m}
                  code={`PRG-${String(cIdx + 1).padStart(2, '0')}${String(mIdx + 1).padStart(2, '0')}`}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="tp-footer">PRAGYAA 2027 · SGGS IE&amp;T Nanded</footer>
    </>
  );
}
