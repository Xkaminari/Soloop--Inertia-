import React from 'react';
import '../css/Cart.css'
import BackgroundTriangles from '../components/BackgroundTriangles';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Cart(props) {
    
    let totalQty = props.shoppingCart.length;
    let totalPrice = 0;
    props.shoppingCart.map(product => (
        totalPrice += product.price
    ))
    
    function removeProduct(e) {
        if (e.target.tagName === "I") {
            let productId = e.target.parentNode.nextElementSibling.value;
            Inertia.delete(route('removeProduct', {productId: productId}))
        } else {
            let productId = e.target.nextElementSibling.value;
            Inertia.delete(route('removeProduct', {productId: productId}))
        }
    }
    
    return (
        <>
            <BackgroundTriangles home={true}/>
            <div className='Cart'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <div className='cart-container'>
                    {
                        props.shoppingCart.length === 0 && 
                        <div className='cart-no-item-case'>
                            <div className='No-item-msg'>Aucun article dans votre panier, allez en ajouter dans notre boutique !</div>
                            <Link className='back-shop-btn' href="/Boutique">Boutique</Link>
                        </div>
                    }
                    {
                        props.shoppingCart.length > 0 && 
                        <div className='recap-card'>
                            <h2 className='recape-title'>Recape</h2>
                            <div className='cart-cards'>
                                {
                                    props.shoppingCart.map(product => (
                                    <div className='cart-card' key={product.id}>
                                        <img  className='cart-img' src={product.image} alt="img product in cart" />
                                        <div className='name-price'>
                                            <div className='cart-item-details cart-name'>{product.name}</div>
                                            <div className='cart-item-details cart-price-orignal'>{product.price}$</div>
                                        </div>
                                        {/* <div className='cart-item-details modif-quantity inc'><i className="fa-solid fa-plus"></i></div>
                                        <div className='cart-item-details quantity'>{product.qty}</div>
                                        <div className='cart-item-details modif-quantity dec'><i className="fa-solid fa-minus"></i></div> */}
                                        <button className='cart-delete-btn' onClick={removeProduct}><i className="fa-solid fa-trash"></i></button>
                                        <input type="number" className='secret-inp' defaultValue={product.id}/>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    }
                    {
                        props.shoppingCart.length > 0 && 
                        <div className='cart-summary'>
                            <h3 className='cart-summary-heading'>Sumarry</h3>
                            <div className='cart-summary-price'>
                                <span>ITEMS</span>
                                <span>{totalQty}</span>
                            </div>
                            <div className='cart-summary-price'>
                                <span>TOTAL PRICE</span>
                                <span>{totalPrice}€</span>
                            </div>
                            <Link href={route('index')} className='cashout-link'><button className='Valid-purchase'>Valid purchase</button></Link>
                        </div>
                    }
                </div>
                <Footer/>
            </div>
        </>
    )
}