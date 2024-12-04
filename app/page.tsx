"use client";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import Rightside from "@/components/right"
import Deposit from "@/components/popupdeposit";
import Send from "@/components/sendpopup";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [depositPopup, setdepositPopup] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [sendPopup,setsendPopup] = useState(false)

  const handlelogout = async () => {
    Cookie.remove("access-token");
    console.log("clicked");

    setBalance(0);
    setLoading(true);

    window.location.pathname = "/auth/signup";
  };

  const handlepage = async (token: any) => {
    const res = await axios.get("http://localhost:5000/auth/verify", {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    console.log(res);
    if (res.data.status == "fail") {
      window.location.pathname = "/auth/signup";
    }
    setBalance(res.data.decoded.balance);
    setLoading(false);
    const tArray = res.data.decoded.transactions;
    setTransaction(tArray)
  };
  useEffect(() => {
    const token = Cookie.get("access-token");
    handlepage(token);
  },[]);
  if (loading) {
    return <div className="text-white">loading</div>;
  }

  return (
    <div className="text-black">
      <div className="text-white w-full h-[10vh] bg-blue-900 flex items-center justify-end px-[20px]">
        <p
          className="text-white text-sm font-medium cursor-pointer"
          onClick={handlelogout}
        >
          Logout
        </p>
      </div>
      <div className="flex">
        <div className="w-[50vw] h-[90vh] pl-[50px] pt-[60px]">
          <div className="text-blue-900 text-[30px] flex border-b-[2px] border-blue-900 h-[60px]">
            Current balance :
            <span className="font-[900] bg-slate-300 flex justify-center items-center min-w-[80px] px-[5px] rounded-[5px] h-[50px] mx-[10px]">
              {" "}
              ${balance}
            </span>
          </div>
          <div className="flex justify-between w-[80%] mt-[50px]">
            <div className="bg-blue-800 text-white p-[10px] text-[20px] w-[200px] flex justify-center items-center rounded-[5px]"
            onClick={()=>{
              setsendPopup(true)
            }}>
              Send
            </div>
            <div
              className="bg-green-900 text-white p-[10px] text-[20px] w-[200px] flex justify-center items-center rounded-[5px] cursor-pointer"
              onClick={() => {
                setdepositPopup(true);
              }}
            >
              Deposit
            </div>
            {/* <div></div> */}
          </div>
        </div>
        <Rightside transaction={transaction}></Rightside>
      </div>
      <Deposit
        isOpen={depositPopup}
        onClose={() => {
          setdepositPopup(false);
        }}
      ></Deposit>
      <Send
      isOpen={sendPopup}
      onClose = {()=>{
        setsendPopup(false)
      }}
      ></Send>

    </div>
  );
}
