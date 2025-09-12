import { useAppSelector } from "../store";

export function useAuth() {
  const user = useAppSelector((s) => s.auth.user);
  return { user, isAuthenticated: !!user, role: user?.role };
}
