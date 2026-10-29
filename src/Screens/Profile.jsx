
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  UserRound,
  Package,
  Heart,
  MapPin,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  CalendarDays,
  Pencil,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  LoaderCircle,
  RefreshCw,
  X,
  Save,
  ShoppingBag,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  const [pdata, setPdata] = useState({});
  const [formData, setFormData] = useState({
    user_name: "",
    user_mobile: "",
    user_email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  // Fetch profile details
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const res = await axios.post(
          "https://a2zithub.org/dairy/abi/user_profile",
          { token }
        );

        console.log("Profile response:", res.data);

        const profile = res.data?.data?.[0];

        if (!profile) {
          throw new Error("Profile information was not found.");
        }

        if (isMounted) {
          setPdata(profile);

          setFormData({
            user_name: profile.user_name || "",
            user_mobile: profile.user_mobile || "",
            user_email: profile.user_email || "",
          });
        }
      } catch (err) {
        console.error("Profile error:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load your profile. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaveMessage("");
  };

  // This updates the displayed profile only.
  // Connect your profile-update API here to persist changes on the server.
  const handleSave = (e) => {
    e.preventDefault();

    setIsSaving(true);
    setSaveMessage("");

    setPdata((previous) => ({
      ...previous,
      ...formData,
    }));

    setIsEditing(false);
    setIsSaving(false);
    setSaveMessage(
      "Profile updated for this session. Changes are not saved to the server yet."
    );
  };

  const handleCancel = () => {
    setFormData({
      user_name: pdata.user_name || "",
      user_mobile: pdata.user_mobile || "",
      user_email: pdata.user_email || "",
    });

    setIsEditing(false);
    setSaveMessage("");
  };

  const menuItems = [
    {
      name: "My Profile",
      icon: UserRound,
      link: "/profile",
      active: true,
    },
    {
      name: "My Orders",
      icon: Package,
      link: "/orders",
    },
    {
      name: "Wishlist",
      icon: Heart,
      link: "/wishlist",
    },
    {
      name: "Addresses",
      icon: MapPin,
      link: "/addresses",
    },
    {
      name: "Change Password",
      icon: LockKeyhole,
      link: "/change-password",
    },
  ];

  const quickLinks = [
    {
      title: "My Orders",
      description: "Track and view your purchases",
      icon: Package,
      link: "/orders",
      iconStyle: "bg-violet-100 text-violet-700",
    },
    {
      title: "My Cart",
      description: "Review items before checkout",
      icon: ShoppingCart,
      link: "/cart",
      iconStyle: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#f8f7ff] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-32 top-32 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-[500px] h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Page heading */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
              <span className="h-1.5 w-7 rounded-full bg-violet-600" />
              Your personal space
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
              My Account
            </h1>

            <p className="mt-3 max-w-2xl leading-6 text-gray-500">
              Manage your personal information and access your NovaMart
              shopping activity in one place.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white bg-white shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <LoaderCircle size={32} className="animate-spin" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Loading your profile...
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please wait while we retrieve your account details.
              </p>
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <UserRound size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Unable to load your profile
              </h2>

              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
              >
                <RefreshCw size={17} />
                Try again
              </button>
            </div>
          )}

          {/* Main account layout */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
              {/* Sidebar */}
              <aside className="overflow-hidden rounded-[26px] border border-white bg-white shadow-sm lg:col-span-4 xl:col-span-3">
                {/* Profile identity */}
                <div className="relative overflow-hidden bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-900 px-6 pb-7 pt-8 text-center">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute -left-14 bottom-0 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                  <div className="relative mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/15 shadow-xl">
                    {pdata.profile ? (
                      <img
                        src={pdata.profile}
                        alt={pdata.user_name || "Profile"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={50} className="text-white" />
                    )}
                  </div>

                  <h2 className="relative mt-4 break-words text-xl font-black text-white">
                    {pdata.user_name || "NovaMart Member"}
                  </h2>

                  <p className="relative mt-1 break-all text-sm text-violet-100/80">
                    {pdata.user_email || "Email not provided"}
                  </p>

                  <div className="relative mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
                    <Sparkles size={14} />
                    NovaMart Member
                  </div>
                </div>

                {/* Sidebar navigation */}
                <div className="p-4 sm:p-5">
                  <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-gray-400">
                    Account menu
                  </p>

                  <nav className="space-y-1.5">
                    {menuItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 transition ${
                            item.active
                              ? "bg-gradient-to-r from-violet-700 to-indigo-700 text-white shadow-md shadow-violet-200"
                              : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                          }`}
                        >
                          <Icon size={19} />

                          <span className="flex-1 text-sm font-semibold">
                            {item.name}
                          </span>

                          {item.active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}

                          {!item.active && (
                            <ArrowRight
                              size={15}
                              className="text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-violet-600"
                            />
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="my-5 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <LogOut size={19} />
                    Sign out
                    <ArrowRight size={15} className="ml-auto" />
                  </button>

                  <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/70 p-4">
                    <div className="flex items-center gap-2 text-violet-800">
                      <ShieldCheck size={19} />
                      <span className="text-sm font-bold">
                        Your account
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Keep your account information up to date for a smoother
                      shopping experience.
                    </p>
                  </div>
                </div>
              </aside>

              {/* Main profile content */}
              <section className="space-y-6 lg:col-span-8 xl:col-span-9">
                {/* Welcome banner */}
                <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-900 p-6 text-white shadow-lg shadow-violet-200/50 sm:p-9">
                  <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-white/10" />

                  <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
                        <Sparkles size={14} />
                        Welcome back
                      </div>

                      <h2 className="mt-4 break-words text-2xl font-black sm:text-3xl">
                        Hello, {pdata.user_name || "Shopper"}!
                      </h2>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100/80">
                        Your account, your shopping journey. Manage your
                        personal details and quickly access your orders.
                      </p>
                    </div>

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                      <UserRound size={34} />
                    </div>
                  </div>

                  <div className="relative mt-7 flex flex-wrap gap-3 border-t border-white/15 pt-5">
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-violet-800 transition hover:bg-violet-50"
                    >
                      <ShoppingBag size={17} />
                      Browse products
                    </Link>

                    <Link
                      to="/orders"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                    >
                      <Package size={17} />
                      View orders
                    </Link>
                  </div>
                </div>

                {/* Personal information */}
                <div className="rounded-[26px] border border-white bg-white p-5 shadow-sm sm:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                          <UserRound size={21} />
                        </div>

                        <div>
                          <h2 className="text-xl font-black text-gray-900">
                            Personal information
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            Your account details at a glance.
                          </p>
                        </div>
                      </div>
                    </div>

                    {!isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            user_name: pdata.user_name || "",
                            user_mobile: pdata.user_mobile || "",
                            user_email: pdata.user_email || "",
                          });

                          setSaveMessage("");
                          setIsEditing(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 px-5 py-3 text-sm font-bold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50"
                      >
                        <Pencil size={16} />
                        Edit profile
                      </button>
                    )}
                  </div>

                  {saveMessage && (
                    <div
                      role="status"
                      className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800"
                    >
                      <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                      <p>{saveMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleSave}>
                    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition focus-within:border-violet-200 focus-within:bg-white">
                        <label
                          htmlFor="user_name"
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                          <UserRound size={16} className="text-violet-600" />
                          Full name
                        </label>

                        {isEditing ? (
                          <input
                            id="user_name"
                            name="user_name"
                            type="text"
                            autoComplete="name"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                            className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            placeholder="Enter your name"
                          />
                        ) : (
                          <p className="mt-3 break-words font-bold text-gray-900">
                            {pdata.user_name || "Not provided"}
                          </p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition focus-within:border-violet-200 focus-within:bg-white">
                        <label
                          htmlFor="user_mobile"
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                          <Phone size={16} className="text-violet-600" />
                          Mobile number
                        </label>

                        {isEditing ? (
                          <input
                            id="user_mobile"
                            name="user_mobile"
                            type="tel"
                            autoComplete="tel"
                            value={formData.user_mobile}
                            onChange={handleChange}
                            required
                            className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            placeholder="Enter mobile number"
                          />
                        ) : (
                          <p className="mt-3 break-words font-bold text-gray-900">
                            {pdata.user_mobile || "Not provided"}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4 transition focus-within:border-violet-200 focus-within:bg-white">
                        <label
                          htmlFor="user_email"
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                          <Mail size={16} className="text-violet-600" />
                          Email address
                        </label>

                        {isEditing ? (
                          <input
                            id="user_email"
                            name="user_email"
                            type="email"
                            autoComplete="email"
                            value={formData.user_email}
                            onChange={handleChange}
                            required
                            className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                            placeholder="Enter email address"
                          />
                        ) : (
                          <p className="mt-3 break-all font-bold text-gray-900">
                            {pdata.user_email || "Not provided"}
                          </p>
                        )}
                      </div>

                      {/* Account status */}
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                          <CalendarDays
                            size={16}
                            className="text-violet-600"
                          />
                          Account status
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span className="font-bold text-emerald-700">
                            Active member
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-gray-400">
                          Status shown by the profile interface.
                        </p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-7 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                        <p className="text-sm leading-6 text-gray-600">
                          You can edit these details below. Permanent updates
                          require a profile-update API from your backend.
                        </p>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                          >
                            <X size={17} />
                            Cancel
                          </button>

                          <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                          >
                            {isSaving ? (
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                            ) : (
                              <Save size={17} />
                            )}
                            Save changes
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>

                {/* Quick access cards */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-xl font-black text-gray-900">
                      Quick access
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Jump straight to your shopping activity.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {quickLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.title}
                          to={item.link}
                          className="group flex items-center gap-4 rounded-2xl border border-white bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/70 sm:p-6"
                        >
                          <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconStyle}`}
                          >
                            <Icon size={27} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-gray-500">
                              {item.description}
                            </p>
                          </div>

                          <ArrowRight
                            size={19}
                            className="shrink-0 text-gray-300 transition group-hover:translate-x-1 group-hover:text-violet-700"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="flex flex-col justify-between gap-5 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-6 sm:flex-row sm:items-center sm:p-7">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-violet-700">
                      <Sparkles size={17} />
                      Keep exploring
                    </div>

                    <h2 className="mt-2 text-xl font-black text-gray-900">
                      Find something you'll love.
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      Explore the NovaMart collection and discover your next
                      favorite product.
                    </p>
                  </div>

                  <Link
                    to="/products"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Browse products
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;
