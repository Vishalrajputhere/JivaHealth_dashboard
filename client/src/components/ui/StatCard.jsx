const StatCard = ({ label, value, valueColor, icon, iconBg }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between flex-1 min-w-0">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p
          className="text-3xl font-bold"
          style={{ color: valueColor || '#111827' }}
        >
          {value ?? '—'}
        </p>
      </div>
      {icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: iconBg || 'var(--jiva-green-light)' }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default StatCard;
