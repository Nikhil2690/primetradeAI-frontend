import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard'},
    { name: 'Tasks', path: '/tasks'},
    { name: 'Profile', path: '/profile'},
  ];

  return (
   // Sidebar.jsx
<aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 pt-16">
  <div className="p-6">
    <nav className="space-y-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              isActive
                ? 'bg-amber-100 text-amber-600 ' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'   
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  </div>
</aside>
  );
};

export default Sidebar;