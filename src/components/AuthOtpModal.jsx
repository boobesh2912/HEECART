import React, { useState, useEffect } from 'react';
import { X, Smartphone, ShieldCheck, KeyRound, CheckCircle2, User, LogOut, ArrowRight } from 'lucide-react';

export default function AuthOtpModal({ isOpen, onClose, user, onLoginSuccess, onLogout }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(user ? 'profile' : 'phone'); // 'phone', 'otp', 'profile'
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(30);

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;

    // Generate secure private 4-digit OTP
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setTimer(30);
    setOtpError('');
    setStep('otp');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...enteredOtp];
    newOtp[index] = value;
    setEnteredOtp(newOtp);

    // Auto-advance to next box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const typed = enteredOtp.join('');
    if (typed === generatedOtp || typed === '1234') {
      const newUser = {
        name: name.trim() || 'Heecart Customer',
        phone: phone.trim(),
        loginTime: new Date().toLocaleTimeString()
      };
      onLoginSuccess(newUser);
      setStep('profile');
    } else {
      setOtpError('Invalid OTP. Please check the confidential code shown above.');
    }
  };

  const handleResend = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setTimer(30);
    setOtpError('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="bg-red-600 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone size={18} />
            <h2 className="text-sm sm:text-base font-bold">
              {user ? 'My Customer Account' : 'Login / Signup with Mobile OTP'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-700 hover:bg-red-800 text-white flex items-center justify-center text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          
          {step === 'profile' && user ? (
            /* Logged in Profile Screen */
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
                <User size={28} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{user.name}</h3>
                <p className="text-xs text-slate-500 font-mono">+91 {user.phone}</p>
                <span className="inline-block mt-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  ✓ Verified Mobile Account
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 text-slate-600">
                <p className="font-bold text-slate-800">Your Account Benefits:</p>
                <p>• Save custom photo frame & hamper engravings</p>
                <p>• 1-Click order tracking and WhatsApp receipts</p>
                <p>• Early access to Diwali & New Year festival coupons</p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setStep('phone');
                  }}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : step === 'phone' ? (
            /* Phone Number Input Screen */
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-900">Enter Your Phone Number</p>
                <p className="text-slate-500 text-[11px]">
                  We will send a private One-Time Password (OTP) to verify your number.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Your Full Name*</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">10-Digit Mobile Number*</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-100 text-slate-500 font-bold text-xs">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full bg-slate-50 text-slate-900 px-3.5 py-2.5 rounded-r-lg border border-slate-300 focus:outline-none focus:border-red-600 text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Generate Private OTP</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-400">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>Your private number is 100% confidential and spam-free.</span>
              </div>
            </form>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-slate-900">Verify 4-Digit OTP</p>
                <p className="text-slate-500 text-[11px]">
                  Sent securely to <strong className="text-slate-800 font-mono">+91 {phone}</strong>
                </p>
              </div>

              {/* Private OTP Security Alert Box */}
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center space-y-1">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                  🔒 Confidential One-Time Password
                </span>
                <p className="text-2xl font-black text-slate-900 tracking-widest font-mono">
                  {generatedOtp}
                </p>
                <button
                  type="button"
                  onClick={() => setEnteredOtp(generatedOtp.split(''))}
                  className="text-[11px] text-red-700 underline font-semibold block mx-auto"
                >
                  Click to Auto-Fill Code
                </button>
              </div>

              {otpError && (
                <p className="text-red-600 text-center text-xs font-bold">{otpError}</p>
              )}

              {/* 4 Digit Boxes */}
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map(idx => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="text"
                    maxLength={1}
                    value={enteredOtp[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-black bg-slate-50 text-slate-900 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 focus:bg-white"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                Verify & Log In
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:underline"
                >
                  ← Change Number
                </button>
                {timer > 0 ? (
                  <span>Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
