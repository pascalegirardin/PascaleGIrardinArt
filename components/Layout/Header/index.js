import { useEffect, useState } from "react";
import LangNav from "./LangNav";
import Logotype from "../Logotype";
import Modal from 'react-modal'
import modalStyles from "./modalStyles";


function Header ({pageContext, menus}){

    const lang = pageContext.locale 
    const defaultVisibility = false
    const [showMenu, setMenu] = useState(defaultVisibility)
    const updateShowMenu = (data) => setMenu(data)
    const close = () => updateShowMenu(false)
    const open = () => updateShowMenu(true)
    const [headerMenu, setHeaderMenu] = useState(null)

    async function fetchHeaderMenu() {
        if(lang !== undefined) {
            let x
            menus.forEach(element => {
                let nom = element.name
                nom.charAt(0) === 'p' && nom.includes(lang) ? x = element : void(0)     // if the name of the menu starts with p it's definitely a primary menu also we want the right translation
            })
            const res = await fetch(x.meta.links.self)
            const xx = await res.json()
            setHeaderMenu(xx)
        }
    }
        useEffect(() => { fetchHeaderMenu() }, [lang]); 

    return headerMenu === null ? <></> :(
        <header className="header">
            <div className="header__visible">
                <Logotype parent='header'/>
                <div className="header__right">
                    <LangNav pageContext={pageContext}/>
                    <button type="button" className="header__toggle" 
                        onClick={
                            ()=>{open ()
                            }}>
                        <img src='./hamburger.svg' alt='' />
                        
                    </button>
                </div>
            </div>
            <Modal
                isOpen={showMenu}
                onRequestClose={close}
                style={modalStyles}
                contentLabel="Modal"
                htmlOpenClassName="ReactModal__Html--open"
                closeTimeoutMS={350}
                className="header__modal"
                overlayClassName="header__overlay"
                ariaHideApp= {false}
                >
                <nav className="nav">
                    <button
                        type="button"
                        className="header__toggle"
                        onClick={close}
                    >
                        <img 
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE3IDE2Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iI0IzQjNCMyI+CiAgICA8cGF0aCBkPSJNLjcwNzEuMzUzNUwxNS43MDcxIDE1LjM1MzVNMTUuNzA3MS4zNTM1TC43MDcxIDE1LjM1MzUiLz4KICA8L2c+Cjwvc3ZnPgo="
                            alt="close menu" 
                        />
                    </button>
                    <ul>
                    {headerMenu.items.map((item, i) => (
                        <li key={i}>
                            <a
                                href={item.url}
                                activeclassname="active"
                                onClick={close}
                            > 
                                {item.title}
                            </a>
                        </li>
                    ))}
                    </ul>
                </nav>
            </Modal>
        </header>
    )
}
export default Header