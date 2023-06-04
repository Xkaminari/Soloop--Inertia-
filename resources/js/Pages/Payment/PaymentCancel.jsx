import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import '../../css/ConfirmeOrder.css'

export default function PaymentSuccess(props) {
    return (<>
        <BackgroundTriangles home={false}/>
        <Link className='exite-arrow' href={route('home')}><i className="fa-solid fa-arrow-left"></i></Link>
        <div className='payment-page payment-cancel-page'>
            <div className='payment-pop-up cancel-pop-up'>
                <h1 className='payment-pop-up-title cancel-title'><i className="fa-regular fa-circle-xmark"></i> Un problème est survenue lors du paiement :/</h1>
                <p className='payment-pop-up-body cancel-body'><Link href={route('cart')}>Retour</Link></p>
            </div>
        </div>
    </>
    )
}