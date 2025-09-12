import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../store/authSlice";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-soft">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="font-semibold tracking-tight text-xl text-brand-700"
        >
          AlumniConnect
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">
                {user.name} · {user.role}
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-md bg-brand-600 text-white text-sm hover:bg-brand-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
