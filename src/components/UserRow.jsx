import React from 'react';
import PropTypes from 'prop-types';

/**
 * UserRow component for displaying a user in admin user management.
 *
 * @param {object} props
 * @param {string} props.name - User's display name.
 * @param {string} props.email - User's email address.
 * @param {string} props.role - User's role (e.g., "admin", "writer").
 * @param {string} [props.avatar] - Optional avatar image URL.
 * @param {boolean} [props.active] - Whether the user is active.
 * @param {function} [props.onEdit] - Edit handler callback.
 * @param {function} [props.onDelete] - Delete handler callback.
 * @returns {React.ReactNode}
 */
function UserRow({ name, email, role, avatar, active, onEdit, onDelete }) {
  return (
    <div className="bg-slate-800 rounded-lg shadow-md flex items-center p-4 space-x-4 hover:bg-slate-700 transition">
      <div className="w-12 h-12 flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="rounded-full object-cover w-12 h-12 border border-slate-700"
            loading="lazy"
          />
        ) : (
          <div className="rounded-full bg-slate-700 w-12 h-12 flex items-center justify-center text-xl font-bold text-slate-200">
            {name ? name.charAt(0).toUpperCase() : '?'}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-100 truncate">{name}</span>
          <span className={`text-xs px-2 py-0.5 rounded ${role === 'admin' ? 'bg-sky-700 text-sky-200' : 'bg-emerald-700 text-emerald-200'}`}>
            {role}
          </span>
          {active !== undefined && (
            <span className={`text-xs px-2 py-0.5 rounded ${active ? 'bg-emerald-700 text-emerald-200' : 'bg-slate-700 text-slate-400'}`}>
              {active ? 'Active' : 'Inactive'}
            </span>
          )}
        </div>
        <div className="text-slate-400 text-sm truncate">{email}</div>
      </div>
      <div className="flex items-center space-x-2">
        {onEdit && (
          <button
            type="button"
            className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded transition text-sm"
            onClick={onEdit}
            aria-label="Edit user"
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition text-sm"
            onClick={onDelete}
            aria-label="Delete user"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

UserRow.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  active: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default UserRow;