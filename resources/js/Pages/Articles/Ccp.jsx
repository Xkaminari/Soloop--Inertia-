import React from 'react'
import Niveau from '../../Media/Article/Niveau.webp'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import "../../css/Ccp.css"
import BackgroundTriangles from '../../components/BackgroundTriangles'

// Ccp means "Comment choisir ses patins"

export default function Ccp(props) {
    return (<>
        <BackgroundTriangles home={true}/>
        <div className='Ccp'>
                <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <section className='ccp-sections'>
                <h2 className='ccp-main-title'>Comment choisir ses patins ?</h2>
                <p>Hello la #soloopfamily,</p>
                <p>A chaque rentrée, nombreux sont les patineurs à se demander si ils doivent ou non changer de patins.</p>
                <p>Alors nous allons commencer par vous expliquer <strong>ce qui doit compter dans votre choix !</strong></p>
            </section>
            <section className='ccp-sections'>
                <div>
                    <h3>Votre budget</h3>
                    <p>Le premier critère est bien souvent le prix surtout pour les parents, STOOOOOOP ! Erreur ! </p>
                    <p>Un enfant de 6 ans n’a pas besoin de patins à 600 euros et un sportif national ne peut pas patiner avec des patins en plastique. </p>
                    <p>Donc oui, <strong>rien à voir avec le prix, je vous explique !</strong></p>
                </div>
            </section>
            <section className='ccp-sections ccp-sections-img'>
                <img className='ccp-img' src={Niveau} alt="niveau de patinage" />
                <div>
                    <h3>Votre niveau</h3>
                    <p>En fonction de votre niveau, et donc de ce que vous allez faire et essayer de faire, il va être très important de choisir <strong>un patin qui va vous aider à progresser et qui vous protège !</strong></p>
                    <p>C’est pourquoi, <strong>vous trouverez les niveaux recommandés pour chaque modèle.</strong></p>
                </div>
            </section>
            <section className='ccp-sections'>
                <div>
                    <h3>Votre poids et âge</h3>
                    <p>Et oui c’est aussi un critère à prendre en compte ! Imaginez un adulte sur une trottinette en plastique, il y a des risques qu'elle casse et/ou que l’adulte se fasse mal, ici, c’est la même chose. </p>
                    <p>Sur des <strong>débutants adultes</strong>, nous conseillons des <strong>bottines plus rigides et des platines en aluminium au minimum</strong>. Ce modèle lui permettra d’apprendre et de progresser, sans problématique de patins qui se cassent ou qui ne protègent pas la cheville. Une <strong>bottine trop dure par contre est tout aussi dangereuse</strong>, votre pied et vos chevilles si elles ne sont pas habituées peuvent être bloquées et provoquer de micro-fractures au niveau des malléoles.</p>
                    <p>Alors si vous avez un profil atypique ou que vous avez besoin de conseils, je suis présente pour vous conseiller !</p>
                </div>
            </section>
            <section className='ccp-sections'>
                <h3>Votre discipline</h3>
                <p>Roller artistique, danse, groupe, ou in-line, l’utilisation des patins sont différentes en fonction des disciplines, plus de chocs dans l’un, besoin de mobilité dans l’autre et besoin de roues alignées, il existe de nombreux formats de bottines, platines, roues et gommes pour cela !</p>
                <p>Choisissez bien votre discipline avec les filtres !</p>
            </section>
            <section className='ccp-sections'>
                <h3>Pièces Modulables</h3>
                <p>
                    Il existe de nombreuses variantes en fonction des types de patineurs. Sachez que toutes les pièces sont modulables et peuvent être changées.
                    Si vous patinez sur du parquet ou du ciment lisse, les roues ne seront pas les mêmes, alors n’hésitez pas à nous demander.
                </p>
            </section>
            <section className='ccp-sections'>
                <h3>Checklist pour demander conseils</h3>
                <ul>
                    <li>Votre nom</li>
                    <li>Votre club (on pourra savoir quel type de salle et piste vous utilisez)</li>
                    <li>L’âge du patineur (pour savoir si il va vite grandir ou non !)</li>
                    <li>Son poids et sa taille (on est pas à 2 kg près mais l’indication est important, et il en va aussi de votre sécurité comme en ski ou en accrobranche pour les amoureux de sensations fortes !)</li>
                    <li>La discipline</li>
                    <li>Le niveau actuel et visé en saison prochaine</li>
                    <li>Les roues que vous souhaitez si vous le savez (sur conseils de l’entraîneur ou par choix)</li>
                    <li>Pointure des chaussures de ville, de sport, pointure actuelle et souhaitée</li>
                    <li>Et vos contacts (téléphone/mail)</li>
                </ul>
            </section>
            <Footer/>
        </div>
    </>
    )
}
