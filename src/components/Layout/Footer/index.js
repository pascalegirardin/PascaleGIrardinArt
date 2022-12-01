import React, { useEffect, useState } from "react";
import Logotype from "../Logotype";
import FooterRow from "./FooterRow";
import cmaqSrc from './images/CMAQ _horiz_noir.png'
import csmSrc from './images/csm_Logo_CALQ_noir_725x300_373aca8cfe_2.png'

function Footer ({pageContext}) {

    const lang = pageContext.locale
    let [footerMenu, setFooterMenu] = useState(null)

    const fetchFooterMenu = () => {
        if(lang !== undefined) {
            fetch( "https://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus/" )
            .then( (response) => response.json() )
            .then( (data) => {
                let x
                data.forEach(element => {
                    let nom = element.name
                    nom.charAt(0) === 'f' && nom.includes(lang) ? x = element : void(0)     // if the name of the menu starts with f it's definitely a footer also we want the right translation
                })                                                                          //console.log(x.meta.links.self)
                return fetch(x.meta.links.self)
            })
            .then( (response) => response.json())
            .then((data) => {setFooterMenu(data)})                                          //console.log(data); 
        }
    }
        useEffect(() =>  fetchFooterMenu() , [lang] ); 

    return (
        <footer className="footer">
            <div className="footer__logotype">
                <div style={{display: 'flex', alignItems:'center'}}>
                    <Logotype parent='footer' />
                    <div style={{marginLeft: 'auto'}}>
                        <a href="https://www.metiersdart.ca/" target='blank'>
                            <img src={cmaqSrc} style={{height : '3rem'}}  alt='cmaq_logo' />
                        </a>
                        <a href="https://www.calq.gouv.qc.ca/" target='blank'>
                            <img src={csmSrc} style={{height : '3rem'}}  alt='calq_logo' />
                        </a>
                    </div>
                </div>
            </div>
            {
                footerMenu &&
                footerMenu.items.map( (element) =>
                    <FooterRow obj={element} key={element.url}/> 
                )
            }
        </footer>
    )
}
export default Footer 