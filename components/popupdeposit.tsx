import axios from "axios";
import { use, useState } from "react"
import Cookies from "js-cookie";

export default function Deposit({isOpen, onClose}:any){
    const [amount, setAmount] = useState(0)
    const [error,setError] = useState("")
    const handleDeposit = async ()=>{
        if(amount < 1){
            setError("deposit should be alteast 1")
            return
        }else if(amount > 10000) {
            setError("deposit should be lesser than 10000")
            return
        }
        const token = Cookies.get("access-token")
        const response = await axios.post("http://localhost:5000/deposit", {amount : Number(amount)}, {
            headers: {
                "Content-Type": "application/json",
                token : token
            }
        });
        if(response.data.status == "fail"){
            setError(response.data.message);
            return
        }
        onClose()
    }
    if(!isOpen) return null
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          {error && (
            <div className='flex space-x-9 m-4 items-center justify-center text-red-500 font-bold'>
                {error}
            </div>
        )}
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Enter Deposit Amount
            </h2>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              value={amount}
              onChange={(e:any) => setAmount(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded mr-2 hover:bg-green-700"
                onClick={handleDeposit}
              >
                Deposit
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    )
}