interface ButtonProp{
    label : string
    onClick : ()=>void
}

export const Button=({label, onClick} : ButtonProp)=>{
    return <>
        <div className="py-6">
            <button
                className="bg-black text-white hover:bg-gray-700 hover:text-white rounded-md py-2 w-full mb-2"
                onClick={onClick}>
                {label}
            </button>
        </div>
        
    </>
}