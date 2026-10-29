
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Mail,
  ArrowUpRight,
  ArrowUp,
  Send,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();

    // Demo interaction only. Connect a newsletter API to save subscriptions.
    setMessage("Thanks for your interest in NovaMart!");
    setEmail("");
  };

  const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "All Products", to: "/products" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const accountLinks = [
    { label: "My Profile", to: "/profile" },
    { label: "My Orders", to: "/orders" },
    { label: "Shopping Cart", to: "/cart" },
    { label: "Sign In", to: "/login" },
  ];

  const serviceFeatures = [
    { icon: Truck, text: "Convenient shopping" },
    { icon: ShieldCheck, text: "Secure checkout" },
    { icon: Headphones, text: "Customer support" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#100b20] text-gray-300">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-violet-700/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />

      {/* Newsletter banner */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-6 py-10 sm:px-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20">
              <Sparkles size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                Stay connected
              </p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                Good finds. Great updates.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
                Stay up to date with new arrivals, shopping inspiration, and
                special offers from NovaMart.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleNewsletter}
            className="w-full md:max-w-md"
          >
            <div className="flex rounded-2xl border border-white/10 bg-white/[0.06] p-1.5 transition focus-within:border-violet-400/60 focus-within:ring-4 focus-within:ring-violet-500/10">
              <div className="flex min-w-0 flex-1 items-center gap-2 pl-3">
                <Mail size={18} className="shrink-0 text-gray-500" />

                <input
                  type="email"
                  name="newsletter_email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter"
                  required
                  className="w-full min-w-0 bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />
              </div>

              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-500 sm:px-5"
              >
                Join
                <Send size={15} />
              </button>
            </div>

            {message && (
              <p
                role="status"
                className="mt-3 flex items-center gap-2 text-sm text-violet-300"
              >
                <CheckCircle2 size={16} />
                {message}
              </p>
            )}

            <p className="mt-2 text-xs text-gray-500">
              No spam. Just updates worth opening.
            </p>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:py-16">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="group inline-flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-950/40 transition group-hover:scale-105">
              <ShoppingBag size={25} strokeWidth={2.4} />
            </div>

            <span className="text-2xl font-black tracking-tight text-white">
              Nova<span className="text-violet-400">Mart</span>
            </span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
            Discover your next favorite. Explore everyday essentials and
            exciting finds, all in one place.
          </p>

          <a
            href="mailto:support@novamart.com"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-gray-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
          >
            <Mail size={17} className="text-violet-400" />
            Contact our team
            <ArrowUpRight size={15} />
          </a>

          <div className="mt-7 flex flex-wrap gap-2">
            {serviceFeatures.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  title={item.text}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-300"
                >
                  <Icon size={18} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
            Explore
          </h3>

          <div className="mt-6 space-y-4">
            {exploreLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition hover:text-violet-300"
              >
                <span>{item.label}</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Customer care */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
            Customer care
          </h3>

          <div className="mt-6 space-y-4 text-sm">
            <a
              href="mailto:support@novamart.com"
              className="block text-gray-400 transition hover:text-violet-300"
            >
              Help & support
            </a>

            <Link
              to="/contact"
              className="block text-gray-400 transition hover:text-violet-300"
            >
              Contact us
            </Link>

            <Link
              to="/products"
              className="block text-gray-400 transition hover:text-violet-300"
            >
              Browse products
            </Link>

            <Link
              to="/cart"
              className="block text-gray-400 transition hover:text-violet-300"
            >
              Shipping & orders
            </Link>
          </div>

          <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck size={18} className="text-violet-400" />
              Shop with confidence
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Review your order details before completing checkout.
            </p>
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
            Your account
          </h3>

          <div className="mt-6 space-y-4">
            {accountLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group flex w-fit items-center gap-2 text-sm text-gray-400 transition hover:text-violet-300"
              >
                <span>{item.label}</span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>

          <Link
            to="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:shadow-violet-900/40"
          >
            Start shopping
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <p className="text-xs leading-5 text-gray-500">
            © {new Date().getFullYear()} NovaMart. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Crafted with care using{" "}
            <span className="font-semibold text-violet-300">
              React & Tailwind CSS
            </span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
          >
            Back to top
            <ArrowUp
              size={15}
              className="transition group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
