
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  ShoppingBag,
  Smartphone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [user_mobile, setMobile] = useState("");
  const [user_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    const obj = {
      user_mobile,
      user_password,
    };

    try {
      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/user_login",
        obj
      );

      console.log("Login response:", res.data);

      if (res.data.status === "success" && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/products");
      } else {
        setError(
          res.data.message || "Invalid mobile number or password. Please try again."
        );
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to log in right now. Please check your details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure shopping",
      description: "A smooth and secure shopping experience.",
    },
    {
      icon: Truck,
      title: "Easy ordering",
      description: "Browse products and place your orders with ease.",
    },
    {
      icon: Headphones,
      title: "Here to help",
      description: "We're here to support your shopping journey.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f8f7ff] px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_25px_80px_-25px_rgba(76,29,149,0.22)] lg:grid-cols-2">
          {/* Left side: Welcome panel */}
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-500/20 blur-2xl" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-lg">
                  <ShoppingBag size={25} strokeWidth={2.5} />
                </div>

                <div>
                  <span className="block text-2xl font-black tracking-tight">
                    NovaMart
                  </span>
                  <span className="text-xs font-medium tracking-[0.2em] text-violet-200">
                    SHOP SMARTER
                  </span>
                </div>
              </Link>
            </div>

            <div className="relative my-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
                <Sparkles size={16} />
                Your shopping journey starts here
              </div>

              <h2 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                Great finds.
                <span className="mt-2 block text-violet-200">
                  Great prices.
                </span>
                All in one place.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-violet-100/80">
                Sign in to explore your favorite products, discover something
                new, and enjoy a simpler way to shop.
              </p>

              <div className="mt-9 space-y-5">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p className="mt-1 text-sm text-violet-100/70">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex items-center gap-2 text-sm text-violet-200/80">
              <CheckCircle2 size={17} />
              A better way to shop, every day.
            </div>
          </section>

          {/* Right side: Login form */}
          <section className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16 xl:py-14">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile logo */}
              <Link
                to="/"
                className="mb-9 flex items-center justify-center gap-3 lg:hidden"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-200">
                  <ShoppingBag size={25} />
                </div>

                <span className="text-2xl font-black tracking-tight text-gray-900">
                  Nova<span className="text-violet-700">Mart</span>
                </span>
              </Link>

              <div className="mb-8">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <LockKeyhole size={27} />
                </div>

                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
                  Welcome back
                </p>

                <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                  Sign in to NovaMart
                </h1>

                <p className="mt-3 leading-6 text-gray-500">
                  Enter your account details to continue shopping.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <span className="mt-0.5 font-bold">!</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Mobile number */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Mobile number
                  </label>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <Smartphone
                      size={20}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="mobile"
                      name="user_mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={user_mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your mobile number"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent px-3 py-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-bold text-gray-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        alert("Please connect your password reset flow.")
                      }
                      className="text-sm font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <LockKeyhole
                      size={20}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="password"
                      name="user_password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={user_password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                      className="w-full min-w-0 bg-transparent px-3 py-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-violet-50 hover:text-violet-700"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 accent-violet-700 focus:ring-violet-500"
                  />
                  Remember me
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200/70 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle size={20} className="animate-spin" />
                      Signing you in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={19}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  New to NovaMart?
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Link
                to="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3.5 font-bold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
              >
                Create an account
                <ArrowRight size={18} />
              </Link>

              <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs leading-5 text-gray-400">
                <ShieldCheck size={16} className="shrink-0" />
                Your account details are submitted securely over HTTPS.
              </div>

              <p className="mt-6 text-center text-xs text-gray-400">
                By signing in, you agree to use NovaMart responsibly.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;
