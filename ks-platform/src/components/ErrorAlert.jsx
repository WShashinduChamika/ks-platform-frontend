import React from 'react'
import { LuServerOff } from "react-icons/lu";

function ErrorAlert(props) {

    const handleOK = ()=>{
        props.setClose(false)

    }

    return (
        <div
            className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm text-white'>
            <div className='py-10 w-9/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col items-center bg-white'>
                {
                    props.title !== 'Forgot Password ?'?
                        <div className='mb-1 flex items-center justify-center'>
                            <LuServerOff size={30} className='text-primary text-opacity-85' />
                        </div>
                        :<></>
                }
                <h2 className='w-5/6 text-center text-2xl font-semibold text-black'>{props.title}</h2>
                <p className='w-5/6 mt-5 text-center text-md text-gray-400'>{props.description}
                    <a
                        href='#'
                        className='text-lg text-primary text-opacity-70 hover:text-primary hover:underline'
                    >
                        {props.title === 'Forgot Password ?'?" admin@gmail.com" :""}
                    </a>
                </p>

                <div className='w-5/6 flex justify-center mt-6'>
                    <button
                        onClick={handleOK}
                        className='mt-3 py-2 px-10 bg-primary bg-opacity-80 hover:bg-primary text-white hover:text-white text-[16px]'
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorAlert
