import React, { useContext } from 'react'
import DiscountBanner from '../components/DiscountBanner'
import Footer from '../components/Footer'
import { Products } from '../components/Products'
import '../css/Boutique.css'
import '../css/Footer.css'
import '../css/DiscountBanner.css'
import Nav from '../components/Nav'
import BackgroundTriangles from '../components/BackgroundTriangles'

export default function Boutique(props) {
    
    return (
        <>
            <BackgroundTriangles home={false}/>
            <div className='boutique'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <DiscountBanner banner={props.banner[0]}/>
                <Products products={props.products} promotions={props.promotions}/>
                <Footer/>
            </div>
        </>
    )
}