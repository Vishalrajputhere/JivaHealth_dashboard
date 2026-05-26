import { useState } from 'react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header
      className="fixed top-0 right-0 bg-white border-b border-gray-200 flex items-center px-6 z-20"
      style={{
        left: 'var(--sidebar-width)',
        height: 'var(--header-height)',
      }}
    >
      {/* sidebar toggle */}
      <button
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors mr-4"
        aria-label="Toggle sidebar"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="3" width="16" height="1.5" rx="0.75" fill="#6b7280" />
          <rect x="1" y="8.25" width="16" height="1.5" rx="0.75" fill="#6b7280" />
          <rect x="1" y="13.5" width="16" height="1.5" rx="0.75" fill="#6b7280" />
        </svg>
      </button>

      {/* search bar */}
      <div className="flex-1 max-w-lg mx-auto">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" strokeWidth="1.5" />
            <path d="M10.5 10.5l3.5 3.5" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
            style={{ '--tw-ring-color': 'var(--jiva-green)' }}
          />
        </div>
      </div>

      {/* right side icons */}
      <div className="flex items-center gap-3 ml-4">
        {/* dark mode toggle — visual only for now, not actually implemented */}
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle dark mode"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1a8 8 0 1 0 8 8A6 6 0 0 1 9 1z"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* notification bell */}
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M9 1a6 6 0 0 0-6 6v3l-1.5 2.5h15L15 10V7a6 6 0 0 0-6-6z"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 15.5a2 2 0 0 0 4 0"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">
            1
          </span>
        </button>

        {/* admin avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          style={{ backgroundColor: '#1f6d4a' }}
          title="Admin User"
        >
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
