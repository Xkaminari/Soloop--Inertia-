import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import Nav from '../components/Nav'
import MobileBg from '../Media/MobileBgHome.webp'
import DesckTopBg from '../Media/DesckTopBgHome.webp'
import HomeSlogant from '../Media/HomeSlogan.webp'
import '../css/Home.css'
import BackgroundTriangles from '../components/BackgroundTriangles'

export default function Index(props) {
    return (
        <>
            <BackgroundTriangles home={true}/>
            <div className='Home-bg-container'><img className='Home-bg' src={MobileBg} alt="baground soloop" /><img className='Home-bg-desktop' src={DesckTopBg} alt="baground soloop" /></div>
            <div className='Home'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <footer className='Home-footer'>
                    <Link className='home-btn-Boutique' href="/Boutique"><button>Boutique</button></Link>
                    <img className='home-slogant' src={HomeSlogant} alt="Les meilleur rollers pour faire parler votre art" />
                </footer>
            </div>
        </>
    )
}
