import React, { useState } from "react";

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="relative max-w-3xl w-full bg-white p-10 shadow-lg rounded-lg overflow-hidden">
        <input
          type="checkbox"
          id="flip"
          checked={!isLogin}
          onChange={() => setIsLogin(!isLogin)}
          className="hidden"
        />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1/2 z-10 transition-all duration-1000 ease-in-out origin-left">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="text-center text-white space-y-4">
              <span className="text-2xl font-semibold">
                Every new friend is a <br /> new adventure
              </span>
              <span className="text-sm font-medium">Let's get connected</span>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transform rotate-y-180">
            <div className="text-center text-white space-y-4">
              <span className="text-2xl font-semibold">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-sm font-medium">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {isLogin ? (
            <div className="w-full max-w-md">
              <div className="text-xl font-medium text-gray-700 mb-4">Login</div>
              <form action="#">
                <div className="space-y-4">
                  <div className="flex items-center border-b-2 border-gray-300 py-2">
                    <i className="fas fa-envelope text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                      className="ml-3 w-full p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center border-b-2 border-gray-300 py-2">
                    <i className="fas fa-lock text-gray-400"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="ml-3 w-full p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="text-right text-sm text-blue-500">
                    <a href="#">Forgot password?</a>
                  </div>
                  <div className="text-center mt-6">
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-400"
                    />
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <label
                      htmlFor="flip"
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up now
                    </label>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <div className="text-xl font-medium text-gray-700 mb-4">Signup</div>
              <form action="#">
                <div className="space-y-4">
                  <div className="flex items-center border-b-2 border-gray-300 py-2">
                    <i className="fas fa-user text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="ml-3 w-full p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center border-b-2 border-gray-300 py-2">
                    <i className="fas fa-envelope text-gray-400"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                      className="ml-3 w-full p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center border-b-2 border-gray-300 py-2">
                    <i className="fas fa-lock text-gray-400"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                      className="ml-3 w-full p-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="text-center mt-6">
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-400"
                    />
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <label
                      htmlFor="flip"
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Login now
                    </label>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
