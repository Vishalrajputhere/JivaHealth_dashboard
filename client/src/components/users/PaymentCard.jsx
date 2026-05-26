import Badge from '../ui/Badge';
import { formatDate, formatCurrency } from '../../utils/formatters';

const typeIconColors = {
  'Consultation Fee': '#00965e',
  'Lab Test': '#1d4ed8',
  'Medicine Order': '#7c3aed',
  'Ambulance': '#dc2626',
  'Other': '#6b7280',
};

const PaymentCard = ({ payment }) => {
  const iconColor = typeIconColors[payment.type] || '#6b7280';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${iconColor}15` }} // 15 = ~9% opacity in hex
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="11" rx="2" stroke={iconColor} strokeWidth="1.4" />
          <path d="M2 9h16" stroke={iconColor} strokeWidth="1.4" />
          <circle cx="6" cy="13" r="1" fill={iconColor} />
        </svg>
      </div>

      {/* payment info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-gray-800 text-sm">{payment.type}</span>
          <Badge label={payment.status} variant={payment.status?.toLowerCase()} />
        </div>
        {payment.description && (
          <p className="text-sm text-gray-500 truncate">{payment.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(payment.paidAt)} &nbsp;·&nbsp;
          <span className="text-gray-500">{payment.method}</span>
        </p>
      </div>

      {/* amount on the right */}
      <div className="flex-shrink-0">
        <span className="text-base font-semibold text-gray-800">
          {formatCurrency(payment.amount)}
        </span>
      </div>
    </div>
  );
};

export default PaymentCard;
