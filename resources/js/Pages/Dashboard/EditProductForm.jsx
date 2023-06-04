import { Link, useForm } from '@inertiajs/inertia-react';
import React, { useRef, useState } from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles';
import DashboardNav from '../../components/DashboardNav'
import '../../css/Dashboard.css'

export default function EditProductForm(props) {
    
    const { data, setData, post, errors } = useForm({
        productId: 0,
        productName: props.product.name,
        productDescription: props.product.description,
        productPrice: props.product.price,
        productBarredPrice: props.product.barred_price,
        productQuantity: props.product.quantity,
        productImg: props.product.image,
        productPromotion: props.product.promotion_id,
    })
    
    const [promotion, setPromotion] = useState('');
    const [bgroundImgInput, setBgroundImgInput] = useState("http://127.0.0.1:8000/" + props.product.image);
    
    const inputFile = useRef(null);
    let theProductId = useRef();
    const modale = useRef();
    const modaleFilter = useRef();
    
    const productImgHandler = (e) => {
        let selectedFile = inputFile.current.files[0];
        setBgroundImgInput(URL.createObjectURL(selectedFile));
    }
    
    // add product
    const editProduct = (e) => {
        e.preventDefault();
        let productId = theProductId.current.defaultValue;
        setData('productId', productId)
        post(route('products/update'));
        openModale();
    }
    
    function openModale() {
        modale.current.style.display = 'flex'
        modaleFilter.current.style.display = "block"
    }
    
    function closeModale() {
        modale.current.style.display = 'none'
        modaleFilter.current.style.display = "none"
    }
    
    return (
    <>
        <div className='modale-filter' ref={modaleFilter}></div>
        <BackgroundTriangles home={false}/>
        <form autoComplete="off" className='form-group' onSubmit={editProduct} method='POST' encType='multipart/form-data'>
            <input className='secret-inp' ref={theProductId} type="number" defaultValue={props.product.id} />
            <div className='creat-product'>
                <DashboardNav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <div className='creat-product-filds'>
                    { props.currentPromotion &&
                        <div className='promotion-applyed'>
                            <h4>La promotion {props.currentPromotion.name} est appliqueret elle est de -{props.currentPromotion.dicount_rate} %</h4>
                        </div>
                    }
                    <div className='Image-price-name-product'>
                        <div className='image-inp-container'>
                            <input id='productImage' name='productImage' ref={inputFile} className='productImage' type="file" accept="image/*"  onChange={(e) => {setData('productImg', e.target.files[0]); productImgHandler()}} />
                            <img className='product-img-preview' src={bgroundImgInput} alt="Select product Img" />
                            {errors.productImg && <div>{errors.productImg}</div>}
                        </div>
                        <div className='name-and-price-input'>
                            <label htmlFor="productName">Nom</label>
                            <input className='dashboard-input-type' id='productName' type="text" placeholder='Nom produit'  onChange={(e) => setData('productName', e.target.value)} value={data.productName}/>
                            {errors.productName && <div>{errors.productName}</div>}
                            <label htmlFor="productPrice">Prix</label>
                            <input className='dashboard-input-type' id='productPrice' type="number" placeholder='Prix produit'  onChange={(e) => setData('productPrice', e.target.value)} value={data.productPrice} />
                            {errors.productPrice && <div>{errors.productPrice}</div>}
                        </div>
                    </div>
                    { props.currentPromotion && 
                        <p className="productPrice">Prix avec la promotion {(props.product.price * props.currentPromotion.dicount_rate) / 100}$</p>
                    }
                    <div className='barred-price-fild'>
                        <label htmlFor="barred-price">Prix barrer</label>
                        <input className='dashboard-input-type' type="number" id="barred-price" value={data.productBarredPrice} onChange={(e) => setData('productBarredPrice', e.target.value)}/>
                        {errors.productBarredPrice && <div>{errors.productBarredPrice}</div>}
                    </div>
                    <div className="description-fild">
                        <label htmlFor="creat-product-textarea">Description</label>
                        <textarea className='creat-product-textarea' id='productDescription'  onChange={(e) => setData('productDescription', e.target.value)} placeholder="Description produit" cols="30" rows="10" defaultValue={data.productDescription}></textarea>
                        {errors.productDescription && <div>{errors.productDescription}</div>}
                    </div>
                    <div className='promotion-applied'>
                    <label htmlFor="promotion">Promotion</label>
                        {props.promotions &&
                            <select id="promotion" value={promotion} onChange={(e) => setPromotion(e.target.value)}>
                                <option value={null}>--Choisiser une promotion--</option>
                                {props.promotions.map(promotion => (
                                    <option key={promotion.id} value={promotion.id}>{promotion.name}</option>
                                ))}
                            </select>
                        }
                    </div>
                    <div className='stock-validBtn'>
                        <div className="stock-quantity-fild">
                            <label htmlFor="dashboard-input-type">Stock</label>
                            <input className='dashboard-input-type' type="number" id='productStock' placeholder='Stock disponible'  onChange={(e) =>  setData('productQuantity', e.target.value)} value={data.productQuantity} />
                            {errors.productQuantity && <div>{errors.productQuantity}</div>}
                        </div>
                        <button type='submit' className='buy-now-btn'>Modifier</button>
                    </div>
                </div>
            </div>
            <div className='modale' ref={modale}>
                <div className='modale-title-container'>
                    <h2 className='modale-title'><i className="fa-solid fa-circle-exclamation" id='edite-modale-fa'></i> Voulez vous  vraiment modifier les donées du produit ?</h2>
                </div>
                <div className='modale-body'>
                    <p className='modale-descripton'>Sa modification se fera instantanément dans la boutique et vous ne pourrais pas retrouver les anciennes information produit la liste des produits.</p>
                    <div className='modale-btns'>
                        <button type='submit' className='modale-btn modale-edit-btn'>Modifier</button>
                        <button type='button' className='modale-btn modale-cancel-btn' onClick={closeModale}>Annuler</button>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}
