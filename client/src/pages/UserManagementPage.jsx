import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatCard from '../components/ui/StatCard';
import Spinner from '../components/ui/Spinner';
import UserCard from '../components/users/UserCard';
import UserFilters from '../components/users/UserFilters';
import { fetchUsers } from '../redux/slices/usersSlice';

const UserManagementPage = () => {
  const dispatch = useDispatch();
  const { list, stats, loading, error } = useSelector((state) => state.users);

  // keeping filters local, don't need them in redux
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  useEffect(() => {
    dispatch(fetchUsers({ search, status: statusFilter }));
  }, [dispatch, search, statusFilter]);

  return (
    <DashboardLayout>
      {/* page header */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage user accounts and permissions
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors"
          style={{ backgroundColor: '#111827' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add User
        </button>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard
          label="Total User"
          value={stats.totalUsers}
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="8" r="4" stroke="#00965e" strokeWidth="1.5" />
              <path d="M3 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#00965e" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Prime User"
          value={stats.primeUsers}
          valueColor="var(--jiva-green)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 16h16M4 16L3 8l5 4 3-7 3 7 5-4-1 8H4z" stroke="#00965e" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          }
        />
        <StatCard
          label="Non-Prime User"
          value={stats.nonPrimeUsers}
          valueColor="var(--jiva-green)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="9" cy="8" r="4" stroke="#00965e" strokeWidth="1.5" />
              <circle cx="16" cy="8" r="3" stroke="#00965e" strokeWidth="1.5" />
              <path d="M1 20c0-4 3.6-6 8-6M13 20c0-3.5 2.5-5.5 6-5.5" stroke="#00965e" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
        <StatCard
          label="Total Family members"
          value={stats.totalFamilyMembers}
          valueColor="var(--jiva-green)"
          icon={
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="8" cy="7" r="3" stroke="#00965e" strokeWidth="1.5" />
              <circle cx="15" cy="7" r="2.5" stroke="#00965e" strokeWidth="1.5" />
              <path d="M2 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00965e" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 13c2.5 0 4.5 2 4.5 5" stroke="#00965e" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          }
        />
      </div>

      <UserFilters
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {loading && <Spinner message="Loading users..." />}

      {!loading && error && (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => dispatch(fetchUsers({}))}
            className="mt-3 text-sm text-gray-500 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-sm">No users found matching your filters.</p>
        </div>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="flex flex-col gap-3">
          {list.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default UserManagementPage;
