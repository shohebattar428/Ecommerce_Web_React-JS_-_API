
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  UserRound,
  Mail,
  LockKeyhole,
  ShoppingBag,
  Smartphone,
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

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [user_name, setName] = useState("");
  const [user_mobile, setMobile] = useState("");
  const [user_email, setEmail] = useState("");
  const [user_password, setPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please accept the Terms and Conditions to continue.");
      return;
    }

    setIsLoading(true);

    const obj = {
      user_name,
      user_mobile,
      user_email,
      user_password,
    };

    try {
      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/user_register",
        obj
      );

      console.log("Register response:", res.data);

      // Handle common success response formats.
      const status = String(res.data?.status || "").toLowerCase();

      if (
        status === "success" ||
        status === "created" ||
        status === "201"
      ) {
        navigate("/login", {
          state: {
            message: "Account created successfully. Please sign in.",
          },
        });
      } else {
        setError(
          res.data?.message ||
            res.data?.msg ||
            "Registration could not be completed. Please check your details."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Unable to create your account right now. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Shop with confidence",
      description: "Enjoy a straightforward shopping experience.",
    },
    {
      icon: Truck,
      title: "Easy ordering",
      description: "Find products and place orders with ease.",
    },
    {
      icon: Headphones,
      title: "We're here to help",
      description: "Get support throughout your shopping journey.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f8f7ff] px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_25px_80px_-25px_rgba(76,29,149,0.22)] lg:grid-cols-2">
          {/* Left welcome panel */}
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-violet-500/20 blur-2xl" />

            <Link to="/" className="relative inline-flex items-center gap-3">
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

            <div className="relative my-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
                <Sparkles size={16} />
                Your shopping journey starts here
              </div>

              <h1 className="max-w-md text-4xl font-black leading-tight xl:text-5xl">
                Your next great find
                <span className="mt-2 block text-violet-200">
                  starts with an account.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-violet-100/80">
                Create your NovaMart account and discover a simpler way to
                explore products and manage your shopping.
              </p>

              <div className="mt-9 space-y-5">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div
                      key={benefit.title}
                      className="flex items-start gap-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                        <Icon size={21} />
                      </div>

                      <div>
                        <h2 className="font-semibold">{benefit.title}</h2>
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

          {/* Registration form */}
          <section className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-14">
            <div className="mx-auto w-full max-w-md">
              {/* Mobile logo */}
              <Link
                to="/"
                className="mb-8 flex items-center justify-center gap-3 lg:hidden"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-200">
                  <ShoppingBag size={25} />
                </div>

                <span className="text-2xl font-black tracking-tight text-gray-900">
                  Nova<span className="text-violet-700">Mart</span>
                </span>
              </Link>

              <div className="mb-7">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                  <UserRound size={28} />
                </div>

                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
                  Join NovaMart
                </p>

                <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 leading-6 text-gray-500">
                  Fill in your details to get started.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <span className="mt-0.5 font-bold">!</span>
                  <p>{error}</p>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="user_name"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Full name
                  </label>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <UserRound
                      size={19}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      autoComplete="name"
                      value={user_name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="user_email"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Email address
                  </label>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <Mail
                      size={19}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      autoComplete="email"
                      value={user_email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Mobile number */}
                <div>
                  <label
                    htmlFor="user_mobile"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Mobile number
                  </label>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <Smartphone
                      size={19}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="user_mobile"
                      name="user_mobile"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={user_mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your mobile number"
                      required
                      disabled={isLoading}
                      className="w-full bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="user_password"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="group flex items-center rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition focus-within:border-violet-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-100">
                    <LockKeyhole
                      size={19}
                      className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                    />

                    <input
                      id="user_password"
                      name="user_password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={user_password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      minLength={8}
                      required
                      disabled={isLoading}
                      className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
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

                  <p className="mt-2 text-xs text-gray-400">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Terms and conditions */}
                <label className="flex cursor-pointer items-start gap-3 pt-1 text-sm leading-6 text-gray-600">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    disabled={isLoading}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-violet-700 focus:ring-violet-500"
                  />

                  <span>
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-semibold text-violet-700 hover:underline"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-semibold text-violet-700 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                  Already a member?
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3.5 font-bold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
              >
                Sign in to your account
                <ArrowRight size={18} />
              </Link>

              <div className="mt-7 flex items-center justify-center gap-2 text-center text-xs leading-5 text-gray-400">
                <ShieldCheck size={16} className="shrink-0" />
                Your information is submitted securely over HTTPS.
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Register;
