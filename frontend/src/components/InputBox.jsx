function InputBox({label,placeholder,onChange}){
    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input onChange={onChange} placeholder={placeholder} className="w-full rounded-md border-2 border-gray-300 px-2" type="text" />
    </div>
}

export default InputBox