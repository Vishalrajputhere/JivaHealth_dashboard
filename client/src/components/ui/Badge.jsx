const variantStyles = {
  active: 'bg-green-100 text-green-600',
  inactive: 'bg-gray-100 text-gray-500',
  delivered: 'bg-green-100 text-green-600',
  completed: 'bg-green-100 text-green-600',
  pending: 'bg-yellow-100 text-yellow-600',
  cancelled: 'bg-red-100 text-red-500',
  processing: 'bg-blue-100 text-blue-600',
  default: 'bg-gray-100 text-gray-600',
};

const Badge = ({ label, variant = 'default' }) => {
  const styles = variantStyles[variant?.toLowerCase()] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles}`}
    >
      {label}
    </span>
  );
};

export default Badge;
