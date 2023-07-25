import React from 'react'

import { useSelector } from 'react-redux'
import { selectUser } from '../authSlice'
import { Navigate } from 'react-router-dom'

function Protected({ component }) {

    const currentuser = useSelector(selectUser)

    if (currentuser === null) return <Navigate to='/login' />
    return (
        component
    )
}

export default Protected