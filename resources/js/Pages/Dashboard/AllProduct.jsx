import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import Footer from '../../components/Footer'
import { ProductsManager } from '../../components/ProductsManager'
import '../../css/Dashboard.css'
import Nav from '../../components/DashboardNav'

export default function AllProduct(props) {
    return (
            <div className='AllProduct'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <BackgroundTriangles home={false}/>
                <ProductsManager products={props.products}/>
                <Footer/>
            </div>
    )
}
