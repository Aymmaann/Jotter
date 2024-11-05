import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import Notepad from "../../assets/images/notepad.png";

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
            <Navbar />

            <div className="flex rounded-2xl w-full justify-center items-center mt-28 h-[408px]">
                <div className="flex items-center justify-center">
                    <div className="w-96 border rounded-l-2xl bg-white px-7 py-10 grey-shadow">
                        <form onSubmit={handleSignUp}>
                            <h4 className="text-2xl mb-7">Sign Up</h4>

                            <input 
                                type="text" 
                                placeholder="Name" 
                                className="input-box"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input 
                                type="text" 
                                placeholder="Email Address" 
                                className="input-box"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <PasswordInput 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

                            <button type="submit" className="btn-primary smooth-transition small-shadow">Create Account</button>

                            <p className="text-sm text-center mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="font-medium text-lightPurple underline">
                                Login 
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                <div className="bg-[#aa9de7] w-96 h-[434px] rounded-r-2xl flex justify-center items-center p-7">
                    <div className="flex flex-col justify-center items-center bg-background rounded-xl w-full h-full">
                        <p className="text-white">All your notes in one place!</p>
                        <img src={Notepad} className="w-60" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp