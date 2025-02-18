export const Card = ({ obj }: {
    obj: {
        _sum: {
            amount: any
        },
        _count: {
            id: any
        }
    }
}) => {
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200 text-center mx-4 max-w-sm">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Transaction Summary</h2>
            <p className="text-lg text-gray-600">
                <span className="font-medium">Total Amount:</span> 
                <span className="text-gray-800 font-bold"> ₹ {obj._sum.amount ?? "0"}</span>
            </p>
            <p className="text-lg text-gray-600 mt-1">
                <span className="font-medium">Total Transactions:</span> 
                <span className="text-gray-800 font-bold"> {obj._count.id}</span>
            </p>
        </div>
    )
}
