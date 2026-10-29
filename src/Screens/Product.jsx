
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import Product_card from "../Common/Product_card";
import axios from "axios";
import {
  Search,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Package,
  RefreshCw,
  SlidersHorizontal,
  ShieldCheck,
  Truck,
  Headphones,
  X,
} from "lucide-react";

function Products() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://a2zithub.org/dairy/abi/product_det"
      );

      console.log("Products response:", res.data);

      if (Array.isArray(res.data)) {
        setProduct(res.data);
      } else {
        setProduct([]);
        setError("The product data format was unexpected. Please try again.");
      }
    } catch (err) {
      console.error("Products API error:", err);
      setError("We couldn't load the products. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search by product name, category, or description
  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return product;
    }

    return product.filter((item) => {
      const name = String(item.product_name || "").toLowerCase();
      const category = String(item.cat_name || "").toLowerCase();
      const details = String(item.details || "").toLowerCase();

      return (
        name.includes(search) ||
        category.includes(search) ||
        details.includes(search)
      );
    });
  }, [product, searchTerm]);

  const benefits = [
    {
      icon: Truck,
      title: "Convenient Shopping",
      description: "Browse products with ease",
    },
    {
      icon: ShieldCheck,
      title: "Shop with Confidence",
      description: "A simple shopping experience",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      description: "We're here when you need us",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f8f7ff] text-gray-800">
        {/* Premium hero section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-800 via-violet-700 to-indigo-900">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-36 -left-20 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:px-10 lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
                <Sparkles size={16} />
                Welcome to NovaMart
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find your next
                <span className="mt-2 block text-violet-200">
                  favorite thing.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-violet-100/80 sm:text-lg">
                Discover products for your everyday needs. Explore our
                collection and find something you'll love.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#product-list"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
                >
                  Explore Collection
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm">
                  <ShoppingBag size={18} />
                  {product.length} products available
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-violet-100/80">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} />
                  Easy browsing
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles size={17} />
                  Discover more
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto hidden w-full max-w-sm lg:block">
              <div className="absolute inset-3 rounded-[36px] bg-white/10 blur-xl" />

              <div className="relative rounded-[32px] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                <div className="rounded-[24px] bg-gradient-to-br from-white to-violet-100 p-8">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-[32px] bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-xl shadow-violet-300/50">
                    <ShoppingBag size={76} strokeWidth={1.4} />
                  </div>

                  <div className="mt-7 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                      Your next discovery
                    </p>
                    <h2 className="mt-2 text-2xl font-black text-gray-900">
                      Shop your way.
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                      Find products that fit your everyday life.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white">
                  <span className="flex items-center gap-2">
                    <Sparkles size={17} className="text-violet-200" />
                    Made for easy shopping
                  </span>
                  <ArrowRight size={17} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products area */}
        <section
          id="product-list"
          className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          {/* Section heading and search */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
                <span className="h-1.5 w-7 rounded-full bg-violet-600" />
                The NovaMart collection
              </div>

              <h2 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
                Explore our products
              </h2>

              <p className="mt-3 max-w-xl leading-6 text-gray-500">
                Find what you need with a quick search through our collection.
              </p>
            </div>

            <div className="w-full lg:max-w-md">
              <label
                htmlFor="product-search"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Search products
              </label>

              <div className="group flex items-center rounded-2xl border border-gray-200 bg-white px-4 shadow-sm transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100">
                <Search
                  size={21}
                  className="shrink-0 text-gray-400 transition group-focus-within:text-violet-600"
                />

                <input
                  id="product-search"
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or category..."
                  className="w-full bg-transparent px-3 py-4 text-sm outline-none placeholder:text-gray-400"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="rounded-lg p-1.5 text-gray-400 transition hover:bg-violet-50 hover:text-violet-700"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results toolbar */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 pb-5">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-900">
                {isLoading ? "..." : filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-xs font-semibold text-violet-700">
              <SlidersHorizontal size={15} />
              {searchTerm ? "Search results" : "All products"}
            </div>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="h-52 animate-pulse rounded-xl bg-violet-50" />
                  <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                  <div className="mt-5 h-10 animate-pulse rounded-xl bg-violet-50" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div className="rounded-3xl border border-red-100 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                <Package size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                Unable to load products
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchProducts}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
              >
                <RefreshCw size={17} />
                Try again
              </button>
            </div>
          )}

          {/* Product grid */}
          {!isLoading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((value, index) => (
                <div
                  key={
                    value.product_tbl_id ||
                    value.product_id ||
                    `${value.product_name || "product"}-${index}`
                  }
                  className="w-full max-w-sm transition duration-300 hover:-translate-y-1"
                >
                  <Product_card data={value} />
                </div>
              ))}
            </div>
          )}

          {/* Empty search result */}
          {!isLoading &&
            !error &&
            product.length > 0 &&
            filteredProducts.length === 0 && (
              <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Search size={30} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No matching products
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try a different product name, category, or keyword.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="mt-6 rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-800"
                >
                  Clear search
                </button>
              </div>
            )}

          {/* Empty catalogue */}
          {!isLoading && !error && product.length === 0 && (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <ShoppingBag size={30} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No products available yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Please check back later for new products.
              </p>
            </div>
          )}
        </section>

        {/* Benefits section */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-white bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                The NovaMart difference
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
                Shopping made simpler
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl p-3 transition hover:bg-violet-50/70"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                      <Icon size={23} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-800 to-indigo-900 px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-violet-200">
                  <Sparkles size={16} />
                  Your next favorite is waiting
                </div>

                <h2 className="text-2xl font-black sm:text-3xl">
                  Keep exploring NovaMart.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100/80">
                  Find the products you need and enjoy a simpler shopping
                  experience.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-bold text-violet-800 transition hover:bg-violet-50"
              >
                Back to Home
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Products;
