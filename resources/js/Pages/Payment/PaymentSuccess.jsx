import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import '../../css/ConfirmeOrder.css'

export default function PaymentSuccess(props) {
    return (<>
        <BackgroundTriangles home={false}/>
        <Link className='exite-arrow' href={route('home')}><i className="fa-solid fa-arrow-left"></i></Link>
        <div className='payment-page payment-success-page'>
            <div className='payment-pop-up success-pop-up'>
                <h1 className='payment-pop-up-title success-title'><i className="fa-regular fa-circle-check"></i> Votre paiement a été effectué avec succès !</h1>
                <p className='payment-pop-up-body success-body'>Vous pouver consulter votre commande en allant dans <Link href={route('user.orders')}>Mes commande</Link></p>
            </div>
        </div>
    </>
    )
}