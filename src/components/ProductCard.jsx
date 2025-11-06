import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  console.log(product)
  const { _id, title, condition, price_max, price_min, image } = product;

  return (
    <div className="rounded-lg p-4 shadow hover:shadow-md transition flex flex-col">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200 rounded mb-3 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">Condition: {condition}</p>
      <p className="text-purple-600 font-bold text-lg">
        ${price_min} - {price_max}
      </p>

      {/* Button */}
      <Link to={`/product/${product._id}`} className="btn-secondary mt-1">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
