import { Link } from '@inertiajs/inertia-react';
import React, { useRef } from 'react';
import BackgroundTriangles from '../../components/BackgroundTriangles';
import Nav from '../../components/Nav';
import '../../css/Dashboard.css'

export default function ProductPage(props) {
    
    const modale = useRef()
    const modaleFilter = useRef()
    
    function openModale(e) {
        modale.current.style.display = 'flex'
        modaleFilter.current.style.display = "block"
    }
    
    function closeModale(e) {
        modale.current.style.display = 'none'
        modaleFilter.current.style.display = "none"
    }
    
    function destroyProduct(e) {
        let productId = e.target.nextElementSibling.defaultValue;
        destroy(route('products.destroy',{product: productId,}))
        closeModale(e);
    }
    
    return (
    <>
        <BackgroundTriangles home={false}/>
        <div className='modale-filter' ref={modaleFilter}></div>
        <div className='product-page'>
            <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <div className='all-product-details all-product-details-product-page'>
                <div className='first-row-product-details'>
                    <img className='specific-img-product' src={"http://127.0.0.1:8000/" + props.product.image} alt="not found" />
                    <div className='product-page-name-price'>
                        <p className='specific-name-product'>{props.product.name}</p>
                        <p className='specific-price-product'>{props.product.price}$</p>
                    </div>
                </div>
                <div className='third-row-product-details'>
                    <h4 className='specific-description-title'>Description</h4>
                    <hr/>
                    <p className='specific-description-product'>{props.product.description}</p>
                </div>
                <div className='second-row-product-details'>
                    <Link href={route("products.edit", {product: props.product.id})}><button className='buy-now-btn buy-now-btn-product-page'>Modifier</button></Link>
                    <button className='add-to-cart-btn delete-product-page' onClick={openModale}>Supprimer</button>
                </div>
                <div className='modale' ref={modale}>
                    <div className='modale-title-container'>
                        <h2 className='modale-title'><i className="fa-solid fa-circle-exclamation"></i> Voulez vous supprimer</h2>
                        <h2 className='modale-title'>{props.product.name} ?</h2>
                    </div>
                    <div className='modale-body'>
                        <p className='modale-descripton'>Sa suppression le fera disparaître définitivement de la liste des produits.</p>
                        <div className='modale-btns'>
                            <button className='modale-btn modale-supp-btn' onClick={destroyProduct}>supprimer</button>
                            <input className='secret-inp' type="number" defaultValue={props.product.id} />
                            <button className='modale-btn modale-cancel-btn' onClick={closeModale}>Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}