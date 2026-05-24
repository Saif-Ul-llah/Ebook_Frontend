import Link from "next/link";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-crimson text-white shadow-soft hover:bg-deepCrimson focus-visible:outline-crimson",
  secondary:
    "bg-navy text-white shadow-soft hover:bg-darkNavy focus-visible:outline-navy",
  ghost:
    "border border-navy/20 bg-white/45 text-navy hover:border-crimson/40 hover:text-crimson focus-visible:outline-navy",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-normal transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={clsx(base, styles[variant], className)} {...props} />;
}

export function LinkButton({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={clsx(base, styles[variant], className)} href={href} {...props}>
      {children}
    </Link>
  );
}
