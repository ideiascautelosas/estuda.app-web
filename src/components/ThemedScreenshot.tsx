import Image from "next/image";

// An app screen in the site's current theme: both captures are in the
// page and CSS shows the one matching <html class="dark">, so switching
// the site's theme switches the screenshots with no reload or flash.
// Files: public/screenshots/{light,dark}/<name>.png (780 × 1688).
export function ThemedScreenshot({ name, alt, priority = false }: { name: string; alt: string; priority?: boolean }) {
  return (
    <>
      <Image src={`/screenshots/light/${name}.png`} alt={alt} width={390} height={844} className="w-full dark:hidden" priority={priority} />
      <Image src={`/screenshots/dark/${name}.png`} alt={alt} width={390} height={844} className="hidden w-full dark:block" priority={priority} />
    </>
  );
}
