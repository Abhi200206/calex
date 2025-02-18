export const Expense = ({ obj }: { obj: any }) => {
    const currdate = obj.date ? new Date(obj.date).toLocaleDateString('en-US') : 'Invalid Date';
    const truncatedTo = obj.To && obj.To.length > 30 ? obj.To.slice(0, 18) + "..." : obj.To;

    return (
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-4 m-2 max-w-md">
            <div className="flex justify-between text-gray-600 font-medium mb-2">
                <div className="flex gap-2">
                    <p className="text-gray-800 font-semibold">Date:</p>
                    <p>{currdate}</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-gray-800 font-semibold">Label:</p>
                    <p>{obj.label}</p>
                </div>
            </div>
            <div className="text-gray-600 font-medium space-y-1">
                <div className="flex gap-2">
                    <p className="text-gray-800 font-semibold">To:</p>
                    <p>{truncatedTo}</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-gray-800 font-semibold">Amount:</p>
                    <p className="text-green-600 font-bold">₹{obj.amount}</p>
                </div>
            </div>
        </div>
    );
};
