import Link from "next/link";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r border-fox-border bg-fox-surface flex flex-col">
        <Link href="/admin" className="p-6 border-b border-fox-border">
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/ycPxxz8h/IMG-20260515-100429.png"
              alt="TopUpJASMIN Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <div className="font-display font-bold text-sm">
                JASMIN<span className="text-fox-primary">TOPUP</span>
              </div>
              <div className="text-[10px] text-fox-muted uppercase tracking-widest">
                Admin Panel
              </div>
            </div>
          </div>
        </Link>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { href: "/admin", label: "Dashboard", icon: "📊" },
            { href: "/admin/orders", label: "Orders", icon: "📦" },
            { href: "/admin/games", label: "Games", icon: "🎮" },
            { href: "/admin/products", label: "Products", icon: "💎" },
            { href: "/admin/promo-codes", label: "Promo Codes", icon: "🏷️" },
            { href: "/admin/banners", label: "Banners", icon: "🖼️" },
            { href: "/admin/faqs", label: "FAQ", icon: "❓" },
            { href: "/admin/blog", label: "Blog", icon: "📝" },
            { href: "/admin/customers", label: "Customers", icon: "👥" },
            { href: "/admin/banlist", label: "Banlist", icon: "🚫" },
            { href: "/admin/audit-logs", label: "Audit Log", icon: "📜" },
            { href: "/admin/settings", label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-fox-text/80 hover:bg-fox-card hover:text-fox-primary transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-fox-border">
          <div className="text-xs text-fox-muted mb-1">Signed in as</div>
          <div className="text-sm font-medium mb-3 truncate">{admin.email}</div>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}