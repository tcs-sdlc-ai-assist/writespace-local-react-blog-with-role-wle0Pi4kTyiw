/**
 * storage.js – localStorage helpers for posts, users, and session.
 * All reads/writes use try/catch and safe fallbacks.
 */

/**
 * Save a value to localStorage under a key.
 * @param {string} key
 * @param {any} value
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Fallback: ignore write error
  }
}

/**
 * Get a value from localStorage by key.
 * @param {string} key
 * @param {any} [defaultValue]
 * @returns {any}
 */
export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    return defaultValue;
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    // Fallback: ignore remove error
  }
}

/**
 * Save posts array to localStorage.
 * @param {Array} posts
 */
export function savePosts(posts) {
  setItem('writespace_posts', posts);
}

/**
 * Load posts array from localStorage.
 * @returns {Array}
 */
export function loadPosts() {
  const posts = getItem('writespace_posts', []);
  return Array.isArray(posts) ? posts : [];
}

/**
 * Save users array to localStorage.
 * @param {Array} users
 */
export function saveUsers(users) {
  setItem('writespace_users', users);
}

/**
 * Load users array from localStorage.
 * @returns {Array}
 */
export function loadUsers() {
  const users = getItem('writespace_users', []);
  return Array.isArray(users) ? users : [];
}

/**
 * Save session (user object) to localStorage.
 * @param {object|null} session
 */
export function saveSession(session) {
  setItem('writespace_session', session);
}

/**
 * Load session (user object) from localStorage.
 * @returns {object|null}
 */
export function loadSession() {
  return getItem('writespace_session', null);
}

/**
 * Clear session from localStorage.
 */
export function clearSession() {
  removeItem('writespace_session');
}