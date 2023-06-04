import React, { useEffect, useRef } from 'react'
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import "../../css/UserProfil.css"
import { useForm } from '@inertiajs/inertia-react';
import BackgroundTriangles from '../../components/BackgroundTriangles';

export default function UserProfil(props) {
    
    const { data, setData, post, errors } = useForm({
        userName: props.auth.user.name,
        userEmail: props.auth.user.email,
        userNum: props.auth.user.phone,
        userPassWord: "",
        userNewPassWord: "",
        userConfirmeNewPassWord: "",
        // User Address
        userCity: props.auth.user.address.city,
        userFullAddress: props.auth.user.address.address_line,
        userPostalCode: props.auth.user.address.postal_code,
    })
    
    const modaleElements = useRef();
    const modale = useRef();
    const modaleFilter = useRef();
    
    function openModale() {
        modaleElements.current.style.display = 'grid'
        modale.current.style.display = 'flex'
        modaleFilter.current.style.display = "block"
    }
    
    function closeModale() {
        modaleElements.current.style.display = 'none'
        modale.current.style.display = 'none'
        modaleFilter.current.style.display = "none"
    }
    
    function editeProfil(e) {
        console.log("ok");
        e.preventDefault();
        if (data.userNewPassWord === "" || data.userConfirmeNewPassWord === "") {
            post(route('update.profil'));
        } else {
            openModale();
        }
    }

    function editeAllProfil(e) {
        e.preventDefault();
        post(route('update.profil'));
    }
    
    return (
    <>
        <BackgroundTriangles home={false}/>
        <div className='userProfil'>
            <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <div className='userProfil-content'>
                <h2>{props.auth.user.Name}</h2>
                <form autoComplete="off" onSubmit={editeProfil}>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Nom complet</label>
                        <input type="text"  onChange={(e) => setData('userName', e.target.value) } value={data.userName}/>
                        {errors.userName && <div>{errors.userName}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Email</label>
                        <input type="text"  onChange={(e) => setData('userEmail', e.target.value) } value={data.userEmail}/>
                        {errors.userEmail && <div>{errors.userEmail}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Numéros de téléphone</label>
                        <input type="tel"  onChange={(e) => setData('userNum', e.target.value) } value={data.userNum}/>
                        {errors.userNum && <div>{errors.userNum}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Votre ville</label>
                        <input type="text"  onChange={(e) => setData('userCity', e.target.value) } value={data.userCity}/>
                        {errors.userCity && <div>{errors.userCity}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Votre addresse</label>
                        <input type="text"  onChange={(e) => setData('userFullAddress', e.target.value) } value={data.userFullAddress}/>
                        {errors.userFullAddress && <div>{errors.userFullAddress}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Votre code postale</label>
                        <input type="text"  onChange={(e) => setData('userPostalCode', e.target.value) } value={data.userPostalCode}/>
                        {errors.userPostalCode && <div>{errors.userPostalCode}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Nouveau mot de passe</label>
                        <input type="password"  onChange={(e) => setData('userNewPassWord', e.target.value) } value={data.userNewPassWord}/>
                        {errors.userNewPassWord && <div>{errors.userNewPassWord}</div>}
                    </div>
                    <div className='userProfil-form-section'>
                        <label htmlFor="Name">Confirmer le mot de passe</label>
                        <input type="password"  onChange={(e) => setData('userConfirmeNewPassWord', e.target.value) } value={data.userConfirmeNewPassWord}/>
                        {errors.userConfirmeNewPassWord && <div>{errors.userConfirmeNewPassWord}</div>}
                    </div>
                    <button type="submit" className='Edit-profil-btn'>Valider</button>
                    {errors.userPassWord && <div>{errors.userPassWord}</div>}
                    <div className='modale-elements' ref={modaleElements}>
                        <div className='modale' ref={modale}>
                            <div className='modale-title-container'>
                                <h2 className='modale-title'><i className="fa-solid fa-circle-exclamation" id='edite-modale-fa'></i> Vous devez saisir le mot de passe actuel,  pour le modifier.</h2>
                            </div>
                            <div className='modale-body'>
                                <input type="password" onChange={(e) => setData('userPassWord', e.target.value)} value={data.userPassWord}/>
                                <div className='modale-btns'>
                                    <button type='button' onClick={editeAllProfil} className='modale-btn modale-edit-btn'>Modifier</button>
                                    <button type='button' className='modale-btn modale-cancel-btn' onClick={closeModale}>Annuler</button>
                                </div>
                            </div>
                        </div>
                        <div onClick={closeModale} className='modale-filter' ref={modaleFilter}></div>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    </>
    )
}
