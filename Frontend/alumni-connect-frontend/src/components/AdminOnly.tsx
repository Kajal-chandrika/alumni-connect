import type { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AdminOnly({ children }: PropsWithChildren) {
  const { role } = useAuth();
  if (role !== "admin") return null;
  return <>{children}</>;
}
