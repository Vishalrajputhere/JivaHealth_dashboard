import { useDispatch } from 'react-redux';
import Badge from '../ui/Badge';
import { deleteOrder, updateOrderStatus } from '../../redux/slices/userDetailSlice';
import { formatDate, formatCurrency } from '../../utils/formatters';

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (e) => {
    dispatch(updateOrderStatus({ orderId: order._id, status: e.target.value }));
  };

  const handleDelete = () => {
    if (window.confirm('Delete this order?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  // join all item names into one description string
  const itemDescription = order.items?.map((i) => i.name).join(', ') || 'No items';

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      {/* icon tile */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--jiva-green-light)' }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="2" stroke="#00965e" strokeWidth="1.4" />
          <path d="M7 7h6M7 10h6M7 13h4" stroke="#00965e" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>

      {/* order info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-gray-800 text-sm">
            Order #{order.orderNumber}
          </span>
          <Badge label={order.status} variant={order.status?.toLowerCase()} />
          {order.statusNote && (
            <span className="text-xs text-gray-400 truncate">{order.statusNote}</span>
          )}
        </div>
        <p className="text-sm text-gray-500 truncate">{itemDescription}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {formatDate(order.orderedAt)} &nbsp;·&nbsp;{' '}
          <span className="font-medium text-gray-600">{formatCurrency(order.total)}</span>
        </p>
      </div>

      {/* status dropdown + delete */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <select
            value={order.status}
            onChange={handleStatusChange}
            className="appearance-none pl-3 pr-7 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white focus:outline-none cursor-pointer hover:bg-gray-50"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M2 4l3.5 3.5L9 4" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>

        <button
          onClick={handleDelete}
          className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Delete order"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M2 4h11M5 4V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V4M6 7v5M9 7v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="2" y="4" width="11" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
