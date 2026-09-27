import Image from "next/image";
import logoSvg from "../../public/logo.svg";
import { siteConfig } from "@/lib/site-config";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Image
      src={logoSvg}
      width={size}
      height={size}
      alt={`Logo de ${siteConfig.name}: flor de loto`}
      className="shrink-0"
      priority
    />
  );
}
