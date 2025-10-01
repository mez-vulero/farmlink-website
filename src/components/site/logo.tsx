import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  withWordmark?: boolean;
  className?: string;
};

export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 shadow-sm shadow-primary/20 ring-1 ring-primary/10 backdrop-blur transition hover:ring-primary/30 ${className ?? ""}`}
    >
      <Image
        src="/farmlink.png"
        alt="FarmLink"
        width={withWordmark ? 156 : 120}
        height={48}
        className={`${withWordmark ? "h-9" : "h-8"} w-auto`}
        priority
      />
    </Link>
  );
}
