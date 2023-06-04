import React from 'react'
import BackgroundTriangles from '../components/BackgroundTriangles';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import "../css/UserOrder.css"

export default function UserOrders(props) {
    
    function orderItemsDetails(order) {
        let items_details = JSON.parse(order.Items_details).Items_details;
        return items_details.map(product => (
            <div className='product-ordered-details' key={product.id}>
                <div className='product-ordered-name-price'>
                    <p className='product-ordered-name'>{product.name}</p>
                    <p className='product-ordered-price'>{product.price}</p>
                </div>
                <p className='product-quantity-ordered'>x1</p>
            </div>
        ))
    }
    
    function AddressDetails(order) {
        let addressDetails = JSON.parse(order.delivering_address)
        return <div className='address-details'>
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
    
    return (<>
        <BackgroundTriangles home={false}/>
        <div className='my-orders'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            {props.orders &&
                <div className='orders'>
                    {props.orders.map(order => (
                        <div className='order' key={order.id}>
                            <h3>Résumé de la commande</h3>
                            {orderItemsDetails(order)}
                            {AddressDetails(order)}
                            <div className='bottom-details'>
                                <div className='bottom-details-section'>
                                    <p className='bottom-detail-label'>Date de la commande:</p>
                                    <p className='bottom-detail-value'>{order.order_date}</p>
                                </div>
                                <div className='bottom-details-section'>
                                    <p className='bottom-detail-label'>Prix total :</p>
                                    <p className='bottom-detail-value'>{order.total_order}$</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <Footer/>
        </div>
    </>
    )
}
