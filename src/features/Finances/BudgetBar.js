import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectBudget } from './financesSlice'

export default function BudgetBar() {
    const dispatch = useDispatch(); // Initializing the Redux dispatch function
    const budget = useSelector(selectBudget); // Getting the tasks from Redux state
    return (
        <div>
            <div>Current Budget: ${budget}</div>
        </div>
    )
}
