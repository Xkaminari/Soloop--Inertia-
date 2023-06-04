import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import '../../css/Promotion.css'
import Nav from '../../components/Nav'

export default function EditPromotion(props) {
    
    const { data, setData, post, errors } = useForm({
        name: props.promotion.name,
        description: props.promotion.description,
        dicount_rate: props.promotion.dicount_rate,
        start_date: props.promotion.start_date,
        end_date: props.promotion.end_date,
        promotionId: props.promotion.id,
    })
    
    function editPromotion(e) {
        e.preventDefault();
        post(route("promotion.update"));
    }
    
    return (<>
        <BackgroundTriangles home={false}/>
        <div className='promotion-page promotion-edit'>
        <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <form className='promotion-form edit-promotion-form' onSubmit={editPromotion}>
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
                    <input type="number" id='promotion-discount' value={data.dicount_rate} onChange={(e) => setData('dicount_rate', e.target.value)}/>
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
                <button className='creat-promotion-btn'>Modifier</button>
            </form>
        </div>
    </>
    )
}
