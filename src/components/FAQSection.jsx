import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/products';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#090a0f] border-b border-[#1b1e2a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-bold">
            <HelpCircle size={13} />
            <span>TRANSPARENCY FIRST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Everything you need to know about custom engravings, mockup approvals, bulk slabs, and delivery timelines.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#12141c] border border-[#222637] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#161822] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-[#1b1d2a] flex items-center justify-center text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                    isOpen ? 'rotate-180 text-red-400 bg-red-950/60' : ''
                  }`}>
                    <ChevronDown size={15} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed border-t border-[#1c1f2e] bg-[#0f1118]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#13151f] border border-[#242838] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white">Have a specific custom request or urgent event?</h4>
            <p className="text-xs text-slate-400">Our senior design consultants are available on WhatsApp 7 days a week.</p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi%20Heecart,%20I%20have%20a%20specific%20custom%20gift%20inquiry"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 flex-shrink-0 shadow-md transition-all"
          >
            <MessageSquare size={14} />
            <span>Chat With Designer</span>
          </a>
        </div>

      </div>
    </section>
  );
}
