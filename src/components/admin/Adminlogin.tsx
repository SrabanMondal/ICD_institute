"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/AdminApi2";
import { ToastContainer, toast } from "react-toastify";
import { Nunito } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
const myfont = Nunito({
  weight:'variable',
  subsets:['latin']
})
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(email, password);

    if (response.status) {
      toast.success("Login successful!", { position: "top-center" });
      setTimeout(() => router.push("/admin"), 1500);
    } else {
      toast.error("Invalid email or password!", { position: "top-center" });
    }
  };

  return (
    <div style={{fontFamily:myfont.style.fontFamily}} className="flex justify-center items-center h-screen w-full bg-cover bg-center bg-[url('/loginbg.jpg')]">
      <div className="w-full h-full flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">

      <div className="bg-black bg-opacity-40 p-10 rounded-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800/20 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700/30"
            required
            />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800/20 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-700/30"
            required
            />
          <button
            type="submit"
            className="w-full bg-green-600/50 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
            Login
          </button>
        </form>
      </div>
            </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
