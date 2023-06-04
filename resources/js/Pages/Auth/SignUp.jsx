import React, { useState  } from 'react';
import '../../css/SignUp.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { Link, useForm } from '@inertiajs/inertia-react';
import BackgroundTriangles from '../../components/BackgroundTriangles';

export default function SignUp(props) {
    
    const [confirmedPwError, setConfirmedPwError] = useState('');
    
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: '',
        email: '',
        phone:'',
        password: '',
        confirmedPassword: '',
        remember: false,
    })
    
    function submit(e) {
        e.preventDefault();
        post('/User/SignUp')
        if (data.password !== data.confirmedPassword) {
            setConfirmedPwError('Passwords are not the same!')
        }
        setTimeout(() => {
            setConfirmedPwError('');
            clearErrors();
        }, 3000);
    }
    
    return (
    <>
        <BackgroundTriangles home={false}/>
        <main className='SignUp-container'>
            <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <form className='SignUp-form' autoComplete="off" onSubmit={submit}>
                <h2 className='SignUp-Title'>SignUp</h2>
                <div className="SignUp-fild">
                    <input value={data.name} onChange={e => setData('name', e.target.value)} type="text" id="name" placeholder='Nom complet'/>
                    {errors.name && <div className='error'>{errors.name}</div>}
                </div>
                <div className="SignUp-fild">
                    <input value={data.email} onChange={e => setData('email', e.target.value)} type="email" id="mail" placeholder="exemple@gmail.com"/>
                    {errors.email && <div className='error'>{errors.email}</div>}
                </div>
                <div className="SignUp-fild">
                    <input value={data.phone} onChange={e => setData('phone', e.target.value)} type="tel" id="phone" placeholder="06 XX XX XX XX"/>
                    {errors.phone && <div className='error'>{errors.phone}</div>}
                </div>
                <div className="SignUp-fild">
                    <input value={data.password} onChange={e => setData('password', e.target.value)}  type="password" id="password" placeholder="exemple: Uj4D/8hjz$"/>
                    {errors.password && <div className='error'>{errors.password}</div>}
                </div>
                <div className="SignUp-fild">
                    <input value={data.confirmedPassword} onChange={e => setData('confirmedPassword', e.target.value)}  type="password" id="confirmedPassword" placeholder='Confirmer mot de passe'/>
                    {confirmedPwError && <div className='error'>{confirmedPwError}</div>}
                </div>
                <div className='footer-SignUp'>
                    <button className="register_button" type="submit" disabled={processing}>Register</button>
                </div>
                <Link className="redirecting-SignUp-btn" href="/Auth/Login">Already have an account ? <p> Log in to it !</p></Link>
            </form>
            <Footer/>
        </main>
    </>
    )
}