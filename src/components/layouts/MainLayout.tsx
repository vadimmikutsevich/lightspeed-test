import { NavLink, useLocation, useOutlet } from "react-router";
import { AnimatePresence, m } from "framer-motion";
import clsx from "clsx";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

import { useCartStore } from "@/features/Cart/store/cart";

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { items } = useCartStore();
  const cartCount = items.length;
  const [menuOpen, setMenuOpen] = useState(false);

  function getLayoutKey(pathname: string) {
    const segments = pathname.split("/").filter(Boolean);
    return "/" + segments.slice(0, 2).join("/");
  }

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/cart", label: `CART (${cartCount})` },
  ];

  return (
    <div className="min-h-screen h-full flex bg-smoke-white text-charcoal-black">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-pure-white flex-col items-start px-8 py-10">
        <div className="flex items-center gap-x-2.5 mb-16">
          <ShoppingBag className="h-7 w-7 text-accent-blue" />
          <h1 className="flex flex-col font-bold leading-none text-charcoal-black">
            <p>MY</p>
            <p>STORE</p>
          </h1>
        </div>

        <nav className="flex flex-col gap-6 text-sm tracking-widest">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "relative uppercase transition-colors duration-300 pl-3 flex items-center",
                  isActive
                    ? "text-accent-blue font-medium"
                    : "text-graphite-gray hover:text-charcoal-black"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      "absolute left-0 h-4 w-1 rounded-sm bg-accent-blue transition-all duration-300 ease-in-out",
                      isActive
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0"
                    )}
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-pure-white flex items-center justify-between px-4 py-3 z-50">
        <div className="flex items-center gap-x-2">
          <ShoppingBag className="h-6 w-6 text-accent-blue" />
          <span className="font-bold text-charcoal-black">MY STORE</span>
        </div>
        <button onClick={() => setMenuOpen((prev) => !prev)}>
          {menuOpen ? (
            <X className="h-6 w-6 text-charcoal-black" />
          ) : (
            <Menu className="h-6 w-6 text-charcoal-black" />
          )}
        </button>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal-black/40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <m.aside
            key="menu"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 bottom-0 w-64 bg-pure-white flex flex-col items-start px-8 py-10 z-50 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-sm tracking-widest mt-12">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "relative uppercase transition-colors duration-300 pl-3 flex items-center",
                      isActive
                        ? "text-accent-blue font-medium"
                        : "text-graphite-gray hover:text-charcoal-black"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={clsx(
                          "absolute left-0 h-4 w-1 rounded-sm bg-accent-blue transition-all duration-300 ease-in-out",
                          isActive
                            ? "opacity-100 scale-y-100"
                            : "opacity-0 scale-y-0"
                        )}
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                      />
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </m.aside>
        )}
      </AnimatePresence>

      {/* Content */}
      <main className="flex-1 p-12 overflow-y-auto relative md:ml-0 mt-14 md:mt-0">
        <AnimatePresence mode="wait">
          <m.div
            key={getLayoutKey(location.pathname)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {outlet}
          </m.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
