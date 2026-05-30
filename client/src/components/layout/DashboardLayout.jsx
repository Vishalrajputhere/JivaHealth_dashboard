import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      {/* main content pushed right of sidebar and below header */}
      <main className="main-content">
        <div className="p-3 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;

