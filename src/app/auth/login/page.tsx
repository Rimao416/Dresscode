"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px] max-h-[90vh]">
        {/* Left Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Welcome
            </h1>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
              back!
            </h2>
            
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm text-pink-600 hover:text-pink-700 transition-colors">
                  Forgot your password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={() => console.log('Login clicked')}
                className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Login
              </button>
            </div>

            {/* Social Login */}
            <div className="mt-8 space-y-3">
              <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-all duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700 font-medium">Google</span>
              </button>
              
              <button className="w-full flex items-center justify-center space-x-3 border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-all duration-200">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-gray-700 font-medium">Facebook</span>
              </button>
            </div>

            {/* Create Account */}
            <div className="mt-8 text-center space-y-2">
              <p className="text-gray-600">Don't have an account?</p>
              <a href="#" className="text-pink-600 hover:text-pink-700 font-medium transition-colors">
                Create account
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel - Flower Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
                  <defs>
                    <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#ff6b9d;stop-opacity:1" />
                      <stop offset="50%" style="stop-color:#c44569;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#f8b500;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="600" fill="url(#flowerGrad)"/>
                  <circle cx="200" cy="150" r="25" fill="#ff69b4" opacity="0.8"/>
                  <circle cx="600" cy="200" r="30" fill="#ff1493" opacity="0.7"/>
                  <circle cx="400" cy="100" r="20" fill="#ffc0cb" opacity="0.9"/>
                  <circle cx="150" cy="300" r="35" fill="#ff69b4" opacity="0.6"/>
                  <circle cx="650" cy="350" r="25" fill="#ff1493" opacity="0.8"/>
                  <circle cx="300" cy="250" r="40" fill="#ffc0cb" opacity="0.7"/>
                  <circle cx="500" cy="300" r="30" fill="#ff69b4" opacity="0.8"/>
                  <circle cx="100" cy="450" r="28" fill="#ff1493" opacity="0.7"/>
                  <circle cx="700" cy="500" r="32" fill="#ffc0cb" opacity="0.8"/>
                  <circle cx="350" cy="400" r="25" fill="#ff69b4" opacity="0.9"/>
                  <circle cx="550" cy="450" r="35" fill="#ff1493" opacity="0.6"/>
                  <circle cx="250" cy="500" r="30" fill="#ffc0cb" opacity="0.8"/>
                </svg>
              `)}`
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <h3 className="text-4xl lg:text-5xl font-bold mb-4">
                Fresh flowers
              </h3>
              <p className="text-xl lg:text-2xl font-light opacity-90">
                for any special occasion
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}