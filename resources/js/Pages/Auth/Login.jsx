import { Inertia } from '@inertiajs/inertia';
import { Link, useForm } from '@inertiajs/inertia-react';
import React, { useEffect, useState } from 'react';
import BackgroundTriangles from '../../components/BackgroundTriangles';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import '../../css/Login.css';

export default function Login(props) {
    
    
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    })
    
    function submit(e) {
        e.preventDefault()
        post('/User/authenticate');
    }
    
    return (
    <>
        <BackgroundTriangles home={false}/>
        <div className='login-container'>
            <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <form className='login-form' autoComplete='off' onSubmit={submit}>
                <h2 className='Login-title'>Login</h2>
                <div className="login-fild">
                    <input value={data.email} onChange={e => setData('email', e.target.value)} type="email" id="mail" placeholder="exemple@gmail.com"/>
                        {errors.email && <div className='error'>{errors.email}</div>}
                </div>
                <div className="login-fild">
                    <input value={data.password} onChange={e => setData('password', e.target.value)}  type="password" id="password" placeholder="exemple: Uj4D/8hjz$"/>
                        {errors.password && <div className='error'>{errors.password}</div>}
                </div>
                <button className="connect-btn" type="submit" disabled={processing}>Login</button>
                {props.credentialsError && <div className='error'>{props.credentialsError}</div>}
                <Link className="redirecting-Login-btn" href="/Auth/SignUp">don't have an account ?  create one !</Link>
            </form>
            <Footer/>
        </div>
    </>
    )
}