
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Truck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  MoveUpRight,
} from "lucide-react";

function About() {
  const features = [
    {
      icon: ShoppingBag,
      number: "01",
      title: "Thoughtful Discovery",
      description:
        "Explore a collection of products designed to help you discover something new for your everyday life.",
      color: "bg-violet-50 text-violet-700",
    },
    {
      icon: Truck,
      number: "02",
      title: "Convenient Shopping",
      description:
        "Browse products, explore your options, and shop from the comfort of your own space.",
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      icon: HeartHandshake,
      number: "03",
      title: "Customer Focused",
      description:
        "We aim to make your shopping journey simple, enjoyable, and easy to navigate.",
      color: "bg-fuchsia-50 text-fuchsia-700",
    },
  ];

  const values = [
    "A simple, intuitive shopping experience",
    "Products across a variety of categories",
    "A convenient way to explore new finds",
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-[#20113e]">
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 -z-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-12 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-100 backdrop-blur-sm">
              <Sparkles size={15} />
              Get to know us
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Shopping should
              <br />
              feel <span className="text-violet-300">different.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Welcome to NovaMart — a place to explore products, discover new
              favourites, and make everyday shopping feel effortless.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-violet-950 transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Explore our products
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#our-story"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Our story <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-violet-300" />
                Easy to explore
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-violet-300" />
                Made for everyday shopping
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-3 rotate-3 rounded-[32px] bg-gradient-to-br from-violet-400/30 to-fuchsia-400/10 blur-sm" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/20">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=85"
                alt="A thoughtfully arranged retail shopping space"
                className="h-[300px] w-full rounded-[22px] object-cover sm:h-[390px] lg:h-[470px]"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/40 bg-white/90 p-5 shadow-xl backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                  The NovaMart philosophy
                </p>
                <p className="mt-2 text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                  Less hassle. More discovery.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  A fresh approach to your everyday shopping.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-1 w-8 rounded-full bg-violet-600" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                Who we are
              </p>
            </div>

            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              A better way to discover the things you love.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              At NovaMart, we believe online shopping should feel
              straightforward, convenient, and enjoyable. Our goal is to make
              it easier to explore a range of products and find items that
              suit your needs.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Whether you're browsing for everyday essentials or looking for
              something different, NovaMart brings your shopping journey
              together in one easy-to-explore place.
            </p>

            <Link
              to="/products"
              className="group mt-7 inline-flex items-center gap-2 font-bold text-violet-700 transition hover:text-violet-900"
            >
              Discover the collection
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="rounded-[28px] border border-violet-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <ShieldCheck size={27} />
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
              Built around your experience
            </h3>

            <p className="mt-3 leading-7 text-slate-500">
              Every part of NovaMart is designed with one goal in mind: making
              it easier for you to find your way around and enjoy browsing.
            </p>

            <div className="mt-7 space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-700">
                    <CheckCircle2 size={15} />
                  </div>
                  <p className="text-sm font-medium leading-6 text-slate-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
              <Sparkles size={14} />
              What matters to us
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Why NovaMart?
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              A shopping experience shaped around convenience, discovery, and
              the people who use it.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  className="group rounded-[24px] border border-slate-100 bg-[#fcfbff] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-xl hover:shadow-violet-100/50 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition duration-300 group-hover:scale-105`}
                    >
                      <Icon size={26} />
                    </div>

                    <span className="text-sm font-bold tracking-widest text-slate-300">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                  <div className="mt-6 h-1 w-10 rounded-full bg-violet-200 transition-all duration-300 group-hover:w-16 group-hover:bg-violet-600" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[30px] bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-800 px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-20">
          <div className="pointer-events-none absolute -right-16 -top-32 h-80 w-80 rounded-full border-[45px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-violet-100">
              <ShoppingBag size={26} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next discovery starts here.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-violet-100/80 sm:text-base sm:leading-8">
              Explore the NovaMart collection and find something that makes
              your everyday a little better.
            </p>

            <Link
              to="/products"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-violet-950 transition hover:-translate-y-0.5 hover:bg-violet-50"
            >
              Start exploring
              <MoveUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
