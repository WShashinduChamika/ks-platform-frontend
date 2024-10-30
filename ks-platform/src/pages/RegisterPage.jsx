import React, {useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import hostUrl from "../utils/host.jsx";
import logo from "../assets/splash_screen/logo.png";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {checkPasswordAndConfirmPasswordEquality, validateEmail, validatePassword} from "../utils/validation.js";
import ErrorAlert from "../components/ErrorAlert.jsx";

function RegisterPage() {

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [error, setError] = useState('')
    const [serverError, setServerError] = useState('')
    const [loading, setLoading] = useState(false);

    const [isPasswordActive, setIsPasswordActive] = useState(false);
    const [isConfirmPasswordActive, setIsConfirmPasswordActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordActive = () => {
        setIsPasswordActive(true);
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleRegister = async () => {

        setLoading(true)
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const userRole = 'Course Follower'
        const confirmPassword = confirmPasswordRef.current.value;

        console.log("email is ", email)
        if (!validateEmail(email)) {
            setError("Email is invalid");
        } else if (!validatePassword(password)) {
            setError("Password is not strong")
        } else if (!checkPasswordAndConfirmPasswordEquality(password, confirmPassword)) {
            setError("Passwords do not match");
        }
        else{
            await registerUser(email, password, userRole)
        }

        setTimeout(() => {
            setError(null)
            setLoading(false)
        }, 2000)

    }

    const registerUser = async (email, password, userRole) => {

        try {
            const response = await fetch(`${hostUrl}/user/register`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({email, password, userRole})
            })
            const data = await response.json()
            if (!response.ok) {
                setLoading(false)
                return setError(data.error)
            }
            navigate('/home')

        } catch (e) {
            setServerError(e.message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-blue-50'>
            <div
                className='w-10/12 sm:w-3/12 md:w-4/12 min-w-[320px] sm:min-w-[350px] max-w-[370px] flex flex-col items-center justify-center'>
                <div className='px-8 sm:px-10 py-5 w-full flex flex-col items-center bg-white'>
                    <img src={logo} alt='logo' className='w-2/5'/>
                    <h3 className='mb-2 text-2xl font-semibold'>Sign Up</h3>
                    <p className='sm:mb-3 text-sm text-gray-400 text-center'>Welcome back! Please enter your details</p>
                    <div className='mt-2 sm:mt-3 w-full flex flex-col gap-1 justify-center'>
                        <label className='text-sm'>Email</label>
                        <input
                            required={true}
                            ref={emailRef}
                            type='text'
                            placeholder='Enter your email address'
                            className={`px-5 py-2 w-full border-[2px] rounded-lg shadow-sm placeholder-gray-200
                            placeholder:text-gray-400 placeholder:text-sm focus:border-primary focus:outline-none`}
                        />
                    </div>
                    <div className={`mt-2 sm:mt-3 w-full flex flex-col gap-1 justify-center`}>
                        <label className='text-sm'>Password</label>
                        <div className="relative">
                            <input
                                ref={passwordRef}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                className='px-5 py-2 w-full border-[2px] rounded-lg shadow-sm placeholder-gray-200
                   placeholder:text-gray-400 placeholder:text-sm focus:border-primary focus:outline-none'
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 text-gray-500 flex items-center cursor-pointer"
                                onClick={handleShowPassword}
                            >
                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                            </div>
                        </div>
                    </div>
                    <div className={`mt-2 sm:mt-3 w-full flex flex-col gap-1 justify-center`}>
                        <label className='text-sm'>Confirm Password</label>
                        <div className="relative">
                            <input
                                ref={confirmPasswordRef}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Enter password again'
                                className='px-5 py-2 w-full border-[2px] rounded-lg shadow-sm placeholder-gray-200
                   placeholder:text-gray-400 placeholder:text-sm focus:border-primary focus:outline-none'
                            />
                            <div
                                className="absolute inset-y-0 right-0 pr-3 text-gray-500 flex items-center cursor-pointer"
                                onClick={handleShowConfirmPassword}
                            >
                                {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                            </div>
                        </div>
                    </div>
                    {
                        error && (
                            <div
                                className='mt-3 py-1 w-full flex items-center justify-center text-sm text-red-700 bg-red-300'>{error}</div>
                        )
                    }
                    <div className='mt-6 sm:mt-8 w-full '>
                        <button
                            onClick={handleRegister}
                            className='px-5 py-2 w-full flex flex-row-reverse items-center justify-center gap-2 text-md font-semibold
                            text-white bg-primary bg-opacity-70 hover:bg-opacity-100 rounded-lg'>
                            Sign Up
                            {
                                loading &&
                                <div
                                    className='h-4 w-4 border-[3px] border-t-white border-l-white rounded-full animate-spin'></div>
                            }
                        </button>
                    </div>
                    <div className='mt-7 sm:mt-10 w-full flex gap-3 items-center justify-center'>
                        <p className='text-sm'>Already have an account? </p>
                        <a href='/login' className='text-sm text-primary'>Sign In</a>
                    </div>
                </div>
            </div>
            {
                serverError && (
                    <ErrorAlert
                        title='Internal Server Error'
                        description={`The server error is ${serverError}`}
                        setClose={setServerError}
                    />
                )
            }
        </div>
    );
}

export default RegisterPage
