import React, {useRef, useState, useEffect} from 'react'
import logo from '../assets/splash_screen/logo.png'
import {useNavigate} from "react-router-dom";
import hostUrl from "../utils/host.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function LoginPage() {

    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [error, setError] = useState('');
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Load saved credentials on component mount
    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername && savedPassword) {
            emailRef.current.value = savedUsername;
            passwordRef.current.value = savedPassword;
            setRememberMe(true);
        }
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    }

    const handleLogin = async () => {
        setLoading(true);
        const userName = emailRef.current.value;
        const password = passwordRef.current.value;

        if (rememberMe) {
            // Save credentials to localStorage if "Remember Me" is checked
            localStorage.setItem('username', userName);
            localStorage.setItem('password', password);
        } else {
            // Clear stored credentials if "Remember Me" is unchecked
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }

        await checkAuthentication(userName, password);

        setTimeout(() => {
            setError(null);
        }, 2000);
    }

    const checkAuthentication = async (userName, password) => {
        try {
            const response = await fetch(`http://54.252.166.219:3001/api/user/login`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ userName, password })
            });
            const data = await response.json();
            if (!response.ok) {
                setLoading(false);
                return setError(data.error);
            }
            navigate('/home');
            localStorage.setItem('isLoggedIn', true);
        } catch (e) {
            setServerError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-blue-50'>
            <div className='w-10/12 sm:w-3/12 md:w-4/12 min-w-[320px] sm:min-w-[340px] max-w-[370px] flex flex-col items-center justify-center'>
                <div className='px-8 sm:px-10 py-5 w-full flex flex-col items-center bg-white'>
                    <img src={logo} alt='logo' className='w-2/5'/>
                    <h3 className='mb-2 text-2xl font-semibold'>Sign In</h3>
                    <p className='sm:mb-3 text-sm text-gray-400 text-center'>Welcome back! Please enter your details</p>
                    <div className='mt-5 sm:mt-3 w-full flex flex-col gap-1 justify-center'>
                        <label className='text-sm'>Email</label>
                        <input
                            ref={emailRef}
                            type='text'
                            placeholder='Enter your email address'
                            className='px-5 py-2 w-full border-[2px] rounded-lg shadow-sm placeholder-gray-200
                            placeholder:text-gray-400 placeholder:text-sm focus:outline-primary'
                        />
                    </div>
                    <div className='mt-2 sm:mt-3 w-full flex flex-col gap-1 justify-center'>
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
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div className='mt-2 w-full flex items-center'>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe" className='ml-2 text-sm text-gray-600'>Remember Me</label>
                    </div>
                    {
                        error && (
                            <div
                                className='mt-3 py-1 w-full flex items-center justify-center text-sm text-red-700 bg-red-300'>{error}</div>
                        )
                    }
                    <div className='mt-6 sm:mt-8 w-full '>
                        <button
                            onClick={handleLogin}
                            className='px-5 py-2 w-full flex flex-row-reverse items-center justify-center gap-3 text-md font-semibold
                            text-white bg-primary bg-opacity-70 hover:bg-opacity-100 rounded-lg'>
                            Login
                            {
                                loading &&
                                <div
                                    className='h-4 w-4 border-[3px] border-t-white border-l-white rounded-full animate-spin'></div>
                            }
                        </button>
                    </div>
                    <div className='mt-2 w-full flex justify-end cursor-pointer' onClick={handleForgotPassword}>
                        <p className='text-sm text-primary font-semibold'>Forgot password?</p>
                    </div>
                    <div className='mt-7 sm:mt-10 w-full flex gap-3 items-center justify-center'>
                        <p className='text-sm'>Do you haven't account? </p>
                        <a href='/register' className='text-sm text-primary'>Sign Up</a>
                    </div>
                </div>
            </div>
            {
                showForgotPassword && (
                    <ErrorAlert
                        title='Forgot Password ?'
                        description='If you have any issue with login to the system. Please contact our admin through'
                        setClose={setShowForgotPassword}
                    />
                )
            }
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
    )
}

export default LoginPage;
