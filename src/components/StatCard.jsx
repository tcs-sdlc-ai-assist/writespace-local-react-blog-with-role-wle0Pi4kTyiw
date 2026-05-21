import React from 'react';
import PropTypes from 'prop-types';

/**
 * StatCard component for displaying a dashboard statistic.
 *
 * @param {object} props
 * @param {string} props.label - Statistic label (e.g., "Total Posts").
 * @param {number|string} props.value - Statistic value.
 * @param {React.ReactNode} [props.icon] - Optional icon element.
 * @param {string} [props.color] - Optional Tailwind color (e.g., "sky", "emerald").
 * @returns {React.ReactNode}
 */
function StatCard({ label, value, icon, color }) {
  const colorClass = color
    ? `bg-${color}-700 text-${color}-200`
    : 'bg-slate-800 text-slate-200';
  const borderClass = color
    ? `border-${color}-500`
    : 'border-slate-700';

  return (
    <div
      className={`rounded-lg shadow-md border ${borderClass} p-6 flex items-center space-x-4 transition hover:shadow-lg hover:bg-slate-700`}
    >
      {icon && (
        <div className={`w-12 h-12 flex items-center justify-center rounded-full ${color ? `bg-${color}-600` : 'bg-slate-700'} text-2xl`}>
          {icon}
        </div>
      )}
      <div className="flex flex-col">
        <span className={`text-3xl font-bold ${colorClass}`}>{value}</span>
        <span className="mt-1 text-sm text-slate-400 font-medium">{label}</span>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.node,
  color: PropTypes.string,
};

export default StatCard;