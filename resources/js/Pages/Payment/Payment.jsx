import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles';
import '../../css/Cart.css'
import '../../css/ConfirmeOrder.css'
import '../../css/UserOrder.css'

export default function Payment(props) {
    
    function productBuyDetails(product) {
        let cartItem = props.userCart.filter(cartItem => cartItem.product_id === product.id)
        return <>
                <img className='cart-img' src={product.image} alt="product Image" />
                <div className='name-price'>
                    <p className='cart-item-details cart-name'>{product.name}</p>
                    <p className='cart-item-details cart-price-orignal'>{product.price * cartItem[0].quantity}</p>
                </div>
                <p className='cart-item-details quantity'>x{cartItem[0].quantity}</p>
        </>
    }
    
    function getItemNumberInCart() {
        let itemQty = 0; 
        props.userCart.map(cartItem => (
            itemQty += cartItem.quantity
        ))
        return <div className='order-details'>
            <p>Total des articles achetée: <span>{itemQty}</span></p>
            <p>Prix total (TTC): <span>{props.totalPrice}$</span></p>
        </div>
    }
    
    function AddressDetails() {
        let addressDetails = props.delivering_address
        return <div className='address-details card-address'>
            <h3>Adresse de livraison</h3>
            <div className='address-section'>
                <p className='label-detail'>City:</p>
                <p className='detail-value'>{addressDetails.city}</p>
            </div>
            <div className='address-section'>
                <p className='label-detail'>Code postal:</p>
                <p className='detail-value'>{addressDetails.postal_code}</p>
            </div>
            <p className='label-detail'>Line d'adresse:</p>
            <p className='address-line-value detail-value'>{addressDetails.address_line}</p>
        </div>
    }
    
    function goToPay(e) {
        e.preventDefault()
        Inertia.post(route('checkout'));
    }
    
    return (
        <div className='payment'>
            <BackgroundTriangles home={false}/>
            <Link className='exite-arrow-payment' href={route('home')}><i className="fa-solid fa-arrow-left"></i></Link>
            <div className='confirme-order'>
                <div className='payment-recap'>
                    {
                        props.shopingCart.map(product => (
                            <div className='payment-recap-card' key={product.id}>
                                {productBuyDetails(product)}
                            </div>
                        ))
                    }
                </div>
                <div className='right-side'>
                    {AddressDetails()}
                    <div className='cart-summary payment-summaru'>
                        {getItemNumberInCart()}
                        <form onSubmit={goToPay}>
                            <button className='Valid-purchase'>Go to checkout</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
