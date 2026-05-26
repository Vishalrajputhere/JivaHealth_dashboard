const UserFilters = ({ search, onSearchChange, statusFilter, onStatusChange }) => {
  const statusOptions = ['All Status', 'Active', 'Inactive'];

  return (
    <div className="flex items-center gap-3 mb-5">
      {/* search input */}
      <div className="relative flex-1 max-w-xl">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.4" />
          <path d="M10 10l3.5 3.5" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search by patient, doctor, or specialty..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all bg-white"
          style={{ '--tw-ring-color': 'var(--jiva-green)' }}
        />
      </div>

      {/* status filter */}
      <div className="relative">
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="appearance-none pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
        >
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 2h12M3 7h8M5 12h4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>

      {/* user type filter */}
      <div className="relative">
        <select
          className="appearance-none pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 bg-white focus:outline-none cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <option>All Status</option>
          <option>Prime User</option>
          <option>Normal User</option>
        </select>
        <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 2h12M3 7h8M5 12h4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M3 4.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default UserFilters;
