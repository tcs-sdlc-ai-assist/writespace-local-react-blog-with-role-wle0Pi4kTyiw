import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar component', () => {
  it('renders initial of name when no avatar is provided', () => {
    const { getByText } = render(<Avatar name="Alice" role="writer" />);
    expect(getByText('A')).toBeTruthy();
  });

  it('renders ? when name is not provided and no avatar', () => {
    const { getByText } = render(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it('renders image when avatar is provided', () => {
    const { getByAltText } = render(
      <Avatar name="Bob" avatar="https://example.com/avatar.jpg" role="admin" />
    );
    const img = getByAltText('Bob');
    expect(img).toBeTruthy();
    expect(img.tagName).toBe('IMG');
    expect(img.src).toContain('https://example.com/avatar.jpg');
  });

  it('applies admin role background and text color', () => {
    const { container } = render(<Avatar name="Admin" role="admin" />);
    const div = container.querySelector('div.rounded-full');
    expect(div.className).toMatch(/bg-sky-700/);
    expect(div.className).toMatch(/text-sky-200/);
  });

  it('applies writer role background and text color', () => {
    const { container } = render(<Avatar name="Writer" role="writer" />);
    const div = container.querySelector('div.rounded-full');
    expect(div.className).toMatch(/bg-emerald-700/);
    expect(div.className).toMatch(/text-emerald-200/);
  });

  it('applies default role background and text color', () => {
    const { container } = render(<Avatar name="User" />);
    const div = container.querySelector('div.rounded-full');
    expect(div.className).toMatch(/bg-slate-700/);
    expect(div.className).toMatch(/text-slate-200/);
  });

  it('applies correct size classes for sm, md, lg', () => {
    const { container: smContainer } = render(<Avatar name="S" size="sm" />);
    const smDiv = smContainer.querySelector('div.flex');
    expect(smDiv.className).toMatch(/w-8/);
    expect(smDiv.className).toMatch(/h-8/);

    const { container: mdContainer } = render(<Avatar name="M" size="md" />);
    const mdDiv = mdContainer.querySelector('div.flex');
    expect(mdDiv.className).toMatch(/w-12/);
    expect(mdDiv.className).toMatch(/h-12/);

    const { container: lgContainer } = render(<Avatar name="L" size="lg" />);
    const lgDiv = lgContainer.querySelector('div.flex');
    expect(lgDiv.className).toMatch(/w-16/);
    expect(lgDiv.className).toMatch(/h-16/);
  });
});