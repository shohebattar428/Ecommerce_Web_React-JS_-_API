
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { useEffect, useState } from "react";
import Product_card from "../Common/Product_card";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";

function Home() {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [feature, setFeature] = useState([]);
  const [best, SetBest] = useState([]);
  const [newp, SetNewp] = useState([]);

  // Fetch homepage slider images
  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/slider_det")
      .then((res) => {
        setSlides(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Slider API error:", err);
      });
  }, []);

  // Automatically change the banner
  useEffect(() => {
    if (slides.length <= 1) return;

    const time = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(time);
  }, [slides.length]);

  // Fetch featured products
  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/feature_product")
      .then((res) => {
        setFeature(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Featured products API error:", err);
      });
  }, []);

  // Fetch best-selling products
  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/best_selling_product")
      .then((res) => {
        SetBest(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Best-selling products API error:", err);
      });
  }, []);

  // Fetch new products
  useEffect(() => {
    axios
      .get("https://a2zithub.org/dairy/abi/new_product")
      .then((res) => {
        SetNewp(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("New products API error:", err);
      });
  }, []);

  // Move to the previous banner
  const previousSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Move to the next banner
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  // Reusable product section
  const ProductSection = ({ eyebrow, title, description, products, badge }) => (
    <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1 w-7 rounded-full bg-violet-600"></span>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              {eyebrow}
            </p>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            {title}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>
        </div>

        <Link
          to="/products"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          View all
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((val, productIndex) => (
            <div
              key={
                val.product_id ??
                val.id ??
                `${eyebrow}-${productIndex}`
              }
              className="min-w-0 transition duration-300 hover:-translate-y-1"
            >
              <Product_card data={val} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <ShoppingBag size={25} />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Products coming soon
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            We couldn't find any products in this section right now.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900"
          >
            Explore all products <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="mx-auto max-w-[1600px] px-3 pt-4 sm:px-6 sm:pt-6 lg:px-10">
        <div className="relative isolate min-h-[490px] overflow-hidden rounded-[28px] bg-[#211344] sm:min-h-[550px] sm:rounded-[36px] lg:min-h-[620px]">
          {/* Background image */}
          {slides.length > 0 && slides[index]?.slider_img && (
            <img
              key={slides[index].slider_img}
              src={slides[index].slider_img}
              alt="Discover products at NovaMart"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
          )}

          {/* Dark overlay for readable text */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#160d2d]/95 via-[#211344]/75 to-[#211344]/10" />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl sm:h-[450px] sm:w-[450px]" />

          <div className="relative flex min-h-[490px] flex-col justify-center px-6 py-12 sm:min-h-[550px] sm:px-12 lg:min-h-[620px] lg:px-20">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur-md sm:text-sm">
                <Sparkles size={15} className="text-violet-200" />
                YOUR EVERYDAY SHOPPING, REIMAGINED
              </div>

              <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
                Discover more.
                <br />
                <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-white bg-clip-text text-transparent">
                  Live beautifully.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 lg:text-lg">
                Find products you'll love, explore new favourites, and enjoy
                a better way to shop — all in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/products"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-violet-950 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-violet-50 sm:text-base"
                >
                  Explore collection
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-base"
                >
                  Shop now <ArrowUpRight size={18} />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-white/80 sm:text-sm">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-violet-200" />
                  Shopping made simple
                </span>
                <span className="flex items-center gap-2">
                  <Star size={16} className="fill-violet-200 text-violet-200" />
                  Discover your favourites
                </span>
              </div>
            </div>

            {/* Slider controls */}
            {slides.length > 1 && (
              <div className="absolute bottom-6 right-6 flex items-center gap-3 sm:bottom-9 sm:right-10">
                <span className="mr-2 text-sm font-medium tabular-nums text-white/80">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous banner"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-violet-950"
                >
                  <ArrowLeft size={19} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next banner"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white hover:text-violet-950"
                >
                  <ArrowRight size={19} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SHOPPING BENEFITS */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <Truck size={23} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Convenient shopping
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Browse from anywhere
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-700">
              <ShieldCheck size={23} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Simple ordering
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                A smooth shopping journey
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
              <ShoppingBag size={23} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Explore more
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Find something for you
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <Headphones size={23} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Here to help
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Visit us for more information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <div className="border-t border-slate-100 bg-white">
        <ProductSection
          eyebrow="Handpicked for you"
          title="Featured products"
          description="Explore a selection of products worth discovering. Find something you'll love."
          products={feature}
          badge="FEATURED"
        />
      </div>

      {/* PROMOTIONAL STRIP */}
      <section className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-violet-950 via-violet-800 to-indigo-700 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[40px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-violet-100">
                <Sparkles size={14} /> YOUR NEXT FAVOURITE IS WAITING
              </span>

              <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                A little discovery.
                <br className="hidden sm:block" /> A lot of excitement.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100/80 sm:text-base">
                Take a look at what's trending and find products that fit your
                everyday life.
              </p>
            </div>

            <Link
              to="/products"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-violet-950 transition hover:-translate-y-0.5 hover:bg-violet-50"
            >
              Discover products
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLING PRODUCTS */}
      <div className="border-t border-slate-100 bg-white">
        <ProductSection
          eyebrow="Customer favourites"
          title="Best sellers"
          description="Explore popular picks and discover products shoppers are checking out."
          products={best}
          badge="BEST SELLERS"
        />
      </div>

      {/* NEW PRODUCTS */}
      <div className="border-t border-slate-100 bg-[#faf9ff]">
        <ProductSection
          eyebrow="Fresh finds"
          title="Just arrived"
          description="Take a first look at the latest additions to our collection."
          products={newp}
          badge="NEW"
        />
      </div>

      {/* BOTTOM CALL TO ACTION */}
      <section className="mx-auto max-w-[1440px] px-4 pb-14 sm:px-6 sm:pb-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-violet-100 bg-white p-7 sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
              The NovaMart experience
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Your next great find is here.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse our collection and find something you'll love.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-violet-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800"
          >
            Start shopping
            <ChevronRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
