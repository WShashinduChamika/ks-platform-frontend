import React, {useState} from 'react'
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";

function DropDown({dropDownType, options, type, setValue}) {

    const [isOpen, setIsOpen] = useState(false)
    const [option, setOption] = useState(type)

    const handleSelectOption = (option) => {
        setOption(option)
        setIsOpen(false)
        if (option !== 'All'){
            setValue(option)
        }else{
            setValue(null)
        }
    }

    return (
        <div className='relative flex flex-col items-center w-full h-auto rounded'>
            <button
                className={`p-2 sm:p-4 py-2 w-full h-12 flex items-center justify-between font-normal 
                 text-[14px] rounded-lg tracking-wider border-[1px] border-drop-down-border focus:border-primary 
                focus:border-2 active:border-white duration-300 active:text-white `}
                onClick={() => setIsOpen(!isOpen)}
            >
                {option}
                {isOpen ? (<FaAngleUp className='text-sm sm:text-lg' />) : (<FaAngleDown className='text-sm sm:text-lg' />)
                }
            </button>
            {isOpen && (
                <div
                    className='absolute top-16 w-full max-h-72 overflow-x-hidden overflow-y-scroll scrollbar-hide
                    rounded-lg z-20 bg-dropdown-bg'>
                    {options.map((option, index) => (
                        <div className='p-4 border-b border-white hover:bg-primary hover:text-white cursor-pointer'
                             key={index}
                             onClick={() => handleSelectOption(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropDown
