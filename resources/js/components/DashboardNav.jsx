import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React,  { Component } from 'react'
import '../css/Nav.css'

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
            xcross.style.display = "block";
            burger.style.display = "none";
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
            },100);
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
        return <>
            <nav className="navbar">
                <div className="logo">
                    <Link href='/products/create'><button className='add-product-btn'>Ajouter un produit</button></Link>
                </div>
                <div className="nav-elements">
                    <Link href={route('edit.profil')}><p className='user-name'>{currentUser.name}</p></Link>
                    <div className='user-infos'>
                        <button className='Lougou-btn' onClick={this.logout.bind(this)}>Log out</button>
                        <Link href="/Cart" className='cart-group'><i className="fa-solid fa-cart-shopping"></i><div className='cart-cercle'>{this.props.cartQty}</div></Link>
                    </div>
                    <ul className='nav-links'>
                        <li><Link href="/">Accueil</Link></li>
                        <li><Link href={route("allProducts")}>Gerer mes produit</Link></li>
                        <li><Link href={route("promotion")}>Promotion</Link></li>
                        <li><Link href={route("allProducts")}>Commande clients</Link></li>
                    </ul>
                </div>
                <button type='button' onClick={this.showNav.bind(this)} className='mobile-menu-icon'><i className='fas fa-bars' id='burger'></i><i className="fa-solid fa-xmark" id='xcross-bar'></i></button>
            </nav>
        </>
    }
}