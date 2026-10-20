import Image from "next/image";
import Link from "next/link";

export default function CheckoutCancelledPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Image src="/logo.png" alt="" width={56} height={56} className="rounded-2xl" />
      <h1 className="text-2xl font-extrabold text-slate-900">Pagamento não concluído</h1>
      <p className="max-w-sm text-slate-600">Nenhuma cobrança foi feita. Você pode tentar novamente quando quiser.</p>
      <Link href="/#preco" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
        Voltar para o plano
      </Link>
    </div>
  );
}
