import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  setItem,
  getItem,
  removeItem,
  savePosts,
  loadPosts,
  saveUsers,
  loadUsers,
  saveSession,
  loadSession,
  clearSession,
} from '../storage';

describe('storage.js localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('setItem and getItem store and retrieve values', () => {
    setItem('test_key', { foo: 'bar' });
    const value = getItem('test_key');
    expect(value).toEqual({ foo: 'bar' });
  });

  it('getItem returns defaultValue if key not found', () => {
    const value = getItem('missing_key', 123);
    expect(value).toBe(123);
  });

  it('removeItem deletes key from localStorage', () => {
    setItem('remove_me', 'gone');
    removeItem('remove_me');
    expect(getItem('remove_me')).toBeNull();
  });

  it('savePosts and loadPosts work with arrays', () => {
    const posts = [{ id: 1, title: 'Post' }];
    savePosts(posts);
    const loaded = loadPosts();
    expect(Array.isArray(loaded)).toBe(true);
    expect(loaded).toEqual(posts);
  });

  it('loadPosts returns empty array if not set', () => {
    expect(loadPosts()).toEqual([]);
  });

  it('saveUsers and loadUsers work with arrays', () => {
    const users = [{ email: 'a@b.com', name: 'A' }];
    saveUsers(users);
    const loaded = loadUsers();
    expect(Array.isArray(loaded)).toBe(true);
    expect(loaded).toEqual(users);
  });

  it('loadUsers returns empty array if not set', () => {
    expect(loadUsers()).toEqual([]);
  });

  it('saveSession and loadSession store and retrieve user object', () => {
    const user = { name: 'Test', email: 'test@site.com' };
    saveSession(user);
    const loaded = loadSession();
    expect(loaded).toEqual(user);
  });

  it('clearSession removes session from localStorage', () => {
    saveSession({ name: 'Test' });
    clearSession();
    expect(loadSession()).toBeNull();
  });

  it('setItem handles invalid JSON gracefully', () => {
    setItem('bad', undefined);
    expect(getItem('bad')).toBeNull();
  });

  it('getItem handles malformed JSON gracefully', () => {
    localStorage.setItem('malformed', '{bad json');
    expect(getItem('malformed')).toBeNull();
  });
});