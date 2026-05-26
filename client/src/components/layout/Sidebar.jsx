import { NavLink } from 'react-router-dom';

// only User Management is a real route right now, others are placeholders
const navItems = [
  { label: 'Dashboard', icon: '⊞', path: null },
  { label: 'Organization', icon: '🏢', path: null },
  { label: 'User Management', icon: '👥', path: '/users' },
  { label: 'Services', icon: '💼', path: null, hasChevron: true },
  { label: 'Consultation', icon: '🩺', path: null },
  { label: 'Lab test Booking', icon: '🧪', path: null },
  { label: 'Medicine Orders', icon: '💊', path: null },
  { label: 'Ambulance booking', icon: '🚑', path: null },
  { label: 'Vendor & Partners', icon: '🤝', path: null },
  { label: 'Report', icon: '📋', path: null },
  { label: 'User Access', icon: '🛡️', path: null },
  { label: 'Setting', icon: '⚙️', path: null },
];

const Sidebar = () => {
  return (
    <aside
      className="fixed top-0 left-0 h-full bg-white border-r border-gray-200 hidden md:flex flex-col z-30"
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 px-6">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-bold" style={{ color: 'var(--jiva-green)' }}>
              Jiva
            </span>
            <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Health
            </span>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2v16M2 10h16" stroke="#00965e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            if (item.path) {
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`
                    }
                    style={({ isActive }) =>
                      isActive
                        ? { backgroundColor: 'var(--jiva-green)' }
                        : {}
                    }
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <div className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.hasChevron && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5l3 3 3-3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* admin user at the bottom */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: '#1f6d4a' }}
          >
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">Admin@healthcare.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
