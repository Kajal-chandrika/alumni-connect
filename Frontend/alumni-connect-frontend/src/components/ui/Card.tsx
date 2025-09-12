import type { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren) {
  return (
    <div className="bg-white rounded-xl shadow-soft border p-4">{children}</div>
  );
}
