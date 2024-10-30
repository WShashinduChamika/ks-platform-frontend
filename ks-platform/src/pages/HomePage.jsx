import React, {useEffect, useState} from 'react';
import logo from '../assets/splash_screen/logo.png';
import DropDown from "../components/DropDown.jsx";
import {FiSearch, FiFilter, FiLogOut} from "react-icons/fi";
import Course from "../components/Course.jsx";
import hostUrl from "../utils/host.jsx";
import CourseLoading from "../components/CourseLoading.jsx";
import ErrorAlert from "../components/ErrorAlert.jsx";
import {useNavigate} from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const technologies = ['All', 'Java', 'Python', 'Python2', 'Python3'];
    const [technology, setTechnology] = useState('');
    const levels = ['All', "Beginner", "Intermediate", "Advance"];
    const [level, setLevel] = useState('');

    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [error, setError] = useState('');
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]); // Store all courses

    const handleFilter = () => {
        const filteredCourses = allCourses.filter(course => {
            const matchesTechnology = technology ? course.technology === technology : true;
            const matchesLevel = level ? course.level === level : true;
            const matchesSearchQuery = course.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTechnology && matchesLevel && matchesSearchQuery;
        });
        setCourses(filteredCourses);
    };

    const handleSignOut = ()=>{
        localStorage.removeItem('isLoggedIn')
        navigate('/login');
    }


    const getCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${hostUrl}/course`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
            }
            setCourses(data.data);
            setAllCourses(data.data); // Store all courses initially
        } catch (e) {
            setServerError(e.message)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    // Trigger filtering whenever searchQuery, technology, or level changes
    useEffect(() => {
        handleFilter();
    }, [searchQuery, technology, level]);

    return (
        <div className='w-screen'>
            <div className='sticky top-0 w-full flex flex-col items-center bg-white'>
                <div className='w-11/12 flex items-center justify-between'>
                    <h2 className='text-2xl text-black font-semibold'>Knowledge Sharing Platform</h2>
                    <img src={logo} alt='logo' className='w-2/12 min-w-[120px] max-w-[150px]'/>
                </div>
                <div className='w-11/12 flex items-center justify-end'>
                    <button
                        onClick={handleSignOut}
                        className='px-3 py-2 flex items-center justify-center gap-2 bg-primary bg-opacity-70 text-[12px] text-white text-opacity-70
                        hover:bg-primary hover:text-white rounded'
                    >
                        <FiLogOut size={20}/>
                        Sign Out
                    </button>
                </div>
                <div
                    className={`pb-8 sm:pb-10 mt-10 w-10/12 md:min-w-[750px] lg:min-w-[950px] grid grid-cols-12 gap-2`}>
                    <div className="relative mb-3 col-span-12 md:col-span-5">
                        <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-2 px-12 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-primary"
                        />
                    </div>
                    <div className='col-span-5 md:col-span-3'>
                        <DropDown
                            type='Technology'
                            options={technologies}
                            setValue={setTechnology}
                        />
                    </div>
                    <div className='col-span-5 md:col-span-3'>
                        <DropDown
                            type='Level'
                            options={levels}
                            setValue={setLevel}
                        />
                    </div>
                    <div className='col-span-2 md:col-span-1 flex items-center justify-end'>
                        <div
                            onClick={handleFilter}
                            className='w-1/2 min-w-[50px] h-full flex items-center justify-center bg-primary rounded-lg cursor-pointer'>
                            <FiFilter size={20} color='white'/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div
                    className={`sm:min-w-[600px] md:min-w-[750px] lg:min-w-[950px] w-9/12 sm:w-10/12 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5`}>
                    {loading || error || serverError ? (
                        Array(12).fill().map((_, index) => (
                            <CourseLoading key={index}/>
                        ))
                    ) : (
                        courses && courses.map((course, index) => (
                            <Course key={index} course={course} loading={loading}/>
                        ))
                    )}
                </div>
            </div>
            {
                serverError &&
                <ErrorAlert title='Internal Server Error' description={`The server error is ${serverError}`}
                            setClose={setServerError}/>
            }
        </div>
    );
}

export default HomePage;
