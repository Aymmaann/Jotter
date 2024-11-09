import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleLogin = async(e) => {
        e.preventDefault()

        if(!validateEmail(email)) {
            setError("Please enter a valid email address.")
            return;
        }

        if(!password) {
            setError("Please enter a password.")
            return;
        }

        setError("")

        try {
            const response = await axiosInstance.post("/login", {
                email: email,
                password: password,
            });

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/dashboard");
            }
        }
        catch(error) {
            if(error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            else {
                setError("An unexpected error occured. Please try again.")
            }
        }
    }   

    return(
        <>
            <div className="absolute w-full h-full bg-[#1c0740] bg-[url('/src/assets/images/pattern-background-desktop.svg')] bg-no-repeat">
                <div className="rounded-2xl w-full mt-40 h-[408px]">
                    <div className="flex items-center justify-center">
                        <div className="w-[400px] border rounded-2xl border-none bg-blackbg px-8 py-8 shadow-2xl">
                            <form onSubmit={handleLogin}>
                                <h4 className="text-[26px] mt-2 mb-7 text-white">Login</h4>

                                <label className="text-white text-[14px] ml-1">Email Address</label>
                                <input 
                                    type="text" 
                                    placeholder="johndoe@gmail.com" 
                                    className="input-box mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <label className="text-white text-[14px] ml-1">Password</label>
                                <PasswordInput 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                                <button type="submit" className="btn-primary smooth-transition mt-3 small-shadow">Login</button>

                                <p className="text-sm text-center mt-4 text-white">
                                    Not registered yet?{" "}
                                    <Link to="/signup" className="font-medium text-lightPurple underline">
                                        Create an Account
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login