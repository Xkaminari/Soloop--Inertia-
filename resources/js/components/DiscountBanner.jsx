import React from 'react'

export default function DiscountBanner(props) {
    return (
        <div className='discount-banner-conatiner'>
            <h2 className='discount-banner-title'>{props.banner.banner_title}</h2>
            <p className='discount-banner-description'>{props.banner.banner_body}</p>
        </div>
    )
}
