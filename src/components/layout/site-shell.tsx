import { Footer } from "./footer";
import { Header } from "./header";

export function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
