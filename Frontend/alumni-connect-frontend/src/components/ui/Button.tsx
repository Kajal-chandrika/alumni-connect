import type { ButtonHTMLAttributes } from "react";

export default function Button({
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center rounded-md bg-brand-600 text-black px-4 py-2 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed${className}`}
    />
  );
}
