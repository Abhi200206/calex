
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
        <div className="rounded font-sans p-4 border-[1px] text-center mx-4">
            <p>Total amount: {obj._sum.amount == null ?"0":obj._sum.amount}</p>
            <p>Total transactions: {obj._count.id}</p>
        </div>
    )
}