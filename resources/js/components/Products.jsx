import React, { useEffect } from 'react'
import { Link } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';

export const Products = (props) => {

    useEffect(() => {
        console.log(props);
    })
    
    
    function addProduct(e) {
        if (e.target.tagName === "I") {
            e.target.style.display = "none"
            let productBtn = e.target.parentNode;
            productBtn.style.backgroundColor = "var(--green)";
            let productCheck = e.target.nextElementSibling;
            productCheck.style.display = "block";
            setTimeout(() => {
                e.target.style.display = "block"
                let productBtn = e.target.parentNode;
                productBtn.style.backgroundColor = "var(--brouwn)";
                let productCheck = e.target.nextElementSibling;
                productCheck.style.display = "none";
            }, 2000);
            let productId = e.target.parentNode.nextElementSibling.value;
            Inertia.post(route('addProduct', {productId: productId}));
        } else {
            e.target.childNodes[0].style.display = "none"
            let productBtn = e.target;
            productBtn.style.backgroundColor = "var(--green)";
            let productCheck = e.target.childNodes[1];
            productCheck.style.display = "block";
            setTimeout(() => {
                e.target.childNodes[0].style.display = "block"
                productBtn.style.backgroundColor = "var(--brouwn)";
                productCheck.style.display = "none";
            }, 2000);
            let productId = e.target.nextElementSibling.value;
            Inertia.post(route('addProduct', {productId: productId}));
        }
    }
    
    function diplayPromotion(product) {
        let promotion = props.promotions.filter(promotion => promotion.id === product.promotion_id);
        let currentDate = new Date().toJSON().slice(0, 10);
        if (currentDate === promotion[0].start_date) {
            let discountedPrice = (product.price * (100 - promotion[0].dicount_rate)) / 100;
            let renderedPromo =<>
                <p className='promo prouduct-price prouduct-barred-price'>{product.price}$</p>
                <p className='promo prouduct-price'>{discountedPrice}$</p>
            </>
            return renderedPromo
        }
    }
    
    return <>
            <div className='products-container'>
                {props.products.length === 0 && <div>slow internet...no products to display</div>}
                    {props.products.map(product => (
                        <div className='product' key={product.id}>
                            <Link href={route('Show.product', {product: product.id})} className='onclick-div-product'>
                                <img className='prouduct-img' src={product.image} alt="product Image" />
                                <div className='product-details'>
                                    <p className='prouduct-name'>{product.name}</p>
                                    <div className='product-prices'>
                                        { product.barred_price &&
                                            <>
                                                <p className='prouduct-price prouduct-barred-price'>{product.barred_price}$</p>
                                                <p className='prouduct-price'>{product.price}$</p>
                                            </>
                                        }
                                        { product.promotion_id && product.barred_price  === null &&
                                            diplayPromotion(product)
                                        }
                                    </div>
                                </div>
                            </Link>
                            <button className='prouduct-add' onClick={addProduct} ><i className="fa-solid fa-plus"></i><i className="fa-solid fa-check fa-beat"></i></button>
                            <input type="number" className='secret-inp' defaultValue={product.id}/>
                        </div>
                    ))}
            </div>
    </>
}