'use client'

import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [loading,setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
  const res = await signIn("credentials", {
    redirect: false,  
    email : loginInfo.email,
    password : loginInfo.password,
  });

  if (res?.error) {
    toast.error('Login Failed with an error. try Again!')
    setLoading(false);
  } else {
    toast.success("Login successful")
    router.push('/')
    setLoading(false);
  }

  };
  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className='bg-base-200 border border-gray-300 rounded-box w-sm py-4 px-10'>
          <form onSubmit={handleSubmit} className="fieldset ">
            <legend className="text-2xl font-bold  text-center">Login</legend>

            <div className="flex flex-col gap-1">
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
            text-white mt-4">{loading? 'Loging...' :'Login'}</button>
          </form>
          
            <p className="text-sm opacity-80 mt-1">
              Create an Account{" "}
              <Link href="/register" className="font-bold hover:cursor-pointer hover:border-b">Register</Link>
            </p>
        </div>
      </div>
    </>
  );
}
