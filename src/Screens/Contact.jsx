
import { useState } from "react";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Headphones,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // This form currently displays a local success message.
    // Connect a backend/email API here to actually send messages.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-violet-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100";

  const contactDetails = [
    {
      icon: Mail,
      label: "Email Us",
      value: "support@novamart.com",
      description: "Send us your questions anytime.",
      href: "mailto:support@novamart.com",
      color: "bg-violet-100 text-violet-700",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 98765 43210",
      description: "We're happy to help you.",
      href: "tel:+919876543210",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      icon: MapPin,
      label: "Our Location",
      value: "NovaMart Online Store, India",
      description: "Serving shoppers across India.",
      href: null,
      color: "bg-fuchsia-100 text-fuchsia-700",
    },
  ];

  const supportFeatures = [
    {
      icon: MessageCircle,
      title: "Friendly Support",
      text: "Get help with your shopping questions.",
    },
    {
      icon: ShieldCheck,
      title: "Customer First",
      text: "Your experience matters to us.",
    },
    {
      icon: Clock,
      title: "We're Here to Help",
      text: "Send a message whenever you need assistance.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-slate-900">
      <Navbar />

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900">
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-violet-100 backdrop-blur-sm">
              <Headphones size={16} />
              We're here for you
            </div>

            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's start a
              <span className="block text-violet-300">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-violet-100/80 sm:text-lg">
              Have a question, need help with an order, or simply want to
              share feedback? We'd love to hear from you. Let's make your
              NovaMart experience even better.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-violet-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-violet-50"
              >
                Send a Message
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="mailto:support@novamart.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <Mail size={17} />
                Email Support
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-violet-100/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-violet-300" />
                Customer-focused
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-violet-300" />
                Here to help
              </span>
            </div>
          </div>

          {/* Decorative contact card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full border border-white/10" />
            <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-full border border-white/10" />

            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-violet-800 shadow-lg">
                  <MessageCircle size={28} />
                </div>

                <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                  Customer Care
                </div>
              </div>

              <h2 className="mt-7 text-2xl font-black text-white sm:text-3xl">
                Every message matters.
              </h2>

              <p className="mt-3 text-sm leading-7 text-violet-100/75 sm:text-base">
                Whether it's a product question or an order concern, we're
                glad you reached out.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  {
                    icon: Mail,
                    title: "Email Support",
                    subtitle: "support@novamart.com",
                  },
                  {
                    icon: Phone,
                    title: "Phone Support",
                    subtitle: "+91 98765 43210",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Your Experience",
                    subtitle: "Our priority",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-violet-200">
                        <Icon size={21} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-violet-100/65 sm:text-sm">
                          {item.subtitle}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="ml-auto shrink-0 text-violet-200/70"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <Sparkles size={19} className="text-violet-300" />
                <p className="text-xs leading-5 text-violet-100/70">
                  Thank you for being part of the NovaMart community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact information and form */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              We'd love to hear from you
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              Reach out using the details below or send us a message
              through our contact form.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-10">
            {/* Contact information */}
            <div className="space-y-4 lg:col-span-2">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                const content = (
                  <>
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${detail.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900">
                        {detail.label}
                      </h3>

                      <p className="mt-1 break-words text-sm font-semibold text-violet-700">
                        {detail.value}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                        {detail.description}
                      </p>
                    </div>

                    {detail.href && (
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-slate-400 transition group-hover:text-violet-700"
                      />
                    )}
                  </>
                );

                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className="group flex items-start gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
                  >
                    {content}
                  </div>
                );
              })}

              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-sm">
                  <Sparkles size={23} />
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-900">
                  Your feedback helps us grow.
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Questions, suggestions, and feedback help us improve the
                  shopping experience for everyone.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div
              id="contact-form"
              className="scroll-mt-8 overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/50 lg:col-span-3"
            >
              <div className="border-b border-violet-50 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Send size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                      Send us a message
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Fill in the details below.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
                {submitted && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800"
                  >
                    <CheckCircle2
                      size={21}
                      className="mt-0.5 shrink-0"
                    />

                    <div>
                      <p className="font-bold">
                        Thank you for reaching out!
                      </p>
                      <p className="mt-1 text-sm leading-6">
                        Your message was validated in this page. To
                        actually deliver it to our team, connect this form
                        to a backend or email service.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What can we help you with?"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 px-6 py-4 font-bold text-white shadow-lg shadow-violet-200/70 transition duration-300 hover:-translate-y-0.5 hover:from-violet-800 hover:to-indigo-800 hover:shadow-xl"
                >
                  Send Message
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>

                <p className="text-center text-xs leading-5 text-slate-400">
                  Please avoid sharing passwords or other sensitive
                  account information in your message.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support features */}
      <section className="border-y border-violet-100 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              The NovaMart Promise
            </p>

            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              We're here to make things easier
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {supportFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-violet-100 bg-[#faf9ff] p-6 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-800 via-violet-800 to-indigo-900 px-6 py-12 text-center shadow-xl shadow-violet-200/50 sm:px-12 sm:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-400/10" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-violet-100">
              <Sparkles size={27} />
            </div>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-black text-white sm:text-4xl">
              Thank you for choosing NovaMart!
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-violet-100/80 sm:text-base">
              Your trust and satisfaction mean a lot to us. We're glad
              you're here and look forward to helping you.
            </p>

            <a
              href="mailto:support@novamart.com"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-violet-800 transition hover:-translate-y-0.5 hover:bg-violet-50"
            >
              Get in Touch
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
