import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, MessageSquare } from 'lucide-react';

export default function OrderTrackingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [orderId, setOrderId] = useState('HEEC-8924');
  const [trackedOrder, setTrackedOrder] = useState({
    id: 'HEEC-8924',
    customer: 'Vikram Mehta',
    item: 'The Royale Executive Welcome Hamper (50 units)',
    placedDate: '26 Oct 2026',
    estimatedDelivery: '30 Oct 2026',
    courier: 'BlueDart Express Air',
    awb: 'BD839104829IN',
    destination: 'Bengaluru, Karnataka (560001)',
    timeline: [
      {
        title: 'Order Received & Logo Vectorization Queued',
        time: '26 Oct, 10:30 AM',
        desc: 'Custom photos and company engraving text verified by Heecart desk.',
        done: true
      },
      {
        title: 'Digital Mockup Approved on WhatsApp',
        time: '26 Oct, 01:15 PM',
        desc: 'Customer approved 3D rendering of laser placement.',
        done: true
      },
      {
        title: 'Precision Fiber Laser Engraving Complete',
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
        desc: 'Will be delivered securely to corporate office address.',
        done: false
      }
    ]
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setTrackedOrder(prev => ({
        ...prev,
        id: orderId.toUpperCase()
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-red-600" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">Live Order & Mockup Tracker</h2>
              <p className="text-[11px] text-slate-500">Track production, WhatsApp approval, and shipment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 bg-white text-xs">
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. HEEC-8924)"
                className="w-full bg-slate-50 text-slate-900 pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-mono font-bold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs"
            >
              Track
            </button>
          </form>

          {/* Details Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Order Reference</span>
                <p className="font-bold text-slate-900 font-mono">{trackedOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Expected Delivery</span>
                <p className="font-bold text-emerald-700">{trackedOrder.estimatedDelivery}</p>
              </div>
            </div>

            <div className="space-y-1 text-slate-600 text-[11px]">
              <p><strong className="text-slate-800">Item:</strong> {trackedOrder.item}</p>
              <p><strong className="text-slate-800">Courier:</strong> {trackedOrder.courier} (AWB: {trackedOrder.awb})</p>
              <p><strong className="text-slate-800">Destination:</strong> {trackedOrder.destination}</p>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-3 pt-1">
            <p className="font-bold text-slate-800 text-xs">Fulfillment Timeline</p>
            
            <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {trackedOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    step.current
                      ? 'bg-red-600 text-white ring-2 ring-red-200'
                      : step.done
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    ✓
                  </div>
                  <div className="pl-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-xs font-bold ${step.current ? 'text-red-600' : 'text-slate-800'}`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">{step.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Support Help */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="text-[11px] text-emerald-800 font-medium">Need to update delivery address or engraving?</span>
            <a
              href={`https://wa.me/919876543210?text=Hi%20Heecart,%20I%20have%20an%20inquiry%20regarding%20Order%20${trackedOrder.id}`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded text-[11px] flex items-center gap-1"
            >
              <MessageSquare size={12} /> WhatsApp Desk
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
