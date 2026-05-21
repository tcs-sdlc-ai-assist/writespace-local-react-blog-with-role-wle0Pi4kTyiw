import {
  loadUsers,
  saveUsers,
  loadSession,
  saveSession,
  clearSession,
} from './storage';

/**
 * Authenticate user by email and password.
 * @param {string} email
 * @param {string} password
 * @returns {object|null} user object or null
 */
export function login(email, password) {
  try {
    const users = loadUsers();
    const user = users.find(
      u =>
        u.email &&
        u.password &&
        String(u.email).toLowerCase() === String(email).toLowerCase() &&
        String(u.password) === String(password)
    );
    if (!user) return null;
    // Save session (omit password)
    const sessionUser = { ...user };
    delete sessionUser.password;
    saveSession(sessionUser);
    return sessionUser;
  } catch (err) {
    return null;
  }
}

/**
 * Register a new user.
 * @param {object} userData - { name, email, password, role }
 * @returns {object|null} user object or null
 */
export function register(userData) {
  try {
    const users = loadUsers();
    // Check for duplicate email
    if (
      users.some(
        u =>
          u.email &&
          String(u.email).toLowerCase() === String(userData.email).toLowerCase()
      )
    ) {
      return null;
    }
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'writer',
      avatar: '',
      active: true,
    };
    users.push(newUser);
    saveUsers(users);
    // Save session (omit password)
    const sessionUser = { ...newUser };
    delete sessionUser.password;
    saveSession(sessionUser);
    return sessionUser;
  } catch (err) {
    return null;
  }
}

/**
 * Logout current user (clear session).
 */
export function logout() {
  clearSession();
}

/**
 * Check if user is authenticated.
 * @returns {boolean}
 */
export function isAuthenticated() {
  const user = loadSession();
  return !!user && !!user.email;
}

/**
 * Get current authenticated user.
 * @returns {object|null}
 */
export function getCurrentUser() {
  return loadSession();
}