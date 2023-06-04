import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React,  { Component } from 'react'
import '../css/Nav.css'
import SoloopLogo from '../Media/Soloop-Logo.webp'

export default class Nav extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            user: null,
            isUserAdmin: false,
        }
    }
    
    showNav() {
        let nav = document.querySelector('.nav-elements');
        let xcross = document.querySelector('#xcross-bar');
        let burger = document.querySelector('#burger');
        if (!this.state.isDisplayed) {
            nav.classList.remove('leave-animation');
            nav.style.display = 'flex';
            setTimeout( ()=> {
                nav.style.visibility = 'visible';
                nav.classList.add('enter-animation');
            },100);
            xcross.style.display = "block"; //
            burger.style.display = "none"; //
            this.setState({
                isDisplayed: true,
            });
        }
        else {
            nav.classList.remove('enter-animation');
            nav.classList.add('leave-animation');
            setTimeout( ()=> {
                nav.style.visibility = 'hidden';
                nav.style.display = 'none';
            },600);
            this.setState({
                isDisplayed: false
            })
            xcross.style.display = "none";
            burger.style.display = "block";
        }
    }
    
    logout() {
        Inertia.post('/User/Logout')
    }
    
    render() {
        let currentUser = this.props.user
        let navContaint;
        let routesUserRelated;
        let Dashboard;
        if (currentUser) {
            if (currentUser.user_type === 'admin') {
                Dashboard = <>
                        <li><Link href={route("allProducts")}>Gerer mes produit</Link></li>
                        <li><Link href={route("promotion")}>Promotion</Link></li>
                        <li><Link href={route("CustomerOrders")}>Commande clients</Link></li>
                    </>
            }
            navContaint = <>
            <Link href={route('edit.profil')}><p className='user-name'>{currentUser.name}</p></Link>
            <div className='user-infos'>
                <button className='Lougou-btn' onClick={this.logout.bind(this)}>Log out</button>
                <Link href="/Cart" className='cart-group'><i className="fa-solid fa-cart-shopping"></i><div className='cart-cercle'>{this.props.cartQty}</div></Link>
            </div>
            </>;
            routesUserRelated = <>
                <ul className='user-related-pages'>
                    <li className='user-related-page'><Link id='user-related-link' href={route('edit.profil')}>Mes information</Link></li>
                    <li className='user-related-page'><Link id='user-related-link' href={route('user.orders')}>Mes commandes</Link></li>
                </ul>
            </>
        }else {
            navContaint = <>
                <div className='connexion-btn-cart'>
                    <div className='connexion-btns'>
                        <Link href="/Auth/SignUp"><button className='sign-up'>SIGN UP</button></Link>
                        <Link href="/Auth/Login"><button className='login'>LOG IN</button></Link>
                    </div>
                </div>
            </>
        }
        return <>
            <nav className="navbar">
                <div className="logo">
                    <img className='logo-soloop' src={SoloopLogo} alt="Logo Soloop" />
                </div>
                <div className="nav-elements">
                    {navContaint}
                    <button onClick={this.showNav.bind(this)} className='mobile-menu-icon xcross_nav'><i className="fa-solid fa-xmark" id='xcross-bar'></i></button>
                    <ul className='nav-links'>
                        {routesUserRelated}
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href="/Boutique">Boutique</Link></li>
                        <li><Link href="/Blog">Blog</Link></li>
                        <li><Link href="/Apropos">Apropos</Link></li>
                        {Dashboard}
                    </ul>
                </div>
                <button onClick={this.showNav.bind(this)} className='mobile-menu-icon'><i className='fas fa-bars' id='burger'></i></button>
            </nav>
        </>
    }
}