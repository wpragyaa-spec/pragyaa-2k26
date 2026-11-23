// Thin client for the PRAGYAA 2027 PHP backend (Stage 2).
// Endpoints used (all public, no credentials, no secrets):
//   GET  /api/events          -> { ok, events: [...] }
//   GET  /api/payment-info    -> { ok, payment: {...} }
//   POST /api/registrations   -> multipart: "payload" (JSON string) + optional "screenshot" file
//
// Base URL comes from VITE_API_BASE_URL (see .env.example). Placeholder / empty = not configured.

const RAW = (import.meta.env.VITE_API_BASE_URL || '').trim();
export const API_BASE = RAW && !RAW.includes('__SET_ME__') ? RAW.replace(/\/+$/, '') : '';
export const apiConfigured = API_BASE !== '';

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'NETWORK', details = null } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details; // field -> message map (VALIDATION_FAILED, UPLOAD_*)
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { credentials: 'omit', ...options });
  } catch (e) {
    throw new ApiError('Could not reach the registration server. Check your connection and try again.');
  }
  let body = null;
  try { body = await res.json(); } catch (e) { /* non-JSON response */ }
  if (!res.ok || !body || body.ok !== true) {
    const err = body && body.error ? body.error : {};
    throw new ApiError(err.message || `Unexpected server response (${res.status}).`, {
      status: res.status,
      code: err.code || 'SERVER_ERROR',
      details: err.details || null,
    });
  }
  return body;
}

export async function fetchEvents() {
  return (await request('/api/events')).events;
}

export async function fetchPaymentInfo() {
  return (await request('/api/payment-info')).payment;
}

export async function submitRegistration(payload, screenshotFile) {
  const fd = new FormData();
  fd.append('payload', JSON.stringify(payload));
  if (screenshotFile) fd.append('screenshot', screenshotFile);
  return (await request('/api/registrations', { method: 'POST', body: fd })).registration;
}