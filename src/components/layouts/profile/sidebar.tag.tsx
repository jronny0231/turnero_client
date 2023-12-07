import { useState } from 'react';

export const UserProfileTag = () => {

    const [isProfileActive, setIsProfileActive] = useState(false)


    return (
        <div className='h-20 flex items-center pl-2'>
            <div className="w-full flex items-center gap-x-4">
                <img src="https://randomuser.me/api/portraits/women/79.jpg" className="w-10 h-10 rounded-full" />
                <div>
                    <span className="block text-gray-700 text-sm font-semibold">Alivika tony</span>
                    <span
                        className="block mt-px text-gray-600 text-xs"
                    >
                        Hobby Plan
                    </span>
                </div>
                <div className="relative flex-1 text-right">
                    <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                        onClick={() => setIsProfileActive(!isProfileActive)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {
                        isProfileActive ? (
                            <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                <div className="p-2 text-left">
                                    <span className="block text-gray-500/80 p-2">alivika@gmail.com</span>
                                    <a href="javascript:void(0)" className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        Add another account
                                    </a>
                                    <div className="relative rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 absolute right-1 inset-y-0 my-auto pointer-events-none">
                                            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
                                        </svg>
                                        <select className="w-full cursor-pointer appearance-none bg-transparent p-2 outline-none">
                                            <option disabled selected>Theme</option>
                                            <option>Dark</option>
                                            <option>Light</option>
                                        </select>
                                    </div>
                                    <button className="block w-full p-2 text-left rounded-md hover:bg-gray-50 active:bg-gray-100 duration-150">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : ""
                    }
                </div>
            </div>
        </div>
    )
}