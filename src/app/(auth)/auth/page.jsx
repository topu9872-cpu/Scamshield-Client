"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSignUp = (e) => {
   e.preventDefault()
   const formData=Object.fromEntries(new FormData(e.target))
    console.log(formData)
  };
  const handleSignIn = (e) => {
   e.preventDefault()
   const formData=Object.fromEntries(new FormData(e.target))
    console.log(formData)
  };
  

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 md:p-10 relative overflow-hidden select-none">
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-zinc-900/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-zinc-900/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-md md:max-w-4xl h-auto md:h-140 rounded-4xl border border-zinc-100 bg-zinc-950/40 backdrop-blur-xl flex flex-col md:flex-row relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-500">
        {/* ================= BACKGROUND FORMS LAYER ================= */}
        <div className="relative md:absolute inset-0 flex flex-col md:flex-row w-full h-full">
          {/* Left Split Panel: Sign In Form */}
          <div
            className={`w-full md:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isSignUp
                ? "opacity-0 invisible -translate-x-8 max-md:h-0 max-md:p-0 overflow-hidden"
                : "opacity-100 visible translate-x-0"
            }`}
          >
            <div className="max-w-sm w-full mx-auto space-y-5">
              <div>
                <div className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-4">
                  <Image
                    src="https://logos.ask.gov.sg/scamshield.png"
                    alt="ScamShield Logo"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your credentials to access your secure panel.
                </p>
              </div>

              {/* Social Login Icons with Tooltips */}
              <div className="flex items-center justify-center gap-4 py-2">
                {/* Google */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaGoogle className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    Google
                  </span>
                </div>

                {/* Facebook */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaFacebook className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    Facebook
                  </span>
                </div>

                {/* GitHub */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaGithub className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    GitHub
                  </span>
                </div>
              </div>

              <div className="relative flex py-1 items-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                <div className="grow border-t border-zinc-900"></div>
                <span className="shrink mx-4">Or secure via mail</span>
                <div className="grow border-t border-zinc-900"></div>
              </div>

              <form
                className="space-y-3.5"
                onSubmit={handleSignIn}
              >
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Email Address
                  </label>
                  <input
                  name='loginemail'
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/30 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
                    Password
                  </label>
                  <input name='loginpassword'
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/30 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.99] transition-all duration-300 mt-1 shadow-lg shadow-white/5"
                >
                  Sign In
                </button>
              </form>

              {/* Mobile View Toggle Trigger */}
              <div className="text-center md:hidden pt-2">
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  NEW SYSTEM USER?{" "}
                  <span className="text-white underline ml-1 font-bold">
                    REGISTER
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Split Panel: Sign Up Form */}
          <div
            className={`w-full md:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isSignUp
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible translate-x-8 max-md:h-0 max-md:p-0 overflow-hidden"
            }`}
          >
            <div className="max-w-sm w-full mx-auto space-y-3.5">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Create account
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Get custom real-time network threat monitoring spaces.
                </p>
              </div>

              {/* Social Registration Icons with Tooltips */}
              <div className="flex items-center justify-center gap-4 py-1">
                {/* Google */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaGoogle className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    Google
                  </span>
                </div>

                {/* Facebook */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaFacebook className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    Facebook
                  </span>
                </div>

                {/* GitHub */}
                <div className="group relative">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-full border border-zinc-800 bg-zinc-900/20 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-900/60 active:scale-95 transition-all duration-200"
                  >
                    <FaGithub className="text-xl" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-black bg-white rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-md whitespace-nowrap z-30">
                    GitHub
                  </span>
                </div>
              </div>

              <div className="relative flex py-0.5 items-center font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                <div className="grow border-t border-zinc-900"></div>
                <span className="shrink mx-4">Or sign up</span>
                <div className="grow border-t border-zinc-900"></div>
              </div>

              <form
                className="space-y-2.5"
                onSubmit={handleSignUp}
              >
                {/* Interactive Avatar Custom File Upload Indicator */}
                <div className="flex justify-center py-0.5">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative h-14 w-14 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 flex items-center justify-center cursor-pointer overflow-hidden hover:border-zinc-700 transition-all duration-300"
                  >
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <input  name='image'
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">
                    Full Name
                  </label>
                  <input
                  name='name'
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900/30 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">
                    Email Address
                  </label>
                  <input
                  name='email'
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900/30 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">
                    Password
                  </label>
                  <input name='password'
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900/30 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700 text-sm transition-colors duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-[0.99] transition-all duration-300 mt-1 shadow-lg shadow-white/5"
                >
                  Register Securely
                </button>
              </form>

              {/* Mobile View Toggle Trigger */}
              <div className="text-center md:hidden pt-2">
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  ALREADY SECURED?{" "}
                  <span className="text-white underline ml-1 font-bold">
                    SIGN IN
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOREGROUND SLIDING OVERLAY PANEL ================= */}
        <div
          className="hidden md:flex absolute top-0 bottom-0 w-1/2 bg-zinc-950 border border-zinc-900 z-20 flex flex-col justify-between p-12 overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: isSignUp ? "translateX(0%)" : "translateX(100%)",
            borderRadius: isSignUp ? "31px 0px 0px 31px" : "0px 31px 31px 0px",
          }}
        >
          {/* Tech Grid Overlay inside the Slider Block */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[3rem_3rem] pointer-events-none" />

          <div className="flex items-center gap-2 relative z-10">
            <Image
              src="https://logos.ask.gov.sg/scamshield.png"
              alt="Logo"
              width={24}
              height={24}
              className="brightness-0 invert"
            />
            <span className="font-bold tracking-tight text-white text-sm font-mono">
              SCAMSHIELD // SYSTEM
            </span>
          </div>

          {/* Dynamic Floating Banner Text Modules */}
          <div className="relative z-10 min-h-40">
            {/* Content Shown when user views the Sign Up Panel */}
            <div
              className={`absolute inset-0 flex flex-col justify-center space-y-4 transition-all duration-500 delay-100 ${
                isSignUp
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
              }`}
            >
              <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">
                Already secured?
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Sign back into your profile space to keep active tabs on
                potential online fraud vectors and communication pipelines.
              </p>
            </div>

            {/* Content Shown when user views the Sign In Panel */}
            <div
              className={`absolute inset-0 flex flex-col justify-center space-y-4 transition-all duration-500 delay-100 ${
                !isSignUp
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
              }`}
            >
              <h3 className="text-3xl font-bold tracking-tight text-white leading-tight">
                New to the platform?
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                Create an analysis account today to process data through our
                secure, autonomous threat pattern processing frameworks.
              </p>
            </div>
          </div>

          {/* Control Button Container */}
          <div className="relative z-10">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="px-5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 text-xs font-mono font-medium text-zinc-300 hover:text-white hover:border-zinc-700 active:scale-[0.97] transition-all duration-300 backdrop-blur-sm"
            >
              {isSignUp ? "EXECUTE: SIGN IN" : "EXECUTE: REGISTER"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
