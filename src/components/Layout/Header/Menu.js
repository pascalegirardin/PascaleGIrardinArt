import React from "react";
import Modal from 'react-modal'
import { Link } from 'gatsby'
import { useGlobalContext } from "../../../context/GlobalContext";

function Menu ({headerMenu}){

    const { showMenu, updateShowMenu} = useGlobalContext()
    const close = () => updateShowMenu(false)

    const modalStyles = {
        overlay: {
            position: `fixed`,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            backgroundColor: `transparent`,
        },
        content: {
            position: `asbolute`,
            border: `none`,
            background: `#fff`,
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: `auto `,
            WebkitOverflowScrolling: `touch`,
        },
    }

    console.log(headerMenu)

    // function that removes 'http://admin.pascalegirardin.art' from the url
    const removeUrl = (url) => {
        let newUrl = url.replace('http://admin.pascalegirardin.art', '')
        return newUrl
    }

    return headerMenu === null ? <></> : (
        <Modal
            isOpen={showMenu}
            onRequestClose={close}
            style={modalStyles}
            contentLabel="Modal"
            htmlOpenClassName="ReactModal__Html--open"
            closeTimeoutMS={350}
            className="header__modal"
            overlayClassName="header__overlay"
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
                        <Link
                            to={removeUrl(item.url)}
                            activeClassName="active"
                            onClick={close}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
                </ul>
            </nav>
        </Modal>
    )
}
export default Menu