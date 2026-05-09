const SESSION_KEY = 'cdi-user';
const LAST_ACTIVE_KEY = 'cdi-last-active';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function setSession(user: object) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
}

export function getSession() {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(SESSION_KEY);
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  if (!user || !lastActive) return null;
  if (Date.now() - parseInt(lastActive) > THIRTY_DAYS_MS) {
    clearSession();
    return null;
  }
  return JSON.parse(user);
}

export function updateActivity() {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(SESSION_KEY)) {
    localStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LAST_ACTIVE_KEY);
}

export function isSessionExpired(): boolean {
  const lastActive = localStorage.getItem(LAST_ACTIVE_KEY);
  if (!lastActive) return true;
  return Date.now() - parseInt(lastActive) > THIRTY_DAYS_MS;
}
