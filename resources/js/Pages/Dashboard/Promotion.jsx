import { Inertia } from '@inertiajs/inertia'
import { Link, useForm } from '@inertiajs/inertia-react'
import React, { useRef, useState } from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import '../../css/Dashboard.css'
import '../../css/Promotion.css'
import Nav from '../../components/Nav'

export default function Promotion(props) {
    
    const [bannerTitle, setBannerTitle] = useState('');
    const [bannerCore, setbannerCore] = useState('');
    
    const modaleFilter = useRef()
    
    const { data, setData, post, delete: destroy, errors } = useForm({
        name: '',
        description: '',
        dicount_rate: 0,
        start_date: '',
        end_date: '',
        applyToAllProducts: false,
    })
    
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
    
    function creatPromotion(e) {
        e.preventDefault();
        post(route("promotion.creat"));
    }
    
    function destroyPromotion(e) {
        let promotionId = e.target.nextElementSibling.defaultValue;
        destroy(route('promotion.destroy',{promotion: promotionId,}));
        closeModale(e);
    }
    
    function diplayBannerMessage() {
        Inertia.post(route('upadate.banner'), {
            bannerTitle: bannerTitle,
            bannerCore: bannerCore,
        })
    }
    
    return (<>
        <BackgroundTriangles home={false}/>
        <div className='promotion-page'>
            <div className='modale-filter' ref={modaleFilter}></div>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
                <div className='inp-banner-message-container'>
                    <h2 className='banner-message-title promotion-title'>Modifier la bannière</h2>
                    <form className='banner-form' onSubmit={diplayBannerMessage}>
                        <label htmlFor="banner-title">Titre de la banière</label>
                        <input type="text" id="banner-title" placeholder='enter a banner title' onChange={(e) => setBannerTitle(e.target.value)} value={bannerTitle}/>
                        <label htmlFor="banner-message">Core de la banière</label>
                        <input type="text" id="banner-message" placeholder='enter a banner message' onChange={(e) => setbannerCore(e.target.value)} value={bannerCore}/>
                        <button className='diplay-banner-message-btn'>Afficher</button>
                    </form>
                </div>
                <div className='create-promotion'>
                    <h2 className='promotion-title'>Creation de promotion</h2>
                    <form className='promotion-form' onSubmit={creatPromotion}>
                        <div className='promotion-fild'>
                            <label htmlFor="promotion-name">Nom de la promotion</label>
                            <input type="text" id='promotion-name' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                            {errors.name && <div className='error'>{errors.name}</div>}
                        </div>
                        <div className='promotion-fild'>
                            <label htmlFor="promotion-description">Description de la promotion</label>
                            <input type="text" id='promotion-description' value={data.description} onChange={(e) => setData('description', e.target.value)}/>
                            {errors.description && <div className='error'>{errors.description}</div>}
                        </div>
                        <div className='promotion-fild'>
                            <label htmlFor="promotion-discount">Promotion discount</label>
                            <input type="number" id='promotion-discount' value={data.dicount_rate === 0 ? "" : data.dicount_rate} onChange={(e) => setData('dicount_rate', e.target.value)}/>
                            {errors.dicount_rate && <div className='error'>{errors.dicount_rate}</div>}
                        </div>
                        <div className='promotion-fild'>
                            <label htmlFor="promotion-start-date">Date de debut</label>
                            <input type="date" id='promotion-start-date' value={data.start_date} onChange={(e) => setData('start_date', e.target.value)}/>
                            {errors.start_date && <div className='error'>{errors.start_date}</div>}
                        </div>
                        <div className='promotion-fild'>
                            <label htmlFor="promotion-end-date">Date de fin</label>
                            <input type="date" id='promotion-end-date' value={data.end_date} onChange={(e) => setData('end_date', e.target.value)}/>
                            {errors.end_date && <div className='error'>{errors.end_date}</div>}
                        </div>
                        <div className='promotion-fild promotion-fild-checkBox'>
                            <input type="checkbox" id='apply-all-product-promotion' checked={data.applyToAllProducts} onChange={e => setData('applyToAllProducts', e.target.checked)}/>
                            <span className="checkmark"></span>
                            <label htmlFor="apply-all-product-promotion">Appliquer a tous les produit</label>
                            {errors.applyToAllProducts && <div className='error'>{errors.applyToAllProducts}</div>}
                        </div>
                        <button className='creat-promotion-btn'>Créer la promotion</button>
                    </form>
                </div>
                {props.promotions && 
                <div className='all-promotions'>
                    {props.promotions.map(promotion => (
                        <div className='promotion' key={promotion.id}>
                            <h2 className='promotion-title'>{promotion.name}</h2>
                            <div className='promotion-detail'>
                                <label htmlFor="existing-promotion-title">Taux de promotion:</label>
                                <p className='existing-promotion-title'>{promotion.dicount_rate}</p>
                            </div>
                            <div className="promotion-detail promotion-detail-description">
                                <label htmlFor="promotion-description">Description de la promotion:</label>
                                <p className='promotion-description'>{promotion.description}</p>
                            </div>
                            <div className='start-end-dates'>
                                <div className="promotion-detail">
                                    <label htmlFor="promotion-start-date">Commence le:</label>
                                    <p className='promotion-start-date'>{promotion.start_date}</p>
                                </div>
                                <div className="promotion-detail">
                                    <label htmlFor="promotion-end-date">Fini le:</label>
                                    <p className='promotion-end-date'>{promotion.end_date}</p>
                                </div>
                            </div>
                            <div className='promotion-btns'>
                                <Link href={route("promotion.edit", {promotion: promotion})}><button className='edit-promotion-btn promotion-btn'>Modifier</button></Link>
                                <button className='delete-promotion-btn promotion-btn' onClick={openModale}>supprimer</button>
                            </div>
                            <div className='modale'>
                                <div className='modale-title-container'>
                                    <h2 className='modale-title'><i className="fa-solid fa-circle-exclamation"></i> Voulez vous supprimer la promo "{promotion.name}" ?</h2>
                                </div>
                                <div className='modale-body'>
                                    <p className='modale-descripton'>Sa suppression la fera disparaître définitivement de la liste des promotions et tout produit qui en bénéficient se verra lui aussi retirer cette dernière.</p>
                                    <div className='modale-btns'>
                                        <button className='modale-btn modale-supp-btn' onClick={destroyPromotion}>supprimer</button>
                                        <input className='secret-inp' type="number" defaultValue={promotion.id} />
                                        <button className='modale-btn modale-cancel-btn' onClick={closeModale}>Annuler</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                }
        </div>
    </>
    )
}