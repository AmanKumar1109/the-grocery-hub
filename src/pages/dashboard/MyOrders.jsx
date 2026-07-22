import React, { useState, useRef } from 'react';
import { Package, Clock, CheckCircle2, XCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/dashboard/EmptyState';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const mockOrders = [
  { id: 'ORD-84321', status: 'active', date: 'Today, 2:30 PM', items: 5, amount: 450, expected: 'Today, 4:00 PM', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150' },
  { id: 'ORD-84319', status: 'delivered', date: 'Yesterday, 10:15 AM', items: 12, amount: 1240, deliveredAt: 'Yesterday, 11:30 AM', image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=150' },
  { id: 'ORD-84290', status: 'cancelled', date: 'Mon, 18 Jul', items: 3, amount: 210, cancelledReason: 'Items out of stock', image: 'https://images.unsplash.com/photo-1596199050105-6d5d32222916?auto=format&fit=crop&q=80&w=150' }
];

export default function MyOrders() {
  const [activeTab, setActiveTab] = useState('all');
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.order-card', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, { dependencies: [activeTab], scope: containerRef });

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const getStatusConfig = (status) => {
    switch(status) {
      case 'active': return { color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock, label: 'In Progress' };
      case 'delivered': return { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CheckCircle2, label: 'Delivered' };
      case 'cancelled': return { color: 'text-red-600', bg: 'bg-red-50', icon: XCircle, label: 'Cancelled' };
      default: return { color: 'text-slate-600', bg: 'bg-slate-50', icon: Package, label: status };
    }
  };

  return (
    <div ref={containerRef} className="pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Orders</h1>
          <p className="text-slate-500 font-medium mt-1">Track, manage and view your order history</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 px-2 sm:px-0 snap-x">
        {['all', 'active', 'delivered', 'cancelled'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`snap-start px-5 py-2.5 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-slate-900 text-white shadow-md scale-100' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 scale-95 hover:scale-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;
            
            return (
              <div key={order.id} className="order-card bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${statusConfig.bg} ${statusConfig.color}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{order.id}</p>
                      <p className="text-xs font-medium text-slate-500">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">₹{order.amount.toFixed(2)}</p>
                    <p className={`text-xs font-bold ${statusConfig.color}`}>{statusConfig.label}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                    <img src={order.image} alt="Order items" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 line-clamp-1">Fresh Groceries & Vegetables</h4>
                    <p className="text-sm font-medium text-slate-500 mt-1">{order.items} items</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {order.status === 'active' && (
                    <Link to={`/dashboard/track-order/${order.id}`} className="flex-1 min-w-[120px] py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-center font-bold text-sm rounded-xl transition-colors">
                      Track Order
                    </Link>
                  )}
                  {order.status === 'delivered' && (
                    <button className="flex-1 min-w-[120px] py-2.5 bg-[#facc15] hover:bg-[#eab308] text-slate-950 text-center font-extrabold text-sm rounded-xl transition-colors shadow-sm">
                      Reorder
                    </button>
                  )}
                  <button className="flex-1 min-w-[120px] py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-center font-bold text-sm rounded-xl transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <EmptyState 
            icon={Package}
            title="No orders found"
            description={`You don't have any ${activeTab !== 'all' ? activeTab : ''} orders yet.`}
            actionText="Start Shopping"
            actionLink="/"
          />
        )}
      </div>
    </div>
  );
}
