import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus simulados | Estuda",
  robots: { index: false, follow: false },
};

export default function MeusSimuladosLayout({ children }: LayoutProps<"/meus-simulados">) {
  return children;
}
