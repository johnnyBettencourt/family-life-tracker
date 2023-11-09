import React from 'react';
import { BiTimeFive } from 'react-icons/bi';

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen px-4">
            <BiTimeFive className="text-6xl text-purple-500 mb-4" />
            <h1 className="text-4xl font-semibold mb-2 text-purple-600">Feature Coming Soon</h1>
            <p className="text-xl text-gray-600 text-center max-w-md">
                We're working hard to bring you this feature. Stay tuned!
            </p>
        </div>
    );
};

export default ComingSoon;
