import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${baseURL}/items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
        alert("Item not found or server error.");
        navigate("/home");
      }
    };
    fetchItem();
  }, [id, navigate]);

  const handleAction = async (type) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to perform this action.");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${baseURL}/items/swap/${id}`,
        { type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (type === "swap") {
        alert(`Swap successful! You gained ${res.data.buyerPoints} points.`);
      } else if (type === "redeem") {
        alert(`Redeem successful! ${res.data.pointsDeducted} points deducted.`);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Swap/Redeem error:", err.response || err);
      const message = err.response?.data?.message || "Action failed. Please try again.";
      alert("Error: " + message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg font-medium">Loading item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="group mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300 transform hover:scale-105"
        >
          <div className="p-2 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all duration-300">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-semibold">Back to Home</span>
        </button>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold text-center mb-2 transform hover:scale-105 transition-transform duration-300">
              {item.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm opacity-90">
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                {item.category}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                {item.type}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                    <img
                      src={`${baseURL}${item.imageUrl}`}
                      alt={item.title}
                      className={`w-full h-80 object-cover rounded-xl transition-all duration-500 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      onError={e => { 
                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                        setImageLoaded(true);
                      }}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-4 bg-gray-200 rounded-xl flex items-center justify-center">
                        <div className="animate-pulse text-gray-400">Loading image...</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex justify-center">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    item.status === 'available' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {item.status === 'available' ? '🟢 Available' : '🔴 Unavailable'}
                  </span>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                {/* Description */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-blue-500">📝</span>
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Size', value: item.size, icon: '📏' },
                    { label: 'Condition', value: item.condition, icon: '⭐' },
                    { label: 'Type', value: item.type, icon: '🏷️' },
                    { label: 'Category', value: item.category, icon: '📂' }
                  ].map((detail, index) => (
                    <div 
                      key={detail.label}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <span>{detail.icon}</span>
                        {detail.label}
                      </div>
                      <div className="font-semibold text-gray-800">{detail.value}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span>🏷️</span>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uploader Info */}
                {item.uploader && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-green-500">👤</span>
                      Uploaded By
                    </h4>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Name:</span>
                        <span className="text-gray-800">{item.uploader.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="text-gray-800">{item.uploader.email}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              {item.status === "available" && item.isApproved ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleAction("swap")}
                    disabled={isLoading}
                    className="group relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>🔄</span>
                      )}
                      Swap Request
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleAction("redeem")}
                    disabled={isLoading}
                    className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <span>💎</span>
                      )}
                      Redeem via Points
                    </div>
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl border border-gray-300">
                    <span className="text-gray-500">🚫</span>
                    <span className="text-gray-600 font-medium">
                      This item is no longer available for swap or redeem.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;