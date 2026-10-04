"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep("success");
      // Simulate redirect after 2s
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* Header */}
      <header className="p-4 relative z-10">
        <Link href="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-slate-500 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-blue-500/30 mx-auto mb-4">
              S
            </div>
            <h1 className="text-2xl font-black text-slate-800">Welcome to SpeakMate</h1>
            <p className="text-slate-500 font-medium mt-1">Sign in to save your progress</p>
          </div>

          <AnimatePresence mode="wait">
            {step === "phone" && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {/* Google Sign In */}
                <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors mb-6 shadow-sm">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-sm font-bold text-slate-400 uppercase">Or log in with</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                {/* Phone Sign In */}
                <form onSubmit={handleSendOtp}>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 flex items-center gap-2 border-r border-slate-200 pr-3">
                        <span className="text-slate-500 font-bold">+91</span>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Enter your mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 pl-20 pr-4 outline-none focus:border-blue-500 focus:bg-white font-medium text-slate-800 transition-all"
                        required
                        pattern="[0-9]{10}"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                  >
                    Send OTP <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800">Enter Verification Code</h3>
                  <p className="text-sm text-slate-500 mt-1">We've sent a 4-digit code to <br/><span className="font-bold text-slate-700">+91 {phoneNumber}</span></p>
                </div>

                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-8">
                    <input 
                      type="text" 
                      placeholder="• • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                      className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-4 px-4 outline-none focus:border-blue-500 focus:bg-white font-black text-center text-3xl tracking-[1em] text-slate-800 transition-all"
                      required
                      maxLength={4}
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={otp.length !== 4}
                    className="w-full bg-blue-600 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                  >
                    Verify & Continue
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStep("phone")}
                    className="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-600"
                  >
                    Change Phone Number
                  </button>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Login Successful!</h3>
                <p className="text-slate-500 font-medium">Redirecting you to dashboard...</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}

// ArrowRight component (inline since it's not imported above to save space)
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);
