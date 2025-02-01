export const Expense = ({ obj }: { obj: any }) => {
    const currdate = obj.date ? new Date(obj.date).toLocaleDateString('en-US') : 'Invalid Date';
   if(obj.To&&obj.To.length>30)
   {
    obj.To=obj.To.slice(0,18)+"...";
   }
    return (
        <div className="rounded border-[1px] p-2 m-2">
            <div className="flex font-sans font-semibold text-slate-500 justify-between my-2">
                <div className="flex gap-2 mr-2">
                    <p className="text-black">Date: </p>
                    <p>{currdate}</p>
                </div>
                <div className="flex gap-2 ml-2">
                    <p className="text-black">Label: </p>
                    <p>{obj.label}</p>
                </div>
            </div>
            <div className="font-sans font-semibold text-slate-500">
                <div className="flex gap-2">
                    <p className="text-black">To: </p>
                    <p>{obj.To}</p>
                </div>
                <div className="flex gap-2"> 
                    <p className="text-black">Amount:  </p>
                    <p>{obj.amount} /-</p>
                    </div>
            </div>
           
        </div>
    );
};
