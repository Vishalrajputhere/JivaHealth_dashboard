import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { upgradeToPrime, revertToNormal } from '../../redux/slices/usersSlice';
import { formatDate } from '../../utils/formatters';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpgrade = () => {
    if (window.confirm(`Upgrade ${user.name} to Prime?`)) {
      dispatch(upgradeToPrime(user._id));
    }
  };

  const handleRevert = () => {
    if (window.confirm(`Revert ${user.name} to Normal User?`)) {
      dispatch(revertToNormal(user._id));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow">

      {/* avatar */}
      <Avatar name={user.name} size="md" />

      {/* name + badges — fixed width so layout doesn't shift */}
      <div className="flex-shrink-0" style={{ minWidth: '170px' }}>
        <p className="font-semibold text-gray-900 text-base">{user.name}</p>
        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
          <Badge label={user.role} variant="default" />
          <Badge label={user.status} variant={user.status?.toLowerCase()} />
          <Badge label={user.userType} variant="default" />
        </div>
      </div>

      {/* contact info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
            <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" />
            <path d="M1 4l6 4 6-4" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
            <path d="M2 2h3l1 3-1.5 1A8 8 0 0 0 9 10.5l1-1.5 3 1v3a1 1 0 0 1-1 1C5.4 14 0 8.6 0 3a1 1 0 0 1 1-1z" stroke="#9ca3af" strokeWidth="1.1" />
          </svg>
          <span className="truncate">{user.phone}</span>
        </div>
      </div>

      {/* joined date */}
      <div className="flex-shrink-0" style={{ minWidth: '130px' }}>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="flex-shrink-0">
            <rect x="0.75" y="1.75" width="11.5" height="10.5" rx="1.5" stroke="#9ca3af" strokeWidth="1.2" />
            <path d="M0.75 4.75h11.5" stroke="#9ca3af" strokeWidth="1.2" />
            <path d="M4 0.75v2M9 0.75v2" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span>Joined</span>
        </div>
        <p className="text-sm font-medium text-gray-700">{formatDate(user.createdAt)}</p>
        {user.lastAppointmentDate && (
          <p className="text-xs text-gray-400">Last: {formatDate(user.lastAppointmentDate)}</p>
        )}
      </div>

      {/* appointment count */}
      <div className="flex-shrink-0" style={{ minWidth: '100px' }}>
        <p className="text-xs text-gray-500 mb-1">Appointments</p>
        <p className="text-2xl font-bold text-blue-700">{user.appointmentCount ?? 0}</p>
      </div>

      {/* action buttons — prime toggle always takes same space so the row doesn't jump */}
      <div className="flex items-center gap-2 flex-shrink-0">

        <div style={{ minWidth: '160px' }}>
          {user.isPrime ? (
            <button
              onClick={handleRevert}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border-2 transition-colors"
              style={{
                color: 'var(--jiva-green)',
                borderColor: 'var(--jiva-green)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--jiva-green-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 4l4 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Revert to Normal
            </button>
          ) : (
            <button
              onClick={handleUpgrade}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-semibold transition-colors"
              style={{ backgroundColor: 'var(--jiva-orange)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--jiva-orange-dark)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--jiva-orange)')}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 10h11M2 10L1 4l3 3 2.5-4.5L9 7l3-3-1 6H2z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
              Upgrade to Prime
            </button>
          )}
        </div>

        {/* view button */}
        <button
          onClick={() => navigate(`/users/${user._id}`)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex-shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <ellipse cx="6.5" cy="6.5" rx="5.5" ry="3.5" stroke="#6b7280" strokeWidth="1.2" />
            <circle cx="6.5" cy="6.5" r="1.5" stroke="#6b7280" strokeWidth="1.2" />
          </svg>
          View
        </button>

        {/* edit button */}
        <button
          onClick={() => navigate(`/users/${user._id}`)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors font-medium flex-shrink-0"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M9 2l2 2-7 7H2v-2l7-7z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserCard;
