import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar component for rendering user avatars with role-based visuals.
 *
 * @param {object} props
 * @param {string} [props.name] - User's display name.
 * @param {string} [props.avatar] - Optional avatar image URL.
 * @param {string} [props.role] - User's role ("admin", "writer", etc.).
 * @param {string} [props.size] - Avatar size ("sm", "md", "lg").
 * @returns {React.ReactNode}
 */
function Avatar({ name, avatar, role, size }) {
  let sizeClass = 'w-12 h-12 text-xl';
  if (size === 'sm') sizeClass = 'w-8 h-8 text-base';
  if (size === 'lg') sizeClass = 'w-16 h-16 text-2xl';

  const roleBg =
    role === 'admin'
      ? 'bg-sky-700'
      : role === 'writer'
      ? 'bg-emerald-700'
      : 'bg-slate-700';

  const roleText =
    role === 'admin'
      ? 'text-sky-200'
      : role === 'writer'
      ? 'text-emerald-200'
      : 'text-slate-200';

  return (
    <div className={`flex items-center justify-center ${sizeClass}`}>
      {avatar ? (
        <img
          src={avatar}
          alt={name || 'Avatar'}
          className={`rounded-full object-cover w-full h-full border ${roleBg}`}
          loading="lazy"
        />
      ) : (
        <div
          className={`rounded-full ${roleBg} ${roleText} w-full h-full flex items-center justify-center font-bold`}
        >
          {name ? name.charAt(0).toUpperCase() : '?'}
        </div>
      )}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  role: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Avatar;