import React from 'react';
import TaskList from './TaskList';

export default function Tasks() {
    return (
        <div className="flex justify-center m-4">
            <div className="w-full max-w-screen-md">
                <div className="">
                    <TaskList />
                </div>
            </div>
        </div>
    );
}