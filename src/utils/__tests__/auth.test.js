import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
} from '../auth';
import {
  saveUsers,
  loadUsers,
  saveSession,
  loadSession,
  clearSession,
} from '../storage';

describe('auth.js session helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('login returns user object on valid credentials', () => {
    saveUsers([
      { name: 'Alice', email: 'alice@site.com', password: 'alicepw', role: 'writer' },
      { name: 'Admin', email: 'admin@site.com', password: 'adminpw', role: 'admin' },
    ]);
    const user = login('alice@site.com', 'alicepw');
    expect(user).toBeTruthy();
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@site.com');
    expect(user.role).toBe('writer');
    expect(user.password).toBeUndefined();
    expect(loadSession()).toEqual(user);
  });

  it('login returns null on invalid credentials', () => {
    saveUsers([
      { name: 'Bob', email: 'bob@site.com', password: 'bobpw', role: 'writer' },
    ]);
    const user = login('bob@site.com', 'wrongpw');
    expect(user).toBeNull();
    expect(loadSession()).toBeNull();
  });

  it('register adds new user and returns user object', () => {
    saveUsers([]);
    const userData = {
      name: 'Carol',
      email: 'carol@site.com',
      password: 'carolpw',
      role: 'writer',
    };
    const user = register(userData);
    expect(user).toBeTruthy();
    expect(user.name).toBe('Carol');
    expect(user.email).toBe('carol@site.com');
    expect(user.role).toBe('writer');
    expect(user.password).toBeUndefined();
    expect(loadSession()).toEqual(user);
    const users = loadUsers();
    expect(users.some(u => u.email === 'carol@site.com')).toBe(true);
  });

  it('register returns null for duplicate email', () => {
    saveUsers([
      { name: 'Dave', email: 'dave@site.com', password: 'davepw', role: 'admin' },
    ]);
    const userData = {
      name: 'Dave',
      email: 'dave@site.com',
      password: 'davepw',
      role: 'admin',
    };
    const user = register(userData);
    expect(user).toBeNull();
    expect(loadSession()).toBeNull();
    const users = loadUsers();
    expect(users.length).toBe(1);
  });

  it('logout clears session', () => {
    saveSession({ name: 'Eve', email: 'eve@site.com', role: 'writer' });
    logout();
    expect(loadSession()).toBeNull();
  });

  it('isAuthenticated returns true if session exists', () => {
    saveSession({ name: 'Frank', email: 'frank@site.com', role: 'writer' });
    expect(isAuthenticated()).toBe(true);
  });

  it('isAuthenticated returns false if no session', () => {
    clearSession();
    expect(isAuthenticated()).toBe(false);
  });

  it('getCurrentUser returns session user', () => {
    const user = { name: 'Grace', email: 'grace@site.com', role: 'admin' };
    saveSession(user);
    expect(getCurrentUser()).toEqual(user);
  });

  it('getCurrentUser returns null if no session', () => {
    clearSession();
    expect(getCurrentUser()).toBeNull();
  });

  it('login is case-insensitive for email', () => {
    saveUsers([
      { name: 'Henry', email: 'henry@site.com', password: 'henrypw', role: 'writer' },
    ]);
    const user = login('HENRY@SITE.COM', 'henrypw');
    expect(user).toBeTruthy();
    expect(user.email).toBe('henry@site.com');
  });

  it('register defaults role to writer if not provided', () => {
    saveUsers([]);
    const userData = {
      name: 'Ivy',
      email: 'ivy@site.com',
      password: 'ivypw',
    };
    const user = register(userData);
    expect(user).toBeTruthy();
    expect(user.role).toBe('writer');
  });
});