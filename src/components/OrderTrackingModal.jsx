import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, ShieldCheck, MapPin, ExternalLink, MessageSquare } from 'lucide-react';

export default function OrderTrackingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [orderId, setOrderId] = useState('HEEC-8924');
  const [trackedOrder, setTrackedOrder] = useState({
    id: 'HEEC-8924',
    customer: 'Sneha Sharma',
    item: 'The Royale Executive Welcome Hamper + Custom Mosaic Frame',
    placedDate: '26 Oct 2026',
    estimatedDelivery: '30 Oct 2026',
    courier: 'BlueDart Express Air',
    awb: 'BD839104829IN',
    destination: 'Bengaluru, Karnataka (560001)',
    status: 'In Transit',
    currentStepIndex: 3, // 0 to 4
    timeline: [
      {
        title: 'Order Received & Personalization Queued',
        time: '26 Oct, 10:30 AM',
        desc: 'Custom photos and engraving text verified by Heecart studio.',
        done: true
      },
      {
        title: 'Digital Mockup Approved on WhatsApp',
        time: '26 Oct, 01:15 PM',
        desc: 'Customer approved 3D rendering of laser placement.',
        done: true
      },
      {
        title: 'Precision Fiber Laser Engraving & Handcrafted Assembly',
        time: '27 Oct, 04:45 PM',
        desc: 'Passed 10-point optical quality & scratch inspection.',
        done: true
      },
      {
        title: 'Dispatched via BlueDart Express Air',
        time: '28 Oct, 09:20 AM',
        desc: 'Package picked up from Heecart central hub. In transit.',
        done: true,
        current: true
      },
      {
        title: 'Out for Doorstep Delivery',
        time: 'Expected 30 Oct',
        desc: 'Will be delivered securely to customer address.',
        done: false
      }
    ]
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate lookup
    if (orderId.trim()) {
      setTrackedOrder(prev => ({
        ...prev,
        id: orderId.toUpperCase(),
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0f1118] border border-[#2b2f42] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#212435] bg-[#131622] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Truck size={17} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Live Order & Mockup Tracker</h2>
              <p className="text-xs text-slate-400">Track your personalized gift crafting and shipment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b1e2c] hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={15} />
              </div>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your Order ID (e.g. HEEC-8924)"
                className="w-full bg-[#161822] text-white pl-9 pr-3 py-2.5 rounded-xl border border-[#292c3e] focus:outline-none focus:border-red-500 text-xs sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-glow-red transition-all flex-shrink-0"
            >
              Track Order
            </button>
          </form>

          {/* Tracked Order Details Card */}
          <div className="p-4 rounded-2xl bg-[#141620] border border-[#232738] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#202332] pb-3">
              <div>
                <span className="text-[10px] font-bold text-red-400 tracking-wider uppercase">Order Reference</span>
                <p className="text-sm font-bold text-white font-mono">{trackedOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Estimated Delivery</span>
                <p className="text-xs font-bold text-emerald-400">{trackedOrder.estimatedDelivery}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-400">Items: </span>
                <span className="font-medium text-white">{trackedOrder.item}</span>
              </div>
              <div>
                <span className="text-slate-400">Carrier: </span>
                <span className="font-medium text-white">{trackedOrder.courier} ({trackedOrder.awb})</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400">Destination: </span>
                <span className="font-medium text-white">{trackedOrder.destination}</span>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4 pt-2">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Production & Shipment Stages</p>
            
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#232738]">
              {trackedOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Indicator Dot */}
                  <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step.current
                      ? 'bg-red-600 text-white shadow-glow-red ring-4 ring-red-950 animate-pulse'
                      : step.done
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#222536] text-slate-500'
                  }`}>
                    {step.done ? <CheckCircle2 size={13} /> : idx + 1}
                  </div>

                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${step.current ? 'text-red-400' : step.done ? 'text-white' : 'text-slate-400'}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{step.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need help footer */}
          <div className="p-3.5 rounded-xl bg-[#141622] border border-[#212534] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-red-500 flex-shrink-0" />
              <span className="text-slate-300">Need to modify photo or delivery address?</span>
            </div>
            <a
              href={`https://wa.me/919876543210?text=Hi%20Heecart,%20I%20have%20a%20question%20regarding%20my%20Order%20${trackedOrder.id}`}
              target="_blank"
              rel="noreferrer"
              className="text-green-400 font-bold hover:underline flex items-center gap-1"
            >
              <MessageSquare size={13} /> Chat with Studio
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
