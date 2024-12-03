"use client";

import axios from "axios";
import dotenv from "dotenv"
import Cookie from "js-cookie"
import Link from "next/link";
import { useState } from "react";

dotenv.config()
export default function Signin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error,setError] = useState("")

  const handlesubmit = async ()=>{
    if (!email.includes("@")) {
        setError("Enter a valid email address.");
        return;
    }
    else if (pass.length < 6){
        setError("Password must be at least 6 characters.");
        return;
    }

    setError("");
    const requestBody = {
        email,
        password: pass,
    };
    console.log(process.env.BACKEND_URL)
    const response = await axios.post("http://localhost:5000/auth/signin", requestBody, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    console.log(response) 
    if(response.data.status == "fail"){
        setError(response.data.message)
        return
    }     
    await Cookie.set("access-token", response.data.token)
    window.location.pathname = "/"
  }
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-blue text-white rounded-2xl shadow-2xl  flex flex-col w-[400px]  items-center">
        <h2 className="p-3 text-3xl font-bold text-white">Transactor</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
        <h3 className="text-xl font-semibold text-white pt-2">
          Signin to account
        </h3>
        {error && (
            <div className='flex space-x-9 m-4 items-center justify-center text-red-500 font-bold'>
                {error}
            </div>
        )}
        <div className="flex flex-col items-center justify-center mt-2">
          <input
            type="email"
            className="rounded-[5px] text-black px-2 py-1 w-full border-[1px] border-blue-900 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Email"
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            className="rounded-[5px] text-black px-2 py-1 w-full border-[1px] border-blue-900 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
            placeholder="Password"
            value={pass}
            onChange={(e)=>{
                setPass(e.target.value);
            }}
          ></input>
          <button className="rounded-[10px] m-4 text-blue-400 bg-white w-full px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in"
          onClick={handlesubmit}>
            Sign Up
          </button>
        </div>
        <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
        <p className="text-white mt-4 text-sm">Don't have a account?</p>
        <Link href={"/auth/signup"}
          className="text-white mb-4 text-sm font-medium cursor-pointer" 
        >
          Sign Up?
        </Link>
      </div>
    </div>
  );
}
