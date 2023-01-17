import React, { useEffect, useState } from "react";
import Logotype from "../Logotype";
import FooterRow from "./FooterRow";
import Sponsor from "./Sponsor";

function Footer ({pageContext, menus}) {

    const lang = pageContext.locale
    let [footerMenu, setFooterMenu] = useState(null)

    const fetchFooterMenu = () => {
        if(lang !== undefined) {
            let x
            menus.forEach(element => {
                let nom = element.name
                nom.charAt(0) === 'f' && nom.includes(lang) ? x = element : void(0)     // if the name of the menu starts with f it's definitely a footer also we want the right translation
            })                                                                          //console.log(x.meta.links.self)
            fetch(x.meta.links.self)
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
                </div>
            </div>
            {
                footerMenu &&
                footerMenu.items.map( (element) =>
                    <FooterRow obj={element} key={element.url}/> 
                )
            }
            <div style={{marginLeft:'-1rem', marginTop:'2.5rem'}}>
                <Sponsor />
            </div>
        </footer>
    )
}
export default Footer 