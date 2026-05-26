import { useDispatch } from 'react-redux';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { deleteFamilyMember } from '../../redux/slices/userDetailSlice';
import { formatDate } from '../../utils/formatters';

const FamilyMemberCard = ({ member, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Remove ${member.name} from family members?`)) {
      dispatch(deleteFamilyMember(member._id));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
      {/* avatar */}
      <Avatar name={member.name} size="md" />

      {/* member info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-gray-800 text-sm">{member.name}</span>
          <Badge label={member.relation} variant="default" />
        </div>
        {member.phone && (
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-0.5">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 2h2.5l1 2.5-1.5 1A7 7 0 0 0 8.5 9l1-1.5 2.5 1V11a1 1 0 0 1-1 1C4.7 12 1 8.3 1 3a1 1 0 0 1 1-1z" stroke="#9ca3af" strokeWidth="1.1" />
            </svg>
            <span>{member.phone}</span>
          </div>
        )}
        {member.dateOfBirth && (
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="0.75" y="1.75" width="11.5" height="10.5" rx="1.5" stroke="#9ca3af" strokeWidth="1.1" />
              <path d="M0.75 4.75h11.5" stroke="#9ca3af" strokeWidth="1.1" />
            </svg>
            <span>{formatDate(member.dateOfBirth)}</span>
          </div>
        )}
      </div>

      {/* edit + delete */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => onEdit && onEdit(member)}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Edit family member"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M10.5 2l2.5 2.5-8 8H2.5V10l8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Remove family member"
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

export default FamilyMemberCard;
