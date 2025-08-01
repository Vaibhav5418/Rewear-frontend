import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [swaps, setSwaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get(`${baseURL}/api/auth/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);

        const itemsRes = await axios.get(`${baseURL}/items/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyItems(itemsRes.data);

        setSwaps([]); // Placeholder
      } catch (err) {
        alert("Unauthorized. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
        <p className="text-slate-700 text-lg font-medium mt-4 animate-pulse">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-blue-100 transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-bounce-gentle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">
                    Welcome, {user.name} 
                    {user.role === "admin" && (
                      <span className="ml-2 px-3 py-1 text-sm bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full font-medium animate-pulse">
                        Admin
                      </span>
                    )}
                  </h2>
                  <p className="text-blue-600">Ready to swap something awesome?</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 animate-slide-in-left">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Email</p>
                    <p className="text-slate-800 font-medium">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 animate-slide-in-up">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse animation-delay-300">
                    <span className="text-blue-600 text-xl">👤</span>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Role</p>
                    <p className="text-slate-800 font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 animate-slide-in-right">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse animation-delay-600">
                    <span className="text-blue-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-slate-600 text-sm">Points</p>
                    <p className="text-slate-800 font-medium text-xl animate-number-count">{user.points}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* My Items Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-blue-100 animate-fade-in-up animation-delay-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce-gentle">
                <span className="text-white text-xl">📦</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">My Uploaded Items</h3>
            </div>
            
            {myItems.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                  <span className="text-4xl">📤</span>
                </div>
                <p className="text-slate-600 text-lg">No items uploaded yet.</p>
                <p className="text-slate-500 text-sm mt-2">Start by uploading your first item to swap!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myItems.map((item, index) => (
                  <div 
                    key={item._id} 
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 hover:bg-white/80 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <img
                        src={`${baseURL}${item.imageUrl}`}
                        alt={item.title}
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={e => { e.target.src = "https://via.placeholder.com/100?text=No+Image"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h4>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        item.status === 'approved' ? 'bg-green-500' : 
                        item.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                      } animate-pulse`}></div>
                      <p className="text-sm text-slate-600 capitalize">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Swaps Section */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-blue-100 animate-fade-in-up animation-delay-600">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-white text-xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Ongoing & Completed Swaps</h3>
            </div>
            
            <div className="text-center py-12 animate-fade-in">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                <span className="text-4xl">🚀</span>
              </div>
              <p className="text-slate-600 text-lg mb-2">Coming soon...</p>
              <p className="text-slate-500 text-sm">We're building something amazing for you!</p>
            </div>
          </div>

          {/* Admin Panel */}
          {user.role === "admin" && (
            <div className="bg-gradient-to-r from-blue-100/80 to-blue-200/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-blue-200 animate-fade-in-up animation-delay-900">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white text-xl">🔐</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Admin Panel</h3>
              </div>
              
              <button
                onClick={() => navigate("/admin/pending-items")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-pulse"
              >
                <span className="flex items-center space-x-2">
                  <span>📋</span>
                  <span>Review Pending Items</span>
                </span>
              </button>
            </div>
          )}

          {/* Logout Button */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-100 animate-fade-in-up animation-delay-1200">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🚪</span>
                <span>Logout</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
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
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-gentle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
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
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes number-count {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-number-count {
          animation: number-count 2s ease-in-out infinite;
        }
        
        .animation-delay-150 { animation-delay: 150ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
        .animation-delay-2000 { animation-delay: 2000ms; }
      `}</style>
    </div>
  );
}

export default Dashboard;