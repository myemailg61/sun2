import React from 'react'
import { Outlet } from 'react-router-dom'
import Navi from '../Nav/Navi'
import Footer from '../footer/Footer'

const Root = () => {
    return (
        <div>
            <Navi></Navi>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Root