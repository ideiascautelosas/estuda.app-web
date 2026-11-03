import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compra confirmada | Estuda",
  robots: { index: false, follow: false },
};

export default function SimuladoSuccessLayout({ children }: LayoutProps<"/simulados/sucesso">) {
  return children;
}
