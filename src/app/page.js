'use client'

import Link from "next/link";

export default function Home() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      // toast.error("Email and password are required");
      return;
    }

  };
  return (
    <>
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className='bg-base-200 border-base-300 rounded-box w-sm border py-4 px-10'>
          <form onSubmit={handleSubmit} className="fieldset ">
            <legend className="text-2xl font-bold  text-center">Login</legend>

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

            <button type="submit" className="btn bg-[#5c3bd3]  text-white mt-4">Login</button>
            <p className="text-sm opacity-80 mt-1 text-right">
              <Link to="/forget-password" className="font-bold hover:cursor-pointer hover:border-b">Forget Password</Link>
            </p>
          
          </form>
          
            <p className="text-sm opacity-80 mt-1">
              Create an Account{" "}
              <Link to="/register" className="font-bold hover:cursor-pointer hover:border-b">Register</Link>
            </p>
        </div>
      </div>
    </>
  );
}
