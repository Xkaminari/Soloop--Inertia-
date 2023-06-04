import { Link, useForm } from '@inertiajs/inertia-react';
import React, { useRef, useEffect } from 'react'
import '../css/Dashboard.css'
import '../css/Boutique.css'

export const ProductsManager = (props) => {
    
    const { get, delete: destroy } = useForm({})
    
    const modaleFilter = useRef()
    
    function openSlidOptions(e) {
        if (e.target.tagName === "I") {
            let parent = e.target.parentNode
            let grandParent = parent.parentNode;
            let optionsSlide = grandParent.parentNode.children[1];
            if (optionsSlide.style.display === 'flex') {
                optionsSlide.style.display = 'none'
                grandParent.style.marginBottom = '0px'
            } else {
                grandParent.style.marginBottom = '65px'
                setTimeout(() => {
                    optionsSlide.style.display = 'flex'
                    optionsSlide.classList.add("more-option-slide-animation")
                }, 500);
            }
        } else {
            let parent = e.target.parentNode
            let grandParent = parent.parentNode;
            let optionsSlide = grandParent.children[1];
            if (optionsSlide.style.display === 'flex') {
                optionsSlide.style.display = 'none'
                parent.style.marginBottom = '0px'
            } else {
                parent.style.marginBottom = '65px'
                setTimeout(() => {
                    optionsSlide.style.display = 'flex'
                    optionsSlide.classList.add("more-option-slide-animation")
                }, 500);
            }
        }
    }
    
    function openModale(e) {
        let parent = e.target.parentNode
        let grandParent = parent.parentNode;
        let modale = grandParent.children[2];
        modale.style.display = 'flex'
        modaleFilter.current.style.display = "block"
    }

    function closeModale(e) {
        let parent = e.target.parentNode
        let grandParent = parent.parentNode;
        let modale = grandParent.parentNode;
        modale.style.display = 'none'
        modaleFilter.current.style.display = "none"
    }
    
    function EditProduct(e) {
        let productId = e.target.nextElementSibling.defaultValue;
        get(route('products.edit',{product: productId,}))
    }
    
    function destroyProduct(e) {
        let productId = e.target.nextElementSibling.defaultValue;
        destroy(route('products.destroy',{product: productId,}))
        closeModale(e);
    }
    
    return <>
            <div className='products-container' id='product-manaher-container'>
                <div className='modale-filter' ref={modaleFilter}></div>
                {props.products.length === 0 && <div>slow internet...no products to display</div>}
                {props.products.map(product => (
                    <div className='product-and-options' key={product.id}>
                        <div className='product dashboard-product'>
                            <Link href={route("products.show", {product: product.id})} className='onclick-div-product'>
                                <img className='prouduct-img' src={"http://127.0.0.1:8000/" + product.image} alt="Rolleur soloop " />
                                <div className='product-details'>
                                    <p className='prouduct-name'>{product.name}</p>
                                    <p className='prouduct-price'>{product.price}$</p>
                                </div>
                            </Link>
                            <button className='prouduct-add' onClick={openSlidOptions}><i className="fa-solid fa-plus dashboard-plus-btn"></i></button>
                        </div>
                        <div className='more-option-slide'>
                            <button className='more-option-btn dashboard-delete-btn' onClick={openModale}>Supprimer</button>
                            <button className='more-option-btn dashboard-edit-btn' onClick={EditProduct}>Editer</button>
                            <input className='secret-inp' type="number" defaultValue={product.id} />
                        </div>
                        <div className='modale'>
                            <div className='modale-title-container'>
                                <h2 className='modale-title'><i className="fa-solid fa-circle-exclamation"></i> Voulez vous supprimer</h2>
                                <h2 className='modale-title'>{product.name} ?</h2>
                            </div>
                            <div className='modale-body'>
                                <p className='modale-descripton'>Sa suppression le fera disparaître définitivement de la liste des produits.</p>
                                <div className='modale-btns'>
                                    <button className='modale-btn modale-supp-btn' onClick={destroyProduct}>supprimer</button>
                                    <input className='secret-inp' type="number" defaultValue={product.id} />
                                    <button className='modale-btn modale-cancel-btn' onClick={closeModale}>Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    </>
}