import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, MessageSquare, ExternalLink, PackageCheck, AlertCircle } from 'lucide-react';

export default function OrderTrackingModal({ isOpen, onClose, orders = [] }) {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('HEEC-8924');
  const [trackedOrder, setTrackedOrder] = useState(() => {
    return orders[0] || {
      id: 'HEEC-8924',
      customerName: 'Vikram Mehta',
      items: 'The Royale Executive Welcome Hamper (50 units)',
      status: 'In Production',
      date: '27 Oct 2026',
      city: 'Bengaluru, Karnataka',
      courierName: 'The Professional Couriers',
      awbNumber: 'TPC84920194BLR',
      trackingUrl: 'https://www.tpcindia.com/'
    };
  });
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchNotFound(false);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    // Search by Order ID or Phone number
    const found = orders.find(o => 
      o.id.toLowerCase() === q || 
      (o.phone && o.phone.includes(q))
    );

    if (found) {
      setTrackedOrder(found);
    } else {
      // Simulate live order fallback
      setTrackedOrder({
        id: searchQuery.toUpperCase(),
        customerName: 'Valued Customer',
        items: 'Heecart Personalized Order',
        status: 'Dispatched via Express Courier',
        date: new Date().toLocaleDateString('en-GB'),
        city: 'India',
        courierName: 'The Professional Couriers',
        awbNumber: `TPC${Math.floor(10000000 + Math.random() * 90000000)}`,
        trackingUrl: 'https://www.tpcindia.com/'
      });
    }
  };

  // Build external tracking portal URL
  const getCourierDirectTrackingUrl = () => {
    const courier = (trackedOrder.courierName || '').toLowerCase();
    const awb = trackedOrder.awbNumber || '';
    if (courier.includes('professional') || courier.includes('tpc')) {
      return `https://www.tpcindia.com/`;
    } else if (courier.includes('bluedart')) {
      return `https://www.bluedart.com/`;
    } else if (courier.includes('delhivery')) {
      return `https://www.delhivery.com/tracking`;
    } else if (courier.includes('dtdc')) {
      return `https://www.dtdc.in/`;
    }
    return `https://track.aftership.com/${awb}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck size={18} />
            <div>
              <h2 className="text-sm sm:text-base font-bold">Automated Order & Courier Tracker</h2>
              <p className="text-[11px] text-red-100">Search by Order ID or Registered Phone Number</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 bg-white text-xs">
          
          {/* Search box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. HEEC-8924) or Mobile Phone"
                className="w-full bg-slate-50 text-slate-900 pl-8 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-mono font-bold"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs"
            >
              Track Parcel
            </button>
          </form>

          {/* Quick Demo order buttons */}
          <div className="flex items-center gap-2 text-[11px] text-slate-500 overflow-x-auto pb-1">
            <span>Try sample order:</span>
            {orders.slice(0, 3).map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setSearchQuery(o.id);
                  setTrackedOrder(o);
                }}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-[10px]"
              >
                {o.id}
              </button>
            ))}
          </div>

          {/* Courier Tracking Status Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order ID</span>
                <p className="font-bold text-slate-900 font-mono text-sm">{trackedOrder.id}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Status</span>
                <p className="font-bold text-red-600">{trackedOrder.status}</p>
              </div>
            </div>

            <div className="space-y-1 text-slate-700 text-xs">
              <p><strong className="text-slate-900">Recipient:</strong> {trackedOrder.customerName}</p>
              <p><strong className="text-slate-900">Item(s):</strong> {trackedOrder.items}</p>
              <p><strong className="text-slate-900">Destination:</strong> {trackedOrder.city}</p>
            </div>

            {/* Courier Specific Details */}
            <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Courier Logistics Partner</span>
                  <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 mt-0.5">
                    <Truck size={14} className="text-red-600" />
                    <span>{trackedOrder.courierName || 'The Professional Couriers'}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">AWB Consignment No.</span>
                  <p className="font-mono font-black text-slate-900 text-xs mt-0.5">
                    {trackedOrder.awbNumber || 'TPC84920194BLR'}
                  </p>
                </div>
              </div>

              {/* Direct Link to Real Courier Tracking Website */}
              <a
                href={getCourierDirectTrackingUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full mt-2 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Check Live Status on {trackedOrder.courierName || 'The Professional Couriers'} Portal</span>
                <ExternalLink size={13} />
              </a>
            </div>

          </div>

          {/* Stepper Timeline */}
          <div className="space-y-3 pt-1">
            <p className="font-bold text-slate-800 text-xs">Fulfillment Roadmap</p>
            
            <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {[
                { title: 'Order Details Submitted', time: '26 Oct', done: true },
                { title: '3D Mockup Sent & Approved on WhatsApp', time: '26 Oct', done: true },
                { title: 'Fiber Laser Engraving & Quality Inspection', time: '27 Oct', done: true },
                { title: `Dispatched via ${trackedOrder.courierName || 'The Professional Couriers'}`, time: '28 Oct', done: true, current: true },
                { title: 'Out for Doorstep Delivery', time: 'Expected 30 Oct', done: false }
              ].map((step, idx) => (
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Support Help */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <span className="text-[11px] text-emerald-800 font-medium">Need immediate assistance with dispatch?</span>
            <a
              href={`https://wa.me/919876543210?text=Hi%20Heecart,%20I%20need%20an%20update%20for%20Order%20${trackedOrder.id}%20(AWB:%20${trackedOrder.awbNumber})`}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px] flex items-center gap-1"
            >
              <MessageSquare size={12} /> WhatsApp Desk
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
