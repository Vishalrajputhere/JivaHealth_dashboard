import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import Spinner from '../components/ui/Spinner';
import OrderCard from '../components/users/OrderCard';
import PaymentCard from '../components/users/PaymentCard';
import FamilyMemberCard from '../components/users/FamilyMemberCard';
import AddFamilyMemberModal from '../components/users/AddFamilyMemberModal';
import {
  fetchUserDetail,
  clearUserDetail,
  updateUser,
  upgradeToPrimeDetail,
  revertToNormalDetail,
} from '../redux/slices/userDetailSlice';
import { formatDate, formatCurrency } from '../utils/formatters';

const TABS = ['Overview', 'Orders & Bookings', 'Payments', 'Family Members'];

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, orders, payments, familyMembers, totalSpent, loading, error } =
    useSelector((state) => state.userDetail);

  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isFamilyModalOpen, setIsFamilyModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    dispatch(fetchUserDetail(id));
    return () => dispatch(clearUserDetail());
  }, [dispatch, id]);

  // pre-fill the edit form when user data loads
  useEffect(() => {
    if (user) {
      setEditForm({
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        gender: user.gender || '',
        bloodGroup: user.bloodGroup || '',
      });
    }
  }, [user]);

  const handleSavePersonalInfo = () => {
    dispatch(updateUser({ userId: id, updates: editForm }));
    setIsEditingInfo(false);
  };

  const handleUpgradeToPrime = () => {
    if (window.confirm(`Upgrade ${user?.name} to Prime membership?`)) {
      dispatch(upgradeToPrimeDetail(id));
    }
  };

  const handleRevertToPrime = () => {
    if (window.confirm(`Revert ${user?.name} back to Normal User?`)) {
      dispatch(revertToNormalDetail(id));
    }
  };

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setIsFamilyModalOpen(true);
  };

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsFamilyModalOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Spinner message="Loading user profile..." />
      </DashboardLayout>
    );
  }

  if (error || !user) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <p className="text-red-500 font-medium">{error || 'User not found.'}</p>
          <button
            onClick={() => navigate('/users')}
            className="mt-4 text-sm text-gray-500 underline"
          >
            Back to User Management
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* back link */}
      <button
        onClick={() => navigate('/users')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to User Management
      </button>

      {/* user header card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
        <div className="flex items-start gap-5">
          <Avatar name={user.name} size="xl" />

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge label={user.status} variant={user.status?.toLowerCase()} />
              <Badge label={user.role} variant="default" />
              <Badge label={user.userType} variant="default" />
              <span className="text-sm text-gray-400">ID: #{user._id?.slice(-4)}</span>
            </div>
            <div className="flex items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="0.75" y="1.75" width="11.5" height="10.5" rx="1.5" stroke="#9ca3af" strokeWidth="1.1" />
                  <path d="M0.75 4.75h11.5" stroke="#9ca3af" strokeWidth="1.1" />
                </svg>
                Joined {formatDate(user.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v5.5l3.5 2" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="#9ca3af" strokeWidth="1.1" />
                </svg>
                Last active {formatDate(user.lastActive)}
              </span>
            </div>
          </div>

          {/* action buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {user.isPrime ? (
              <button
                onClick={handleRevertToPrime}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm border-2 transition-colors"
                style={{ color: 'var(--jiva-green)', borderColor: 'var(--jiva-green)', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--jiva-green-light)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 1v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Revert to Normal
              </button>
            ) : (
              <button
                onClick={handleUpgradeToPrime}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-semibold text-sm transition-colors"
                style={{ backgroundColor: 'var(--jiva-orange)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--jiva-orange-dark)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--jiva-orange)')}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10h10M3 10L2 5l3.5 2.5 1.5-4.5 1.5 4.5L12 5l-1 5H3z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Upgrade to Prime
              </button>
            )}

            <div className="relative">
              <select
                defaultValue={user.status}
                className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 4l3.5 3.5L9 4" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* metric cards */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#eff6ff' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="3" y="2" width="16" height="18" rx="2" stroke="#3b82f6" strokeWidth="1.4" />
              <path d="M7 8h8M7 11h8M7 14h5" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1 leading-tight">Total Booking &<br />Appointment</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--jiva-green)' }}>
              {user.appointmentCount ?? 0}
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--jiva-green-light)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="8" stroke="#00965e" strokeWidth="1.4" />
              <path d="M11 7v4l3 2" stroke="#00965e" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Total Family Member</p>
          <p className="text-3xl font-bold text-gray-900">{familyMembers.length}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--jiva-green-light)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="6" width="18" height="12" rx="2" stroke="#00965e" strokeWidth="1.4" />
              <path d="M2 10h18" stroke="#00965e" strokeWidth="1.4" />
              <circle cx="7" cy="14" r="1.2" fill="#00965e" />
            </svg>
          </div>
        </div>
      </div>

      {/* tab nav */}
      <div className="border-b border-gray-200 mb-5">
        <div className="flex gap-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === tab ? { borderColor: 'var(--jiva-green)', color: 'var(--jiva-green)' } : {}}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* overview tab */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">Personal Information</h2>
              {!isEditingInfo ? (
                <button
                  onClick={() => setIsEditingInfo(true)}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M9 1.5l2.5 2.5-7 7H2V8.5l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingInfo(false)}
                    className="text-xs text-gray-500 px-2 py-1 rounded border border-gray-200 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePersonalInfo}
                    className="text-xs text-white px-3 py-1 rounded font-semibold"
                    style={{ backgroundColor: 'var(--jiva-green)' }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <InfoRow
                icon="email"
                label="Email:"
                value={user.email}
                isEditing={isEditingInfo}
                name="email"
                editValue={editForm.email}
                onEdit={(val) => setEditForm((p) => ({ ...p, email: val }))}
              />
              <InfoRow
                icon="phone"
                label="Phone:"
                value={user.phone}
                isEditing={isEditingInfo}
                name="phone"
                editValue={editForm.phone}
                onEdit={(val) => setEditForm((p) => ({ ...p, phone: val }))}
              />
              <InfoRow
                icon="calendar"
                label="Date of Birth:"
                value={formatDate(user.dateOfBirth)}
                isEditing={isEditingInfo}
                name="dateOfBirth"
                editValue={editForm.dateOfBirth}
                onEdit={(val) => setEditForm((p) => ({ ...p, dateOfBirth: val }))}
                inputType="date"
              />
              <InfoRow
                icon="person"
                label="Gender:"
                value={user.gender}
                isEditing={isEditingInfo}
                name="gender"
                editValue={editForm.gender}
                onEdit={(val) => setEditForm((p) => ({ ...p, gender: val }))}
              />
              <InfoRow
                icon="heart"
                label="Blood Group:"
                value={user.bloodGroup}
                isEditing={isEditingInfo}
                name="bloodGroup"
                editValue={editForm.bloodGroup}
                onEdit={(val) => setEditForm((p) => ({ ...p, bloodGroup: val }))}
              />
            </div>
          </div>

          {/* addresses */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-800">Addresses</h2>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Add
              </button>
            </div>
            <div className="space-y-3">
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((addr) => (
                  <div key={addr._id} className="border border-gray-100 rounded-xl p-4 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--jiva-green-light)' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="#00965e" strokeWidth="1.3" />
                          <circle cx="8" cy="6" r="1.5" stroke="#00965e" strokeWidth="1.3" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-800">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{addr.street}</p>
                        <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.postalCode}</p>
                        <p className="text-sm text-gray-500">{addr.country}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M9 1.5l2.5 2.5-7 7H2V8.5l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </button>
                      <button className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M2 4h9M4 4V2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V4M5 6v4M8 6v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          <rect x="2" y="4" width="9" height="7.5" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No addresses added yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* orders tab */}
      {activeTab === 'Orders & Bookings' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No orders found.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* payments tab */}
      {activeTab === 'Payments' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Payment History</h2>
          {payments.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No payments found.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {payments.map((payment) => (
                <PaymentCard key={payment._id} payment={payment} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* family members tab */}
      {activeTab === 'Family Members' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-800">Family Members</h2>
            <button
              onClick={handleOpenAddMember}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#111827' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Add Member
            </button>
          </div>

          {familyMembers.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No family members added yet. Click "+ Add Member" to get started.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {familyMembers.map((member) => (
                <FamilyMemberCard
                  key={member._id}
                  member={member}
                  onEdit={handleEditMember}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <AddFamilyMemberModal
        isOpen={isFamilyModalOpen}
        onClose={() => {
          setIsFamilyModalOpen(false);
          setEditingMember(null);
        }}
        userId={id}
        existingMember={editingMember}
      />
    </DashboardLayout>
  );
};

// helper component — single row in the personal info card
// switches between read-only display and an editable input
const ICONS = {
  email: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#00965e" strokeWidth="1.2" />
      <path d="M1 4.5l6 4 6-4" stroke="#00965e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  phone: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2h2.5l1 2.5-1.5 1A7 7 0 0 0 8.5 9l1-1.5 2.5 1V11a1 1 0 0 1-1 1C4.7 12 1 8.3 1 3a1 1 0 0 1 1-1z" stroke="#00965e" strokeWidth="1.1" />
    </svg>
  ),
  calendar: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.75" y="1.75" width="12.5" height="11.5" rx="1.5" stroke="#00965e" strokeWidth="1.2" />
      <path d="M0.75 5.25h12.5" stroke="#00965e" strokeWidth="1.2" />
      <path d="M4 0.75v2M10 0.75v2" stroke="#00965e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  person: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="3" stroke="#00965e" strokeWidth="1.2" />
      <path d="M1 13c0-3.3 2.7-4 6-4s6 .7 6 4" stroke="#00965e" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  heart: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 12S1 8 1 4.5a3.5 3.5 0 0 1 6-2.45A3.5 3.5 0 0 1 13 4.5C13 8 7 12 7 12z" stroke="#00965e" strokeWidth="1.2" />
    </svg>
  ),
};

const InfoRow = ({ icon, label, value, isEditing, editValue, onEdit, inputType = 'text' }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--jiva-green-light)' }}>
      {ICONS[icon]}
    </div>
    <span className="text-sm text-gray-500 w-28 flex-shrink-0">{label}</span>
    {isEditing ? (
      <input
        type={inputType}
        value={editValue}
        onChange={(e) => onEdit(e.target.value)}
        className="flex-1 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1"
        style={{ '--tw-ring-color': 'var(--jiva-green)' }}
      />
    ) : (
      <span className="text-sm text-gray-800">{value || '—'}</span>
    )}
  </div>
);

export default UserDetailPage;
