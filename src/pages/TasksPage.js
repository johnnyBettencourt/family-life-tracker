import React from 'react'
import Tasks from '../features/Tasks/Tasks'

export default function TasksPage() {
    return (
        <div className='w-full px-4 md:px-10 py-6 text-gray-700'>
            <div className='max-w-4xl mx-auto'>
                <Tasks />
            </div>
        </div>
    )
}
