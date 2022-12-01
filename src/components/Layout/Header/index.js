import React from "react";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../../context/GlobalContext";
import LangNav from "./LangNav";
import Menu from "./Menu";
import Logotype from "../Logotype";

function Header ({pageContext}){

    const { updateShowMenu } = useGlobalContext()
    const lang = pageContext.locale 
    let [headerMenu, setHeaderMenu] = useState(null)

    const fetchHeaderMenu = () => {
        if(lang !== undefined) {
            fetch( "http://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus/" )
            .then( (response) => response.json() )
            .then( (data) => {
                let x
                data.forEach(element => {
                    let nom = element.name
                    nom.charAt(0) === 'p' && nom.includes(lang) ? x = element : void(0)     // if the name of the menu starts with p it's definitely a primary menu also we want the right translation
                })                                                                          //console.log(x.meta.links.self)
                return fetch(x.meta.links.self)
            })
            .then( (response) => response.json())
            .then((data) => {setHeaderMenu(data)})                                          //console.log(data); 
        }
    }
        useEffect(() => { fetchHeaderMenu() }, [lang]); 

    return(
        <header className="header">
            <div className="header__visible">
                <Logotype parent='header'/>
                <div className="header__right">
                    <LangNav pageContext={pageContext}/>
                    <button type="button" className="header__toggle" onClick={()=>{updateShowMenu(true)}}>
                        <img src={require('./hamburger.svg').default} alt='hamburger' />
                    </button>
                </div>
            </div>
            <Menu headerMenu={headerMenu}/>
        </header>
    )
}

export default Header