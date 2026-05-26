import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      {/* On md+ screens, push main content right of sidebar */}
      <style>{`@media (min-width: 768px) { .main-content { margin-left: var(--sidebar-width); } }`}</style>

      {/* main content pushed right of sidebar and below header */}
      <main
        className="main-content min-h-screen"
        style={{
          marginLeft: '0',
          paddingTop: 'var(--header-height)',
        }}
      >
        <div className="p-3 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

