import { Link, useForm } from '@inertiajs/inertia-react';
import React, { useRef, useState } from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles';
import '../../css/Dashboard.css'

export default function CreateProductForm() {
    
    const { data, setData, post, errors } = useForm({
        productName: '',
        productDescription: '',
        productPrice: '',
        productQuantity: '',
        productImg: null,
    })
    
    const [bgroundImgInput, setBgroundImgInput] = useState("");
    
    const inputFile = useRef(null);
    
    const productImgHandler = (e) => {
        let selectedFile = inputFile.current.files[0];
        setBgroundImgInput(URL.createObjectURL(selectedFile));
    }
    
    // add product
    const addProduct = (e) => {
        e.preventDefault()
        post(route('products.store'))
    }
    
    return (
        <div className='creat-product'>
            <BackgroundTriangles home={false}/>
            <form autoComplete="off" className='form-group' onSubmit={addProduct} method='POST' encType='multipart/form-data'>
                <Link href='/Dashboard/allProducts'><button className='exite-arrow'><i className="fa-solid fa-arrow-left"></i></button></Link>
                    <div className='creat-product-filds'>
                        <div className='Image-price-name-product'>
                            <div className='image-inp-container'>
                                <input id='productImage' name='productImage' ref={inputFile} className='productImage' type="file" accept="image/*"  onChange={(e) => {setData('productImg', e.target.files[0]); productImgHandler()}} />
                                <img className='product-img-preview' src={bgroundImgInput} alt="Select product Img" />
                                {errors.productImg && <div>{errors.productImg}</div>}
                            </div>
                            <div className='name-and-price-input'>
                                <input className='dashboard-input-type' id='productName' type="text" placeholder='Nom produit'  onChange={(e) => setData('productName', e.target.value)} value={data.productName}/>
                                {errors.productName && <div>{errors.productName}</div>}
                                <input className='dashboard-input-type' id='productPrice' type="number" placeholder='Prix produit'  onChange={(e) => setData('productPrice', e.target.value)} value={data.productPrice} />
                                {errors.productPrice && <div>{errors.productPrice}</div>}
                            </div>
                        </div>
                        <textarea className='creat-product-textarea' id='productDescription'  onChange={(e) => setData('productDescription', e.target.value)} placeholder="Description produit" cols="30" rows="10" defaultValue={data.productDescription}></textarea>
                        {errors.productDescription && <div>{errors.productDescription}</div>}
                        <div className='stock-validBtn'>
                            <input className='dashboard-input-type' type="number" id='productStock' placeholder='Stock disponible'  onChange={(e) =>  setData('productQuantity', e.target.value)} value={data.productQuantity} />
                            {errors.productQuantity && <div>{errors.productQuantity}</div>}
                            <button type='submit' className='buy-now-btn'>Ajouter</button>
                        </div>
                    </div>
            </form>
        </div>
    )
}
