import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSignUp = async(e) => {
        e.preventDefault()

        if(!name) {
            setError("Please enter a name")
            return;
        }
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
            const response = await axiosInstance.post("/create-account", {
                fullName: name,
                email: email,
                password: password,
            });

            if(response.data && response.data.error) {
                setError(response.data.message)
                return
            }

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate('/dashboard')
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
                <div className="rounded-2xl w-full mt-32 h-[408px]">
                    <div className="flex items-center justify-center">
                        <div className="w-[400px] border rounded-2xl border-none bg-blackbg px-8 py-8 shadow-2xl">
                            <form onSubmit={handleSignUp}>
                                <h4 className="text-[26px] mt-2 mb-7 text-white">Sign Up</h4>

                                <label className="text-white text-[14px] ml-1">Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="input-box mt-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

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

                                <button type="submit" className="btn-primary smooth-transition mt-3 small-shadow">Create Account</button>

                                <p className="text-sm text-center mt-4 text-white">
                                    Already have an account?{" "}
                                    <Link to="/login" className="font-medium text-lightPurple underline">
                                        Login
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

export default SignUp