import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return(
        <div className="flex items-center bg-[#f3f1ff] px-5 rounded-xl mb-6">
            <input value={value} 
                onChange={onChange} 
                type={isShowPassword? "text" : "password"} 
                placeholder={placeholder || "Password"}
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none placeholder:text-gray-600"
            />

            {isShowPassword? (
                <FaRegEye size={20} 
                    className="text-background cursor-pointer" 
                    onClick={() => toggleShowPassword()} 
                /> ) : (
                 <FaRegEyeSlash size={22} 
                    className="text-slate-400 cursor-pointer" 
                    onClick={() => toggleShowPassword()} 
                />
            )}
        </div>
    )
}

export default PasswordInput