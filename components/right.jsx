export default function Rightside({transaction}){
    const transactions = Array.isArray(transaction) ? transaction : [];
    console.log(transaction)
    return(
        <div className="flex justify-center py-[30px] w-[50vw] h-[90vh]">
          <div>
            <div className="font-[900] text-[30px] text-blue-800">
              Transactions
            </div>
            <div className="flex w-[40vw] h-[70vh] flex-col overflow-scroll overflow-x-hidden">
                {transactions.map((tran,index)=>{
                    function formatDateTime(input){
                        const date = new Date(input);
                    
                        // Format the date as DD/MM/YYYY
                        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
                    
                        // Format the time as HH:MM AM/PM
                        let hours = date.getHours();
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const isPM = hours >= 12;
                        hours = hours % 12 || 12; // Convert to 12-hour format, ensuring 0 becomes 12
                        const formattedTime = `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
                    
                        return { date: formattedDate, time: formattedTime };
                    }
                    const { date, time } = formatDateTime(tran.date);
                    if(tran.type === "deposited"){
                        return(
                            <div className="flex gap-[40px] items-center mt-[40px]" key={index}>
                                <div className="text-green-700 font-bold">Deposited</div>
                                <div className="text-black font-[900] font-mono">${tran.amount}</div>
                                <div className="flex justify-center items-center flex-col">
                                <div className="text-slate-400 font-[900] text-[8px]">
                                    {time}
                                </div>
                                <div className="text-blue-900 font-bold text-[12px]">
                                    {date}
                                </div>
                                </div>
                            </div>
                        )
                    }else if(tran.type === "received"){
                        return(
                            <div className="flex gap-[40px] items-center mt-[40px]" key={index}>
                                <div className="text-green-700 font-bold">Received</div>
                                <div className="text-black font-[900] font-mono">+${tran.amount}</div>
                                <div className="flex justify-center items-center flex-col">
                                    <div className="text-slate-400 font-[900] text-[8px]">
                                        {time}
                                    </div>
                                    <div className="text-blue-900 font-bold text-[12px]">
                                        {date}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <div className="text-slate-400 font-[900] text-[8px]">
                                        from
                                    </div>
                                    <div className="text-blue-900 font-bold text-[12px]">
                                        {tran.from}
                                    </div>
                                </div>
                            </div>
                        )
                    }else {
                        return(
                            <div className="flex gap-[40px] items-center mt-[40px]" key={index}>
                                <div className="text-green-700 font-bold">Sent</div>
                                <div className="text-black font-[900] font-mono">-${tran.amount}</div>
                                <div className="flex justify-center items-center flex-col">
                                    <div className="text-slate-400 font-[900] text-[8px]">
                                        {time}
                                    </div>
                                    <div className="text-blue-900 font-bold text-[12px]">
                                        {date}
                                    </div>
                                </div>
                                <div className="flex justify-center items-center flex-col">
                                    <div className="text-slate-400 font-[900] text-[8px]">
                                        to
                                    </div>
                                    <div className="text-blue-900 font-bold text-[12px]">
                                        {tran.to}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            {/* <div className="flex gap-[40px] items-center">
                <div className="text-green-700 font-bold">deposited</div>
                <div className="text-black font-[900] font-mono">$999</div>
                <div className="flex justify-center items-center flex-col">
                  <div className="text-slate-400 font-[900] text-[8px]">
                    03/12/2024
                  </div>
                  <div className="text-green-700 font-bold text-[15px]">
                    03/12/2024
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
    )
}