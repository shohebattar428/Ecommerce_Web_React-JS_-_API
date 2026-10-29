import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  ShoppingCart,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Truck,
  ShieldCheck,
  PackageCheck,
  RefreshCw,
  Sparkles,
  LockKeyhole,
} from "lucide-react";
import axios from "axios";

const API = "https://a2zithub.org/dairy/abi/";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const token = localStorage.getItem("token");

  // Format prices in Indian Rupees
  function formatPrice(price) {
    return Number(price || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.qty || 0);
  }, 0);

  const totalItems = cartItems.reduce((total, item) => {
    return total + Number(item.qty || 0);
  }, 0);

  // Fetch cart items
  function fetchCart(showLoader = true) {
    if (showLoader) {
      setLoading(true);
    }

    setError("");

    axios
      .post(`${API}cart_list`, {
        token: token,
      })
      .then((res) => {
        console.log("Cart Data:", res.data);

        if (Array.isArray(res.data)) {
          setCartItems(res.data);
        } else {
          setCartItems([]);
          setError("Unexpected cart response from the server.");
        }
      })
      .catch((err) => {
        console.error("Cart Error:", err.response?.data || err.message);
        setError("Unable to load your cart. Please try again.");
      })
      .finally(() => {
        if (showLoader) {
          setLoading(false);
        }
      });
  }

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Increase or decrease quantity
  function updateQuantity(item, change) {
    const quantity = Number(item.qty || 0);

    if (change === -1 && quantity <= 1) {
      return;
    }

    if (actionLoading !== null) {
      return;
    }

    const endpoint =
      change === 1 ? "inc_cart_qty" : "dec_cart_qty";

    setActionLoading(item.product_econ_cart_id);

    axios
      .post(`${API}${endpoint}`, {
        product_econ_cart_id: item.product_econ_cart_id,
        token: token,
      })
      .then((res) => {
        console.log("Quantity Update Response:", res.data);
        fetchCart(false);
      })
      .catch((err) => {
        console.error(
          "Quantity Update Error:",
          err.response?.data || err.message
        );

        alert("Unable to update quantity. Please try again.");
      })
      .finally(() => {
        setActionLoading(null);
      });
  }

  // Remove product from cart
  function removeItem(product_econ_cart_id) {
    if (actionLoading !== null) {
      return;
    }

    setActionLoading(product_econ_cart_id);

    axios
      .post(`${API}remove_cart_qty`, {
        product_econ_cart_id: product_econ_cart_id,
        token: token,
      })
      .then((res) => {
        console.log("Remove Cart Response:", res.data);
        fetchCart(false);
      })
      .catch((err) => {
        console.error(
          "Remove Cart Error:",
          err.response?.data || err.message
        );

        alert("Unable to remove this product. Please try again.");
      })
      .finally(() => {
        setActionLoading(null);
      });
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      <Navbar />

      <main>
        {/* Hero / Breadcrumb section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
                  <ShoppingBag size={16} />
                  Your shopping bag
                </div>

                <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Your Cart
                  <span className="text-violet-300">.</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-violet-100/80 sm:text-base">
                  Your next great find is just a step away. Review your
                  selections and get ready for checkout.
                </p>
              </div>

              <div className="flex w-fit items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-violet-700">
                  <ShoppingCart size={23} />
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">
                    {totalItems}
                  </p>
                  <p className="text-sm text-violet-100/80">
                    {totalItems === 1 ? "Item in cart" : "Items in cart"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main cart content */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-500">
            <Link
              to="/"
              className="transition hover:text-violet-700"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-semibold text-violet-700">
              Shopping Cart
            </span>
          </div>

          {loading ? (
            /* Loading state */
            <div className="rounded-3xl border border-violet-100 bg-white px-5 py-20 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50">
                <RefreshCw
                  size={30}
                  className="animate-spin text-violet-600"
                />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Loading your cart
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Just a moment while we get your items ready.
              </p>
            </div>
          ) : error ? (
            /* Error state */
            <div className="rounded-3xl border border-red-100 bg-white px-5 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <ShoppingCart size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Something went wrong
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => fetchCart()}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800"
              >
                <RefreshCw size={17} />
                Try Again
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty cart */
            <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white px-5 py-16 text-center shadow-sm sm:py-24">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-50" />
              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-indigo-50" />

              <div className="relative">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700">
                  <ShoppingCart size={42} strokeWidth={1.6} />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
                  Your next favorite awaits
                </p>

                <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
                  Your cart is feeling lonely
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                  You haven't added anything yet. Explore our collection
                  and discover something you'll love.
                </p>

                <Link
                  to="/products"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800"
                >
                  Explore Products
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
              {/* Products section */}
              <div className="space-y-5 lg:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                      Cart Items
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Review and update your selected products.
                    </p>
                  </div>

                  <span className="rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "product" : "products"}
                  </span>
                </div>

                {cartItems.map((item, index) => {
                  const price = Number(item.price || 0);
                  const quantity = Number(item.qty || 0);
                  const itemTotal = price * quantity;
                  const isBusy =
                    actionLoading === item.product_econ_cart_id;

                  return (
                    <article
                      key={item.product_econ_cart_id}
                      className={`group rounded-2xl border border-violet-100 bg-white p-4 shadow-sm transition duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60 sm:p-5 ${
                        isBusy ? "opacity-70" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Product image */}
                        <Link
                          to="/products"
                          className="relative flex h-40 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-50 to-slate-50 sm:h-36 sm:w-36"
                        >
                          <img
                            src={item.product_img}
                            alt={item.product_name || "Product"}
                            loading="lazy"
                            className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                          />

                          <span className="absolute left-2 top-2 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-500 shadow-sm">
                            #{String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>

                        {/* Product details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                                  NovaMart Collection
                                </p>

                                <h3 className="mt-1 break-words text-base font-bold text-slate-900 transition group-hover:text-violet-700 sm:text-lg">
                                  {item.product_name}
                                </h3>
                              </div>

                              <p className="shrink-0 text-lg font-black text-slate-900">
                                {formatPrice(itemTotal)}
                              </p>
                            </div>

                            <p className="mt-2 text-sm text-slate-500">
                              Unit price:{" "}
                              <span className="font-semibold text-slate-700">
                                {formatPrice(price)}
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4">
                            {/* Quantity control */}
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Quantity
                              </p>

                              <div className="inline-flex items-center gap-3 rounded-xl border border-violet-100 bg-[#faf9ff] p-1.5">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item, -1)}
                                  disabled={quantity <= 1 || isBusy || actionLoading !== null}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-700 shadow-sm transition hover:bg-violet-100 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={15} />
                                </button>

                                <span className="min-w-5 text-center text-sm font-bold text-slate-900">
                                  {quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item, 1)}
                                  disabled={isBusy || actionLoading !== null}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-700 text-white shadow-sm transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-50"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={15} />
                                </button>
                              </div>
                            </div>

                            {/* Remove product */}
                            <button
                              type="button"
                              onClick={() =>
                                removeItem(item.product_econ_cart_id)
                              }
                              disabled={actionLoading !== null}
                              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 size={16} />
                              {isBusy ? "Updating..." : "Remove"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {/* Continue shopping */}
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
                >
                  <ArrowLeft size={17} />
                  Continue Shopping
                </Link>
              </div>

              {/* Order summary */}
              <aside className="lg:sticky lg:top-6">
                <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/50">
                  <div className="bg-gradient-to-br from-violet-800 to-indigo-900 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-violet-200">
                          Your purchase
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                          Order Summary
                        </h2>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                        <ShoppingBag size={23} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/10 p-3">
                      <span className="text-sm text-violet-100">
                        Total items
                      </span>

                      <span className="font-bold">
                        {totalItems}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">
                          Subtotal
                        </span>

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

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">
                          Discount
                        </span>

                        <span className="font-semibold text-slate-500">
                          — 
                        </span>
                      </div>
                    </div>

                    <div className="my-6 border-t border-dashed border-violet-200" />

                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-600">
                          Grand Total
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Inclusive of listed prices
                        </p>
                      </div>

                      <p className="text-2xl font-black tracking-tight text-violet-800">
                        {formatPrice(subtotal)}
                      </p>
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                      <PackageCheck
                        size={19}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <div>
                        <p className="text-sm font-bold text-emerald-800">
                          Free shipping unlocked!
                        </p>

                        <p className="mt-1 text-xs leading-5 text-emerald-700">
                          Enjoy free shipping on your current order.
                        </p>
                      </div>
                    </div>

                    <Link
                      to="/checkout"
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200 transition duration-300 hover:-translate-y-0.5 hover:from-violet-800 hover:to-indigo-800 hover:shadow-xl"
                    >
                      Proceed to Checkout
                      <ArrowRight size={18} />
                    </Link>

                    <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                      <LockKeyhole size={13} />
                      Continue to secure checkout
                    </p>
                  </div>
                </div>

                {/* Trust cards */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-violet-100 bg-white p-4">
                    <ShieldCheck
                      size={22}
                      className="text-violet-700"
                    />

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      Safe Shopping
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Shop with confidence.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-violet-100 bg-white p-4">
                    <Sparkles
                      size={22}
                      className="text-violet-700"
                    />

                    <p className="mt-3 text-sm font-bold text-slate-800">
                      Great Finds
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Discover more favorites.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Common/Navbar";
// import Footer from "../Common/Footer";
// import { ShoppingCart, LayoutGrid } from "lucide-react";
// import axios from "axios";

// function Cart() {

//   const[cartItems, setCartitems]=useState([]);

//   useEffect(()=>{

//     var obj={
//       "token":localStorage.getItem("token")
//     }

//     axios.post("https://a2zithub.org/dairy/abi/cart_list",obj).then((res)=>{
//       console.log("Response",res)
//       setCartitems(res.data)
//     })
//   },[])
 

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           {/* Page Heading */}
//           <div className="mb-10 text-center">
//             <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//               Shopping Cart
//             </h1>

//             <p className="mt-2 text-sm text-gray-500">
//               Review your items before checkout.
//             </p>
//           </div>

//           {/* Cart Layout */}
//           {cartItems.length === 0 ? (
//             <div className="rounded-xl bg-white p-10 text-center shadow-sm">
//               <ShoppingCart
//                 size={48}
//                 className="mx-auto text-gray-400"
//               />

//               <h2 className="mt-4 text-xl font-semibold text-gray-800">
//                 Your cart is empty
//               </h2>

//               <p className="mt-2 text-gray-500">
//                 Add some products to get started.
//               </p>

//               <Link
//                 to="/products"
//                 className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
//               {/* Cart Table */}
//               <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[680px] text-left">
//                     <thead className="bg-gray-100 text-sm text-gray-600">
//                       <tr>
//                         <th className="px-5 py-4 font-semibold">SR.NO</th>
//                         <th className="px-5 py-4 font-semibold">PRODUCT</th>
//                         <th className="px-5 py-4 font-semibold">PRICE</th>
//                         <th className="px-5 py-4 font-semibold">QTY</th>
//                         <th className="px-5 py-4 font-semibold">TOTAL</th>
//                         <th className="px-5 py-4 font-semibold">ACTION</th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-100">
//                       {cartItems.map((item, index) => (
//                         <tr key={item.id}>
//                           <td className="px-5 py-5 text-sm text-gray-600">
//                             {index + 1}
//                           </td>

//                           <td className="px-5 py-5">
//                             <div className="flex items-center gap-3">
//                               <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="h-14 w-14 rounded-lg object-cover"
//                               />

//                               <span className="whitespace-nowrap text-sm font-semibold text-gray-800">
//                                 {item.name}
//                               </span>
//                             </div>
//                           </td>

//                           <td className="px-5 py-5 text-sm text-gray-700">
//                             {formatPrice(item.price)}
//                           </td>

//                           <td className="px-5 py-5">
//                             <div className="flex items-center gap-2">
//                               <button
//                                 onClick={() =>
//                                   updateQuantity(item.id, -1)
//                                 }
//                                 className="rounded-md border border-gray-200 px-2 py-1 hover:bg-gray-100"
//                                 aria-label="Decrease quantity"
//                               >
//                                 −
//                               </button>

//                               <span className="min-w-4 text-center text-sm">
//                                 {item.quantity}
//                               </span>

//                               <button
//                                 onClick={() =>
//                                   updateQuantity(item.id, 1)
//                                 }
//                                 className="rounded-md border border-gray-200 px-2 py-1 hover:bg-gray-100"
//                                 aria-label="Increase quantity"
//                               >
//                                 +
//                               </button>
//                             </div>
//                           </td>

//                           <td className="px-5 py-5 text-sm font-semibold text-gray-800">
//                             {formatPrice(item.price * item.quantity)}
//                           </td>

//                           <td className="px-5 py-5">
//                             <button
//                               onClick={() => removeItem(item.id)}
//                               className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-100"
//                             >
//                               Remove
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Order Summary */}
//               <div className="rounded-xl bg-white p-6 shadow-sm">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Order Summary
//                 </h2>

//                 <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-gray-800">
//                     {formatPrice(subtotal)}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">
//                     FREE
//                   </span>
//                 </div>

//                 <div className="my-5 border-t border-gray-200" />

//                 <div className="flex items-center justify-between">
//                   <span className="font-bold text-gray-900">
//                     Grand Total
//                   </span>

//                   <span className="text-lg font-bold text-gray-900">
//                     {formatPrice(subtotal)}
//                   </span>
//                 </div>

//                 <p className="mt-4 text-xs text-green-600">
//                   You have unlocked free shipping!
//                 </p>

//                 <button
//                   onClick={() =>
//                     alert("Checkout functionality will be added soon!")
//                   }
//                   className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
//                 >
//                   Proceed to Checkout →
//                 </button>

//                 <Link
//                   to="/products"
//                   className="mt-4 block text-center text-sm text-gray-500 hover:text-blue-600"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default Cart;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Common/Navbar";
// import Footer from "../Common/Footer";
// import { ShoppingCart } from "lucide-react";
// import axios from "axios";

// const API = "https://a2zithub.org/dairy/abi";

// function formatPrice(value) {
//   return `₹${Number(value || 0).toFixed(2)}`;
// }

// function Cart() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post(`${API}/cart_list`, { token });

//       // Print the complete API response to inspect its field names.
//       console.log("Complete Cart Data:", JSON.stringify(res.data, null, 2));

//       setCartItems(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Cart List Error:", err.response?.data || err.message);
//       setError("Unable to load your cart. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const updateQuantity = async (item, change) => {
//     const cartId = item.product_econ_cart_id;

//     if (!cartId) {
//       setError("Cart item ID is missing.");
//       return;
//     }

//     // Do not decrease the quantity below 1.
//     if (change === -1 && Number(item.qty) <= 1) {
//       return;
//     }

//     try {
//       const endpoint =
//         change === 1 ? "inc_cart_qty" : "dec_cart_qty";

//       const res = await axios.post(`${API}/${endpoint}`, {
//         product_econ_cart_id: cartId,
//         token,
//       });

//       console.log("Quantity Update Response:", res.data);
//       await fetchCart();
//     } catch (err) {
//       console.error(
//         "Quantity Update Error:",
//         err.response?.data || err.message
//       );
//       setError("Unable to update quantity.");
//     }
//   };

//   const removeItem = async (item) => {
//     try {
//       const res = await axios.post(`${API}/remove_cart_qty`, {
//         product_econ_cart_id: item.product_econ_cart_id,
//         token,
//       });

//       console.log("Remove Cart Response:", res.data);
//       await fetchCart();
//     } catch (err) {
//       console.error(
//         "Remove Cart Error:",
//         err.response?.data || err.message
//       );
//       setError("Unable to remove this item.");
//     }
//   };

//   const subtotal = cartItems.reduce((sum, item) => {
//     const price = Number(
//       item.price ?? item.product_price ?? item.product_rate ?? 0
//     );
//     const quantity = Number(item.qty ?? item.quantity ?? 0);

//     return sum + price * quantity;
//   }, 0);

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-7xl">
//           <div className="mb-10 text-center">
//             <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//               Shopping Cart
//             </h1>
//             <p className="mt-2 text-sm text-gray-500">
//               Review your items before checkout.
//             </p>
//           </div>

//           {error && (
//             <p className="mb-5 rounded-lg bg-red-50 p-3 text-center text-red-600">
//               {error}
//             </p>
//           )}

//           {loading ? (
//             <p className="py-10 text-center text-gray-600">
//               Loading your cart...
//             </p>
//           ) : cartItems.length === 0 ? (
//             <div className="rounded-xl bg-white p-10 text-center shadow-sm">
//               <ShoppingCart
//                 size={48}
//                 className="mx-auto text-gray-400"
//               />
//               <h2 className="mt-4 text-xl font-semibold text-gray-800">
//                 Your cart is empty
//               </h2>
//               <p className="mt-2 text-gray-500">
//                 Add some products to get started.
//               </p>
//               <Link
//                 to="/products"
//                 className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
//               >
//                 Continue Shopping
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
//               <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-2">
//                 <div className="overflow-x-auto">
//                   <table className="w-full min-w-[680px] text-left">
//                     <thead className="bg-gray-100 text-sm text-gray-600">
//                       <tr>
//                         <th className="px-5 py-4">SR.NO</th>
//                         <th className="px-5 py-4">PRODUCT</th>
//                         <th className="px-5 py-4">PRICE</th>
//                         <th className="px-5 py-4">QTY</th>
//                         <th className="px-5 py-4">TOTAL</th>
//                         <th className="px-5 py-4">ACTION</th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-100">
//                       {cartItems.map((item, index) => {
//                         const price = Number(
//                           item.price ??
//                           item.product_price ??
//                           item.product_rate ??
//                           0
//                         );

//                         const quantity = Number(
//                           item.qty ?? item.quantity ?? 0
//                         );

//                         const name =
//                           item.product_name ?? "Product";

//                         const image =
//                           item.product_img ?? item.product_image ?? "";

//                         return (
//                           <tr key={item.product_econ_cart_id}>
//                             <td className="px-5 py-5 text-sm text-gray-600">
//                               {index + 1}
//                             </td>

//                             <td className="px-5 py-5">
//                               <div className="flex items-center gap-3">
//                                 {image ? (
//                                   <img
//                                     src={image}
//                                     alt={name}
//                                     className="h-14 w-14 rounded-lg object-cover"
//                                   />
//                                 ) : (
//                                   <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
//                                     <ShoppingCart size={20} />
//                                   </div>
//                                 )}

//                                 <span className="whitespace-nowrap text-sm font-semibold text-gray-800">
//                                   {name}
//                                 </span>
//                               </div>
//                             </td>

//                             <td className="px-5 py-5 text-sm text-gray-700">
//                               {formatPrice(price)}
//                             </td>

//                             <td className="px-5 py-5">
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   onClick={() => updateQuantity(item, -1)}
//                                   disabled={quantity <= 1}
//                                   className="rounded-md border px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
//                                   aria-label="Decrease quantity"
//                                 >
//                                   −
//                                 </button>

//                                 <span className="min-w-4 text-center text-sm">
//                                   {quantity}
//                                 </span>

//                                 <button
//                                   onClick={() => updateQuantity(item, 1)}
//                                   className="rounded-md border px-2 py-1 hover:bg-gray-100"
//                                   aria-label="Increase quantity"
//                                 >
//                                   +
//                                 </button>
//                               </div>
//                             </td>

//                             <td className="px-5 py-5 text-sm font-semibold text-gray-800">
//                               {formatPrice(price * quantity)}
//                             </td>

//                             <td className="px-5 py-5">
//                               <button
//                                 onClick={() => removeItem(item)}
//                                 className="rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-100"
//                               >
//                                 Remove
//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="rounded-xl bg-white p-6 shadow-sm">
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Order Summary
//                 </h2>

//                 <div className="mt-6 flex justify-between text-sm text-gray-500">
//                   <span>Subtotal</span>
//                   <span className="font-semibold text-gray-800">
//                     {formatPrice(subtotal)}
//                   </span>
//                 </div>

//                 <div className="mt-4 flex justify-between text-sm text-gray-500">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">
//                     FREE
//                   </span>
//                 </div>

//                 <div className="my-5 border-t border-gray-200" />

//                 <div className="flex justify-between">
//                   <span className="font-bold text-gray-900">
//                     Grand Total
//                   </span>
//                   <span className="text-lg font-bold text-gray-900">
//                     {formatPrice(subtotal)}
//                   </span>
//                 </div>

//                 <button
//                   onClick={() =>
//                     alert("Checkout functionality will be added soon!")
//                   }
//                   className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
//                 >
//                   Proceed to Checkout →
//                 </button>

//                 <Link
//                   to="/products"
//                   className="mt-4 block text-center text-sm text-gray-500 hover:text-blue-600"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

// export default Cart;
