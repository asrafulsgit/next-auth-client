'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({name : '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInfo.name.trim() || !loginInfo.email.trim() || !loginInfo.password.trim()) {
      // toast.error("Email and password are required");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/v1/user/register", loginInfo);
      router.push("/login");
    } catch (err) {
      console.log(err.response?.data?.message || "Registration failed");
    }
  };


  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className='bg-base-200 border border-gray-300 rounded-box w-sm py-4 px-10'>
          <form onSubmit={handleSubmit} className="fieldset ">
            <legend className="text-2xl font-bold  text-center">Register</legend>

            <div className="flex flex-col gap-1">
                <label className="text-[15px] font-semibold  opacity-80">Name</label>
            <input
              type="name"
              name="name"
              value={loginInfo.name}
              onChange={handleChange}
              className="border-b p-1 outline-0 border-[#0000002e]  text-[16px] font-medium opacity-80"
              placeholder="Name"
              required
            />
            </div>
            <div className="flex flex-col gap-1 mt-2">
                <label className="text-[15px] font-semibold  opacity-80">Email</label>
            <input
              type="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              className="border-b p-1 outline-0 border-[#0000002e]  text-[16px] font-medium opacity-80"
              placeholder="Email"
              required
              
            />
            </div>
            <div className="flex flex-col gap-1 mt-2">
            <label className="text-[15px] font-semibold  opacity-80">Password</label>
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              className="border-b p-1 outline-0 border-[#0000002e]  text-[16px] font-medium opacity-80"
              placeholder="Password"
              required
            />
</div>
            <button type="submit" className="btn px-3 cursor-pointer py-2 w-full rounded-xl bg-[#5c3bd3] 
            text-white mt-4">Register Now</button>
          </form>
          
            <p className="text-sm opacity-80 mt-1">
              Already have an account{" "}
              <Link href="/login" className="font-bold hover:cursor-pointer hover:border-b">Login</Link>
            </p>
        </div>
      </div>
    </>
  );
}
