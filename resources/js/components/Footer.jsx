import React, { Component } from 'react'
import '../css/Footer.css'

export default class Footer extends Component {
    render() {
        return <footer>
            <div className="social-media">
                <a href="https://www.youtube.com/channel/UCPXnFImxBHWE2a659au6opg"><i className="fa-brands fa-youtube"></i></a>
                <a href="https://www.facebook.com/soloopboutique"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://www.instagram.com/soloop_boutique/"><i className="fa-brands fa-instagram"></i></a>
            </div>
            <p className='copyright'>Copyright &copy; 2020 Soloop tous droits réservés</p>
        </footer>
    }
}
