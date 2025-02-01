export const Slider=({cb,cb1}:{cb:any,cb1:any})=>{
    return (
        <div>
            <Input cb1={cb1} value="grocery" cb={cb}/>
            <Input cb1={cb1} value="food" cb={cb}/>
            <Input cb1={cb1} value="infotatinment" cb={cb}/>
            <Input cb1={cb1} value="shopping" cb={cb}/>
            <Input cb1={cb1} value="utilities" cb={cb}/>
        </div>
    )
}
export const Slidermonth=({cb,cb1}:{cb:any,cb1:any})=>{
    return (
        <div>
            <Input cb1={cb1} value={1} cb={cb}/>
            <Input cb1={cb1} value={2} cb={cb}/>
            <Input cb1={cb1} value={3} cb={cb}/>
            <Input cb1={cb1} value={4} cb={cb}/>
            <Input cb1={cb1} value={5} cb={cb}/>
            <Input cb1={cb1} value={6} cb={cb}/>
            <Input cb1={cb1} value={7} cb={cb}/>
            <Input cb1={cb1} value={8} cb={cb}/>
            <Input cb1={cb1} value={9} cb={cb}/>
            <Input cb1={cb1} value={10} cb={cb}/>
            <Input cb1={cb1} value={11} cb={cb}/>
            <Input cb1={cb1} value={12} cb={cb}/>
        </div>
    )
}

function Input({value,cb,cb1}:{value:string|number,cb:any,cb1:any})
{
    return (
        <div onClick={()=>{
            cb(value);
            cb1(false);
        }} className="p-2 cursor-pointer hover:bg-slate-200">
            <p>{value}</p>
        </div>
    )
}