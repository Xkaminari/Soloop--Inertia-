import React from 'react'
import '../css/BackgroundTriangles.css'
import Groupe1Triangle1 from '../Media/Triangle/Groupe1Triangle1.webp'
import Groupe1Triangle2 from '../Media/Triangle/Groupe1Triangle2.webp'
import Groupe1Triangle3 from '../Media/Triangle/Groupe1Triangle3.webp'
import Triangle1 from '../Media/Triangle/Triangle1.webp'
import Triangle3 from '../Media/Triangle/Triangle3.webp'
import Groupe2Triangle1 from '../Media/Triangle/Groupe2Triangle1.webp'
import Groupe2Triangle2 from '../Media/Triangle/Groupe2Triangle2.webp'
import Triangle2 from '../Media/Triangle/Triangle2.webp'

export default function BackgroundTriangles(props) {
    return (
        <div className='absolute-cantainer'>
            <div className='background-triangles-cantainer'>
                <div className="triangle-groupe-1">
                    <div className='internal-groupe-1'>
                        <img className='triangle-img triangle1' src={Groupe1Triangle1} alt="" />
                        <img className='triangle-img triangle3' src={Groupe1Triangle3} alt="" />
                        <img className='triangle-img triangle2' src={Groupe1Triangle2} alt="" />
                    </div>
                    <div className='single-triangle1-cantainer'>
                        <img className='single-triangle-img single-triangle1' src={Triangle1} alt="" />
                    </div>
                </div>
                <div style={{display: props.home ? 'none' : 'flex'}} className='single-triangle3-cantainer'>
                    <img className='single-triangle-img single-triangle3' src={Triangle3} alt="" />
                </div>
                <div className="triangle-groupe-2">
                    <img className='single-triangle-img single-triangle2' src={Triangle2} alt="" />
                    <div className='internal-groupe-2'>
                        <img className='triangle-img triangle-model-groupe-2 triangle1-groupe-2' src={Groupe2Triangle1} alt="" />
                        <img className='triangle-img triangle-model-groupe-2 triangle2-groupe-2' src={Groupe2Triangle2} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
} 