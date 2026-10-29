
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  MapPin,
  ShoppingCart,
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  PackageCheck,
  LockKeyhole,
  CheckCircle2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const API = "https://a2zithub.org/dairy/abi/";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");
  const [paymentType, setPaymentType] = useState("COD");

  // Check login and load cart
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    fetchCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch cart items
  function fetchCart() {
    setLoading(true);

    axios
      .post(`${API}cart_list`, {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        console.log("Cart Data:", res.data);

        if (Array.isArray(res.data)) {
          setCartItems(res.data);
        } else {
          setCartItems([]);
          toast.error("Unable to read cart items");
        }
      })
      .catch((err) => {
        console.error("Cart Error:", err.response?.data || err.message);
        toast.error("Unable to load cart items");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Format price in Indian Rupees
  function formatPrice(price) {
    return Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  }

  // Calculate order totals
  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.qty || 0);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => {
    return total + Number(item.qty || 0);
  }, 0);

  // Place order
  function placeOrder(e) {
    e.preventDefault();

    if (submitting) return;

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const obj = {
      area: area.trim(),
      city: city.trim(),
      district: district.trim(),
      state: state.trim(),
      country: country.trim(),
      pincode: pincode.trim(),
      payment_type: paymentType,
      token: token,
    };

    setSubmitting(true);

    axios
      .post(`${API}place_order`, obj)
      .then((res) => {
        console.log("Order Response:", res.data);

        if (res.data.status === "Success") {
          toast.success("Order placed successfully!");

          setCartItems([]);

          setTimeout(() => {
            navigate("/orders");
          }, 1500);
        } else {
          toast.error(res.data.msg || "Unable to place order");
        }
      })
      .catch((err) => {
        console.error(
          "Place Order Error:",
          err.response?.data || err.message
        );

        toast.error("Something went wrong while placing your order");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-violet-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="light"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900">
        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
                <LockKeyhole size={15} />
                Secure checkout
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Checkout
                <span className="text-violet-300">.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-violet-100/80 sm:text-base">
                Just a few more details. Confirm your delivery
                information and get your favorites on their way.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-violet-700">
                <ShoppingCart size={23} />
              </div>

              <div>
                <p className="text-xl font-bold text-white">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
                <p className="text-sm text-violet-100/80">
                  Ready for checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb and progress */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium text-violet-700">
            <CheckCircle2 size={17} />
            <span>Checkout details</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Place order</span>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-violet-100 bg-white px-5 py-20 text-center shadow-sm">
            <RefreshCw
              size={32}
              className="mx-auto animate-spin text-violet-600"
            />
            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Preparing your checkout
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Loading your cart items...
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-3xl border border-violet-100 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50 text-violet-700">
              <ShoppingCart size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              Add some products to your cart before continuing to
              checkout.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={fetchCart}
              className="mx-auto mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700"
            >
              <RefreshCw size={15} />
              Refresh Cart
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <form onSubmit={placeOrder} className="space-y-6">
                {/* Delivery address */}
                <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition hover:shadow-md hover:shadow-violet-100/40">
                  <div className="border-b border-violet-50 p-5 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <MapPin size={23} />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                          Step 01
                        </p>
                        <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                          Delivery Address
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Where should we deliver your order?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelClass}>
                          Area / Street Address
                        </label>
                        <input
                          type="text"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                          placeholder="House number, street, area..."
                          autoComplete="street-address"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter your city"
                          autoComplete="address-level2"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>District</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          placeholder="Enter your district"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>State</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Enter your state"
                          autoComplete="address-level1"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Country</label>
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Enter your country"
                          autoComplete="country-name"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className={labelClass}>Pincode</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]{6}"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) =>
                            setPincode(
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            )
                          }
                          placeholder="Enter 6-digit pincode"
                          autoComplete="postal-code"
                          required
                          className={inputClass}
                        />
                        <p className="mt-2 text-xs text-slate-400">
                          Enter the six-digit postal code for your delivery
                          address.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment method */}
                <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm transition hover:shadow-md hover:shadow-violet-100/40">
                  <div className="border-b border-violet-50 p-5 sm:p-7">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                        <CreditCard size={23} />
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
                          Step 02
                        </p>
                        <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
                          Payment Method
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Choose how you want to pay.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    <label
                      className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition sm:p-5 ${
                        paymentType === "COD"
                          ? "border-violet-500 bg-violet-50/70"
                          : "border-slate-200 bg-white hover:border-violet-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentType === "COD"}
                        onChange={(e) => setPaymentType(e.target.value)}
                        className="h-5 w-5 accent-violet-700"
                      />

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                        <Truck size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-900">
                          Cash on Delivery
                        </p>
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          Pay when your order arrives at your doorstep.
                        </p>
                      </div>

                      {paymentType === "COD" && (
                        <CheckCircle2
                          size={22}
                          className="shrink-0 text-violet-700"
                        />
                      )}
                    </label>

                    <div className="mt-4 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                      <ShieldCheck
                        size={19}
                        className="mt-0.5 shrink-0 text-violet-700"
                      />
                      <p className="text-xs leading-6 text-slate-500">
                        Cash on Delivery is selected. The payment value sent
                        to your existing API is{" "}
                        <span className="font-bold text-slate-700">
                          COD
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </section>

                {/* Submit order */}
                <button
                  type="submit"
                  disabled={submitting || cartItems.length === 0}
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-700 to-indigo-700 px-6 py-4 font-bold text-white shadow-xl shadow-violet-200/70 transition duration-300 hover:-translate-y-0.5 hover:from-violet-800 hover:to-indigo-800 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:py-5"
                >
                  {submitting ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Placing Your Order...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={21} />
                      Place Order · {formatPrice(subtotal)}
                      <ArrowRight
                        size={20}
                        className="transition group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <LockKeyhole size={14} />
                  Your order will be submitted using your login token.
                </p>
              </form>
            </div>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-6">
              <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/50">
                <div className="bg-gradient-to-br from-violet-800 to-indigo-900 p-6 text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-violet-200">
                        Almost yours
                      </p>
                      <h2 className="mt-1 text-2xl font-black">
                        Order Summary
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                      <ShoppingCart size={23} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3">
                    <span className="text-sm text-violet-100">
                      Items in your order
                    </span>
                    <span className="font-bold">{totalItems}</span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">
                      Your Products
                    </h3>
                    <span className="text-xs font-medium text-slate-400">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "product" : "products"}
                    </span>
                  </div>

                  <div className="max-h-[360px] space-y-5 overflow-y-auto pr-1">
                    {cartItems.map((item, index) => (
                      <div
                        key={
                          item.product_econ_cart_id ||
                          item.product_id ||
                          index
                        }
                        className="flex items-center gap-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-violet-50 to-slate-50">
                          <img
                            src={item.product_img}
                            alt={item.product_name || "Product"}
                            loading="lazy"
                            className="h-full w-full object-contain p-1.5"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-800">
                            {item.product_name}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Qty: {item.qty} × {formatPrice(item.price)}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-bold text-slate-900">
                          {formatPrice(
                            Number(item.price || 0) *
                              Number(item.qty || 0)
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="my-6 border-t border-dashed border-violet-200" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-semibold text-slate-800">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 text-slate-500">
                        <Truck size={16} />
                        Shipping
                      </span>
                      <span className="font-bold text-emerald-600">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="my-5 border-t border-violet-100" />

                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-900">
                        Total
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Shipping included
                      </p>
                    </div>

                    <p className="text-2xl font-black tracking-tight text-violet-800">
                      {formatPrice(subtotal)}
                    </p>
                  </div>

                  <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-start gap-3">
                      <PackageCheck
                        size={21}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <div>
                        <p className="text-sm font-bold text-emerald-800">
                          Free shipping unlocked!
                        </p>
                        <p className="mt-1 text-xs leading-5 text-emerald-700">
                          No shipping charge has been added to this
                          summary.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/cart"
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-violet-200 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    <ArrowLeft size={16} />
                    Edit Cart
                  </Link>
                </div>
              </div>

              {/* Trust information */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-violet-100 bg-white p-4">
                  <ShieldCheck size={22} className="text-violet-700" />
                  <p className="mt-3 text-sm font-bold text-slate-800">
                    Safe Checkout
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your login token is used for the order request.
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-white p-4">
                  <Sparkles size={22} className="text-violet-700" />
                  <p className="mt-3 text-sm font-bold text-slate-800">
                    Almost There
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Confirm your details to submit your order.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
