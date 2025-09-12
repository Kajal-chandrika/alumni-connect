import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Item = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded-md text-sm hover:bg-gray-100 ${
        isActive ? "bg-gray-100 font-medium" : ""
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Sidebar() {
  const { role } = useAuth();
  return (
    <aside className="hidden md:block w-[var(--sidebar-width)] h-[calc(100vh-56px)] sticky top-14 bg-white border-r">
      <div className="p-3">
        <div className="text-xs uppercase text-gray-500 px-4 mb-2">Main</div>
        <Item to="/" label="Dashboard" />
        <Item to="/events" label="Events" />
        <Item to="/jobs" label="Jobs" />
        <Item to="/messages" label="Community Feed" />
        <div className="text-xs uppercase text-gray-500 px-4 mt-4 mb-2">
          Alumni
        </div>
        <Item to="/alumni/profile" label="My Profile" />
        <Item to="/donations" label="Donations" />
        {role === "admin" && (
          <>
            <div className="text-xs uppercase text-gray-500 px-4 mt-4 mb-2">
              Admin
            </div>
            <Item to="/admin/dashboard" label="Admin Dashboard" />
          </>
        )}
      </div>
    </aside>
  );
}
