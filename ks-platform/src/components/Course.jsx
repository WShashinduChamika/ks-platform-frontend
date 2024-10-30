import React from 'react';
import courseImg from "../assets/home/course.png";
import {useNavigate} from "react-router-dom";

function Course({ course, loading }) {

    const navigate = useNavigate();
    const handleCourseClick = (link)=>{
        window.open(link);
    }

    return (
        <div
            onClick={()=>handleCourseClick(course.link)}
            className="pb-5 mb-7 col-span-1 flex flex-col items-center border-[1px] border-gray-300 rounded-md
            focus:outline-none focus:border-primary hover:border-primary hover:border-2 cursor-pointer"
        >
            <img src={courseImg} alt='course' className='w-full'/>
            <div className='my-3 w-11/12 sm:h-12 flex items-start justify-between'>
                <p className='text-lg text-black font-semibold'>{course.name}</p>
                <p className='text-lg text-black font-semibold'>{course.year}</p>
            </div>
            <div className='mt-1 w-11/12 flex items-center justify-start gap-3'>
                <button className='px-2 py-1 min-w-24 text-sm bg-course-btn1-bg border-2 border-primary rounded-lg'>
                    {course.technology}
                </button>
                <button className='px-2 py-1 min-w-24 text-sm bg-course-btn2-bg bg-opacity-25 border-2 border-course-btn2-bg rounded-lg'>
                    {course.level}
                </button>
            </div>
        </div>
    );
}

export default Course;
