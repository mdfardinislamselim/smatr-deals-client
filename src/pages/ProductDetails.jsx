import { useContext, useRef } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext);

  const {
    category,
    condition,
    created_at,
    description,
    email,
    image,
    location,
    price_max,
    price_min,
    seller_contact,
    seller_image,
    status,
    title,
    usage,
    _id,
  } = product;

  // ✅ Open modal
  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  // ✅ Submit bid handler
  const handleBidSubmit = (e) => {
    e.preventDefault();

    const name = e.target.buyer_name.value;
    const email = e.target.buyer_email.value;
    const bid = e.target.bid.value;

    const newBid = {
      product: _id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: parseFloat(bid),
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your bid has been placed.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.error("Bid submission failed:", err));
  };

  return (
    <div className="bg-[#F4F6FA] py-10">
      <div className="container mx-auto px-4 lg:px-0 text-[#001931]">
        {/* Back Button */}
        <Link
          to="/all-products"
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          ← Back To Products
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mt-2">{title}</h1>

        {/* Category Tag */}
        <span className="inline-block mt-3 bg-[#EDE7FF] text-[#6A47FF] text-xs px-3 py-1 rounded-full">
          {category}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          {/* Left: Product Image */}
          <div className="w-full h-[420px] bg-gray-200 rounded-xl overflow-hidden shadow-sm">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            {/* Price Box */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-2xl font-bold text-green-600">
                ${price_min} - ${price_max}
              </p>
              <p className="text-sm text-gray-500">Price starts from</p>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-2">
              <h3 className="font-semibold text-lg mb-2">Product Details</h3>
              <p className="text-sm">
                <span className="font-medium">Product ID:</span> {_id}
              </p>
              <p className="text-sm">
                <span className="font-medium">Posted:</span>{" "}
                {new Date(created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
              <h3 className="font-semibold text-lg">Seller Information</h3>

              <div className="flex items-center gap-4">
                <img
                  src={seller_image}
                  alt="seller"
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <p className="font-semibold">{email}</p>
                  <p className="text-sm text-gray-500">{email}</p>
                </div>
              </div>

              <p className="text-sm">
                <span className="font-medium">Location:</span> {location}
              </p>
              <p className="text-sm">
                <span className="font-medium">Contact:</span> {seller_contact}
              </p>

              <p className="text-sm flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                  {status}
                </span>
              </p>
            </div>

            {/* Buy Button */}
            <button className="btn-primary w-full" onClick={handleBidModalOpen}>
              I Want Buy This Product
            </button>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-lg p-6 shadow-sm mt-12 max-w-3xl">
          <h3 className="font-semibold text-lg">Product Description</h3>

          <div className="flex justify-between text-sm mt-4 mb-3 text-gray-700">
            <p>
              <span className="font-medium">Condition:</span> {condition}
            </p>
            <p>
              <span className="font-medium">Usage Time:</span> {usage}
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Bid Modal */}
      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-center text-3xl font-bold mb-6">
            Give Seller Your Offered Price
          </h2>
          <form onSubmit={handleBidSubmit} className="space-y-4">
            {/* Name + Email */}
            <div className="space-y-4">
              <input
                type="text"
                name="buyer_name"
                defaultValue={user?.displayName}
                disabled
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
              <input
                type="email"
                name="buyer_email"
                defaultValue={user?.email}
                readOnly
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
                required
              />
            </div>

            {/* Price */}
            <input
              type="number"
              name="bid"
              placeholder="Place your Price"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => bidModalRef.current.close()}
                className="border border-purple-500 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => bidModalRef.current.close()}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
