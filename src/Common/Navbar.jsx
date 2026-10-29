
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  Menu,
  X,
  UserRound,
  ShoppingCart,
  LogIn,
  UserPlus,
  ChevronRight,
  Sparkles,
} from "lucide-react";

function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-violet-100/80 bg-white/95 shadow-sm shadow-violet-950/[0.03] backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="NovaMart Home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 transition duration-300 group-hover:scale-105 group-hover:shadow-violet-600/30">
            <ShoppingBag size={23} strokeWidth={2.4} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-gray-900 sm:text-2xl">
              Nova<span className="text-violet-600">Mart</span>
            </h1>
            <p className="hidden text-[9px] font-bold uppercase tracking-[0.19em] text-gray-400 sm:block">
              Your everyday marketplace
            </p>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-violet-50 text-violet-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-violet-600"
              }`}
            >
              {item.name}

              {isActive(item.path) && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-600" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop account actions */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {token ? (
            <>
              <Link
                to="/profile"
                className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition ${
                  isActive("/profile")
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                }`}
              >
                <UserRound size={17} />
                Profile
              </Link>

              <Link
                to="/cart"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/25"
              >
                <ShoppingCart size={17} />
                Cart
                <ChevronRight
                  size={15}
                  className="transition group-hover:translate-x-0.5"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 sm:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-violet-100 bg-white px-4 pb-5 pt-3 shadow-xl shadow-violet-950/5 sm:hidden">
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-violet-600 shadow-sm">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                Welcome to NovaMart
              </p>
              <p className="text-xs text-gray-500">
                Find something you'll love.
              </p>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(item.path)
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-violet-600"
                }`}
              >
                {item.name}
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
            {token ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 px-3 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                >
                  <UserRound size={17} />
                  Profile
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <ShoppingCart size={17} />
                  Cart
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl border border-violet-200 px-3 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-3 text-sm font-bold text-white transition hover:opacity-90"
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
