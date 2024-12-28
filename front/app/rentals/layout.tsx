import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="flex max-w-6xl mx-auto">{children}</div>;
}
