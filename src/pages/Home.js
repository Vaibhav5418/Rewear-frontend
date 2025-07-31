import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://rewear-backend-bcfm.onrender.com/api/items")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleItemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-blue-100/40 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-blue-600/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-blue-500/10 rounded-full blur-3xl animate-float-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-blue-200/10 to-blue-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="relative inline-block">
              <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
                Your Collection
              </h1>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100/50 to-blue-200/30 rounded-3xl blur-xl -z-10 animate-pulse-subtle"></div>
            </div>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Discover and explore your beautifully curated items in an elegant showcase
            </p>
            <div className="flex justify-center space-x-2 mb-8">
              <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-shimmer"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-shimmer animation-delay-200"></div>
              <div className="w-8 h-1 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full animate-shimmer animation-delay-400"></div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-3xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Go to Dashboard
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast"></div>
            </button>
            
            <button
              onClick={() => navigate("/add-item")}
              className="group relative overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-50 hover:to-blue-100 text-blue-700 hover:text-blue-800 px-10 py-5 rounded-3xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-out border border-blue-200/50 hover:border-blue-300/70"
            >
              <span className="relative z-10 flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Item
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Enhanced Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-24">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-reverse animation-delay-300"></div>
                <div className="absolute inset-2 w-16 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
            </div>
          )}

          {/* Enhanced Items Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.length === 0 ? (
                <div className="col-span-full text-center py-24 animate-fade-in-up">
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-blue-200/30 rounded-full blur-2xl"></div>
                    <svg className="w-32 h-32 mx-auto text-blue-300 mb-6 relative z-10 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-700 mb-4">No Items Yet</h3>
                  <p className="text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">
                    Start building your collection by adding your first item. Click the button above to get started!
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={item._id}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-700 ease-out cursor-pointer border border-blue-100/50 hover:border-blue-200/70 overflow-hidden"
                    onClick={() => handleItemClick(item._id)}
                    onMouseEnter={() => setHoveredItem(item._id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: 'slideInUp 0.8s ease-out forwards'
                    }}
                  >
                    {/* Enhanced gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-blue-100/30 to-blue-200/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    
                    {/* Enhanced Image container */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <img
                        src={`http://rewear-backend-bcfm.onrender.com${item.imageUrl}`}
                        alt={item.title}
                        className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        onError={e => { 
                          e.target.src = "https://via.placeholder.com/300x200/f1f5f9/64748b?text=No+Image"; 
                        }}
                      />
                      
                      {/* Enhanced hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Enhanced view icon */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 border border-white/20">
                        <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer-fast"></div>
                    </div>

                    {/* Enhanced Title */}
                    <h4 className="font-bold text-slate-800 text-xl leading-tight group-hover:text-blue-700 transition-colors duration-500 relative z-10 mb-2">
                      {item.title}
                    </h4>

                    {/* Subtitle effect */}
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"></div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes shimmer-fast {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 1s ease-in-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 2.5s linear infinite;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
}

export default Home;