
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowUpRight,
  Star,
  Sparkles,
} from "lucide-react";

function Product_card(props) {
  const product = props.data;

  if (!product) {
    return null;
  }

  const productName = product.product_name || "Product";
  const productDetails = product.details || "Discover more about this product.";
  const productPrice = Number(product.price);
  const hasPrice = product.price !== null &&
    product.price !== undefined &&
    product.price !== "" &&
    Number.isFinite(productPrice);

  return (
    <article className="group w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-100 hover:shadow-xl hover:shadow-violet-950/[0.08]">
      {/* Product image */}
      <Link
        to={`/product_det/${product.product_tbl_id}`}
        className="relative block overflow-hidden bg-gray-50"
        aria-label={`View ${productName}`}
      >
        <div className="flex h-56 items-center justify-center overflow-hidden sm:h-60">
          {product.product_img ? (
            <img
              src={product.product_img}
              alt={productName}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50">
              <ShoppingBag
                size={54}
                strokeWidth={1.2}
                className="text-violet-300"
              />
            </div>
          )}
        </div>

        {/* Featured label */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur">
          <Sparkles size={13} />
          Discover
        </div>

        {/* Image hover overlay */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-violet-950/40 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-violet-700 shadow-lg">
            View product
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      {/* Product information */}
      <div className="p-4 sm:p-5">
        <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-500">
          <Star size={14} fill="currentColor" />
          <span className="text-gray-500">Explore our collection</span>
        </div>

        <Link
          to={`/product_det/${product.product_tbl_id}`}
          className="block"
        >
          <h2 className="line-clamp-1 text-base font-extrabold text-gray-900 transition-colors group-hover:text-violet-700 sm:text-lg">
            {productName}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
          {productDetails}
        </p>

        {/* Price and action */}
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-400">Price</p>
            <p className="mt-0.5 truncate text-xl font-black tracking-tight text-violet-700">
              {hasPrice
                ? `₹${productPrice.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}`
                : "Price unavailable"}
            </p>
          </div>

          <Link
            to={`/product_det/${product.product_tbl_id}`}
            aria-label={`View ${productName} details`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 py-3 text-sm font-bold text-white shadow-md shadow-violet-600/15 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-600/25 focus:outline-none focus:ring-4 focus:ring-violet-200 sm:px-4"
          >
            <ShoppingBag size={16} />
            <span>View</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default Product_card;
