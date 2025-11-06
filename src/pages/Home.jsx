import React from "react";
import { Link, useLoaderData } from "react-router";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const data = useLoaderData();
  return (
    <div className="text-[#001931] bg-[#F4F6FA] py-10">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-center font-bold text-5xl">
          Recent <span className="gradient-text">Adds</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="text-center  mt-10">
          <Link to={`all-products`} className="btn-primary">
            Show All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
