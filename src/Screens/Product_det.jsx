
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  Headphones,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Package,
  Sparkles,
  LockKeyhole,
  RefreshCw,
} from "lucide-react";

function Product_det() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [productDet, setProductDet] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Fetch product details
  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const obj = {
          product_id: product_id,
          token: localStorage.getItem("token"),
        };

        const res = await axios.post(
          "https://a2zithub.org/dairy/abi/product_by_id",
          obj
        );

        console.log("Product Response:", res.data);

        if (isMounted) {
          setProductDet(res.data || {});
        }
      } catch (err) {
        console.error("Product details error:", err);

        if (isMounted) {
          setLoadError(
            "We couldn't load this product. Please check your connection and try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [product_id]);

  // Add product to cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please sign in to add products to your cart.");
      navigate("/login");
      return;
    }

    if (isAddingToCart) return;

    setIsAddingToCart(true);

    try {
      const obj = {
        product_id: productDet.product_tbl_id || product_id,
        token: token,
      };

      const res = await axios.post(
        "https://a2zithub.org/dairy/abi/addtocart",
        obj
      );

      console.log("Cart Response:", res.data);

      if (res.data.status === "Success") {
        toast.success("Product added to your cart!");

        setProductDet((previous) => ({
          ...previous,
          cart: "Yes",
        }));
      } else {
        toast.error(res.data.msg || "Unable to add this product to your cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);

      toast.error(
        err.response?.data?.msg ||
          "Something went wrong while adding the product."
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const price = Number(productDet.price || 0);
  const image = productDet.product_img;
  const productName = productDet.product_name || "Product Details";

  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      detail: "On orders above ₹499",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      detail: "Shop with confidence",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      detail: "Check return policy",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      detail: "We're here to help",
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] items-center justify-center bg-[#f8f7ff] px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <LoaderCircle size={32} className="animate-spin" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Loading product...
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Getting the details ready for you.
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Error state
  if (loadError) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] items-center justify-center bg-[#f8f7ff] px-4 py-12">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl shadow-violet-100/50">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <Package size={30} />
            </div>

            <h1 className="mt-5 text-2xl font-black text-gray-900">
              Product unavailable
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {loadError}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
            >
              <RefreshCw size={18} />
              Try again
            </button>

            <div>
              <Link
                to="/products"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
              >
                <ArrowLeft size={16} />
                Back to products
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2500} />

      <main className="relative min-h-screen overflow-hidden bg-[#f8f7ff] text-gray-800">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-[500px] h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

        {/* Breadcrumb */}
        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 transition hover:text-violet-700"
            >
              Home
            </Link>

            <span className="text-gray-300">/</span>

            <Link
              to="/products"
              className="text-gray-500 transition hover:text-violet-700"
            >
              Products
            </Link>

            <span className="text-gray-300">/</span>

            <span className="max-w-[200px] truncate font-semibold text-violet-700">
              {productName}
            </span>
          </nav>
        </div>

        {/* Main product section */}
        <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[28px] border border-white bg-white shadow-[0_25px_80px_-30px_rgba(76,29,149,0.20)] lg:grid-cols-2">
            {/* Product image */}
            <div className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 p-5 sm:p-8 lg:p-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
                  <Sparkles size={15} />
                  Product highlight
                </span>

                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-full border bg-white shadow-sm transition hover:scale-105 ${
                    isWishlisted
                      ? "border-rose-200 text-rose-500"
                      : "border-gray-100 text-gray-500 hover:border-rose-200 hover:text-rose-500"
                  }`}
                >
                  <Heart
                    size={21}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[24px] border border-white/80 bg-white/80 p-5 sm:min-h-[450px]">
                <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-violet-100/70 blur-2xl" />

                {image ? (
                  <img
                    src={image}
                    alt={productDet.product_name || "Product"}
                    className="relative z-10 max-h-[400px] w-full object-contain transition duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-violet-300">
                    <Package size={80} strokeWidth={1.2} />
                    <p className="mt-4 text-sm font-medium text-gray-400">
                      Product image unavailable
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
                <ShieldCheck size={17} className="text-violet-600" />
                Quality products for your shopping needs
              </div>
            </div>

            {/* Product information */}
            <div className="flex flex-col p-6 sm:p-9 lg:p-10 xl:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 size={14} />
                  Quality selection
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500">
                  SKU: {productDet.product_tbl_id || product_id}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl">
                {productName}
              </h1>

              {/* Rating: demo display */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill={star <= 4 ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <span className="text-sm font-bold text-gray-800">4.0</span>

                <span className="text-sm text-gray-400">
                  Demo rating
                </span>
              </div>

              {/* Price */}
              <div className="mt-7 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                  Our price
                </p>

                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-4xl font-black tracking-tight text-violet-800">
                    ₹{price.toFixed(2)}
                  </span>

                  <span className="text-sm text-gray-500">
                    / item
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Price shown for the selected product
                </p>
              </div>

              {/* Description */}
              <div className="mt-7">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                  Product description
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
                  {productDet.details || "No product description available."}
                </p>
              </div>

              {/* Category */}
              {productDet.cat_name && (
                <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 font-semibold text-violet-700">
                    {productDet.cat_name}
                  </span>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-800">Quantity</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Choose how many you need
                  </p>
                </div>

                <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="min-w-12 text-center text-base font-bold text-gray-900">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() =>
                      setQuantity((current) => Math.min(99, current + 1))
                    }
                    disabled={quantity >= 99}
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={17} />
                  </button>
                </div>
              </div>

              {/* Estimated total */}
              <div className="mt-4 flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
                <span className="text-sm text-gray-500">
                  Subtotal for {quantity} {quantity === 1 ? "item" : "items"}
                </span>

                <span className="text-lg font-extrabold text-gray-900">
                  ₹{(price * quantity).toFixed(2)}
                </span>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {productDet.cart === "Yes" ? (
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 font-bold text-white shadow-lg shadow-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={20} />
                    Go to Cart
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={addToCart}
                    disabled={isAddingToCart}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isAddingToCart ? (
                      <>
                        <LoaderCircle size={20} className="animate-spin" />
                        Adding to cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add to Cart
                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 font-bold transition ${
                    isWishlisted
                      ? "border-rose-200 bg-rose-50 text-rose-600"
                      : "border-gray-200 bg-white text-gray-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              <Link
                to="/products"
                className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-violet-700"
              >
                <ArrowLeft size={17} />
                Continue browsing products
              </Link>
            </div>
          </div>
        </section>

        {/* Shopping benefits */}
        <section className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              Shop with confidence
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-900">
              A better shopping experience
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex items-center gap-4 rounded-2xl border border-white bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/70"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-700 transition group-hover:bg-violet-700 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-800 via-violet-700 to-indigo-800 p-7 text-white sm:flex-row sm:items-center sm:p-9">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-violet-200">
                <Sparkles size={16} />
                Discover more at NovaMart
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                Find something you'll love.
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-violet-100/80">
                Explore our collection and find the right products for your
                everyday needs.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-violet-800 transition hover:bg-violet-50"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
            <LockKeyhole size={14} />
            Shop with confidence at NovaMart
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Product_det;
