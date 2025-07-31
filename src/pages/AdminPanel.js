import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [pendingItems, setPendingItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("https://rewear-backend-bcfm.onrender.com/api/items/pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setPendingItems(res.data))
      .catch(err => console.error("Pending fetch error:", err));

    axios.get("http://rewear-backend-bcfm.onrender.com/api/items", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setAllItems(res.data))
      .catch(err => console.error("All items fetch error:", err));
  }, []);

  const handleDecision = async (id, approve) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://rewear-backend-bcfm.onrender.com/api/items/approve/${id}`,
        { approve },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(approve ? "Approved" : "Rejected");
      setPendingItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update");
    }
  };

  const getImageUrl = (item) => {
    if (item.imageUrl && item.imageUrl.startsWith("/uploads/")) {
      return `http://rewear-backend-bcfm.onrender.com${item.imageUrl}`;
    }
    return "https://via.placeholder.com/120?text=No+Image";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-8 h-8 bg-blue-300 rounded-lg animate-bounce-slow opacity-60"></div>
        <div className="absolute bottom-40 right-40 w-6 h-6 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-4 h-16 bg-blue-200 rounded-full animate-sway opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-sky-300 transform rotate-45 animate-spin-slow opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-4"></div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
              Admin Dashboard
            </h1>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse ml-4"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 mx-auto rounded-full animate-shimmer"></div>
          <p className="text-slate-600 mt-4 text-lg font-light">Manage submissions with elegance</p>
        </div>

        {/* Pending Items Section */}
        <div className="mb-24">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-6 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-blue-200/50">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Pending Approvals</h2>
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            {pendingItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-gentle">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-xl font-light">No pending items to review</p>
                <p className="text-slate-400 text-sm mt-2">All caught up! 🎉</p>
              </div>
            ) : (
              pendingItems.map((item, index) => (
                <div 
                  key={item._id} 
                  className="group bg-white/70 backdrop-blur-lg rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border border-blue-200/50 hover:border-blue-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2 hover:scale-[1.02] animate-slide-in-up"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img
                      src={getImageUrl(item)}
                      alt={item.title}
                      className="relative w-36 h-36 object-cover rounded-2xl border-2 border-blue-200/60 group-hover:border-blue-400/80 transition-all duration-500 shadow-lg"
                      onError={e => { e.target.src = "https://via.placeholder.com/120?text=No+Image"; }}
                    />
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full text-center md:text-left space-y-4">
                    <h4 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-500">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-slate-500">Uploaded by:</span>
                      <span className="font-semibold text-blue-600">{item.uploader?.name || "Unknown"}</span>
                    </div>
                    
                    <div className="flex gap-6 justify-center md:justify-start pt-4">
                      <button
                        onClick={() => handleDecision(item._id, true)}
                        className="group/btn bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-110 hover:shadow-green-500/30 flex items-center space-x-3 animate-pulse-subtle"
                      >
                        <svg className="w-6 h-6 transition-transform duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleDecision(item._id, false)}
                        className="group/btn bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-110 hover:shadow-red-500/30 flex items-center space-x-3 animate-pulse-subtle"
                        style={{animationDelay: '0.3s'}}
                      >
                        <svg className="w-6 h-6 transition-transform duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* All Items Section */}
        <div>
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-6 bg-white/60 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-blue-200/50">
              <div className="relative">
                <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-indigo-600 rounded-full animate-ping"></div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800">All Submissions</h2>
              <div className="relative">
                <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-indigo-600 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {allItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-gentle">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-slate-600 text-xl font-light">No items found</p>
                <p className="text-slate-400 text-sm mt-2">Submit your first item to get started</p>
              </div>
            ) : (
              allItems.map((item, index) => (
                <div 
                  key={item._id} 
                  className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 border border-blue-100/80 hover:border-blue-300/60 transition-all duration-500 hover:bg-white/70 hover:shadow-xl hover:shadow-blue-500/5 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <img
                      src={getImageUrl(item)}
                      alt={item.title}
                      className="relative w-24 h-24 object-cover rounded-xl border border-blue-200/60 group-hover:border-blue-400/80 transition-all duration-300 shadow-md"
                      onError={e => { e.target.src = "https://via.placeholder.com/80?text=No+Image"; }}
                    />
                  </div>
                  
                  <div className="flex-1 w-full text-center md:text-left space-y-3">
                    <h4 className="text-xl font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                          item.status === 'approved' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : item.status === 'rejected'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                        <span className="text-slate-500">Uploaded by:</span>
                        <span className="font-semibold text-blue-600">{item.uploader?.name || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(90deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(10px) rotate(5deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-sway {
          animation: sway 5s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminPanel;