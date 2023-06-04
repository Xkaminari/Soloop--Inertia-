import React from 'react'
import BackgroundTriangles from '../../components/BackgroundTriangles'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import "../../css/Ccp.css"

// Ccp means "Comment entretenir ses patins"

export default function Cep(props) {
    return ( <>
        <BackgroundTriangles home={true}/>
        <div className='Ccp'>
            <Nav user={props.auth.user} cartQty={props.userCart ? props.userCart.length : 0}/>
            <section className='ccp-sections'>
                <h2 className='ccp-main-title'>Comment entretenir ses patins ?</h2>
                <p>Les patins s’entretiennent mais pas n’importe comment ! Voyons les étapes ensemble.</p>
            </section>
            <section className='ccp-sections'>
                <h3>Préparation :</h3>
                <p><strong>PRÉCAUTION :</strong> Ne portez pas de blanc et il est préférable de le faire à l’extérieur ou dans un endroit aéré pour des raisons d’odeurs et de salissures !</p>
                <ul>
                    <li>Démontez les roues de vos patins</li>
                    <li>Enlevez vos lacets </li>
                    <li>Dépoussiérez vos patins entièrement à l'aide d'un chiffon sec</li>
                </ul>
            </section>
            <section className='ccp-sections'>
                <h3>Nettoyer la bottine</h3>
                <p>Prenez un chiffon humidifié ou une éponge magique pour nettoyer la bottine et enlevez les traces.</p>
                <p>Vous pouvez ensuite “blanchir” vos bottines avec les cirages EDEA !</p>
                <p>Attention, la plupart des bottines sont couleur ivoire et non blanc. <strong>N’utilisez donc pas les cirages blancs vendus en commerce !</strong></p>
                <p>Laissez sécher.</p>
            </section>
            <section className='ccp-sections'>
                <h3>Nettoyer les lacets</h3>
                <p>Pendant ce temps, brossez vos lacets avec du savon de marseille pour enlever les tâches et passez-les en machine à 40°C dans un petit filet pour ne pas les abîmer. (ne chauffez pas trop sinon les bouts en plastiques s’enlèveront).</p>
                <p>Ils redeviendront blanc comme neige !</p>
            </section>
            <section className='ccp-sections'>
                <h3>Nettoyez les roulements</h3>
                <p>Pendant que tout cela sèche, passons aux roues, roulements, entretoises et boulons.</p>
                <p>Démonter les roulements à l’aide d’un extracteur et mettez-les dans du White spirit ou [PRODUIT ROLL LINE], et remuez.</p>
                <p>
                    Plusieurs passages sont parfois nécessaires. Faîtes de même pour les entretoises et boulons.
                    Cette partie va permettre de dégraisser et enlever toutes les poussières incrustées.
                </p>
                <p>Renouvelez l’opération jusqu’à ce que le white Spirit reste quasi-transparent et tant que le roulement à des difficultés à tourner.</p>
                <p>Sortez-les du produit utilisé et posez-les sur de l’essuie-tout pour les sécher et faites les tourner pour enlever le surplus de produit dedans.</p>
                <p>Vous pouvez également utiliser un compresseur pour enlever le surplus et toutes les poussières.</p>
                <p>Regraissez vos roulements avec une graisse [PRODUIT] sur le côté ouvert du roulement. Si le roulement n’est pas ouvert vous pouvez le poser dessus et laissez rentrer le produit. Faîtes tourner le roulement pour que le produit s’imprègne.</p>
            </section>
            <section className='ccp-sections'>
                <h3>Nettoyer les roues</h3>
                <p>Passons aux roues, les roues peuvent être nettoyées à l’eau (!sans les roulements et en dehors des platines!). Prenez une vieille brosse à dent et frottez l’intérieur et l’extérieur de votre roues pour dépoussiérer et enlever les poussières coincées.</p>
            </section>
            <section className='ccp-sections'>
                <h3>Remontage de vos patins</h3>
                <p>Une fois que tout est sec vous pouvez remonter vos patins entièrement ! SANS FORCER</p>
                <p>Et n'oubliez pas de vérifier la hauteur des freins, le niveau de détérioration de vos roues, gommes etc.</p>
                <p><strong>A tous les papas, ne forcez pas ! Un enfant de 6 ans a la capacité de remonter des patins ! </strong></p>
                <p>Un doute, un soucis, contactez-moi !</p>
                <p>Ne cassez pas le jouet favori de vos enfants ;)</p>
            </section>
        <Footer/>
        </div>
        </>
    )
}
