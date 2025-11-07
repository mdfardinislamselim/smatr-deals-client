import React from "react";

const BidsTable = ({ bids }) => {
  return (
    <div className="overflow-x-auto mt-10 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Bids For This Product:{" "}
        <span className="text-purple-600">{bids?.length}</span>
      </h2>

      <table className="table rounded-lg">
        {/* head */}
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th>SL No</th>
            {/* <th>Product</th> */}
            <th>Buyer</th>
            <th>Bid Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bids?.map((bid, index) => (
            <tr key={bid._id} className="hover">
              <td>{index + 1}</td>

              {/* Product */}
              <td>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md overflow-hidden border">
                    <img src={bid.buyer_image} alt={bid.buyer_name} />
                  </div>
                  <div>
                    <p className="font-medium">{bid.buyer_name}</p>
                    <p className="text-xs text-gray-500">${bid.bid_price}</p>
                  </div>
                </div>
              </td>

              {/* Seller */}
              {/* <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={bid.seller_image} alt="seller" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{bid.seller_name}</p>
                    <p className="text-xs text-gray-500">{bid.seller_email}</p>
                  </div>
                </div>
              </td> */}

              {/* Bid Price */}
              <td className="font-semibold">${bid.bid_price}</td>

              {/* Actions */}
              <td>
                <div className="flex gap-2">
                  <button className="btn btn-xs bg-green-500 hover:bg-green-600 text-white">
                    Accept Offer
                  </button>
                  <button className="btn btn-xs bg-red-500 hover:bg-red-600 text-white">
                    Reject Offer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BidsTable;
