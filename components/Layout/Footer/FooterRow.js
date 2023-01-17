import React from "react"

function FooterRow(props){
    let obj = props.obj

    function SubCategories() {
        
        function Sub (){
            let sub = obj.children.map((element) => {
                return(
                    <li className="inline-nav__item" key={element.url}>
                        <a href={element.url}>
                            {element.title}
                        </a>
                    </li>
                )
            })
            return sub 
        }
        return( obj.children !== undefined ? <Sub/> : <></>)
    }

    return(
        <>
            <li className="footer__nav-item" style={{listStyle: 'none'}}>
                <nav className="inline-nav">
                    <div className="inline-nav__title">
                        <a href={obj.url}>
                            {obj.title} 
                        </a>
                    </div>
                    <ul className="inline-nav__items">
                        <SubCategories/>
                    </ul>
                </nav>
            </li>
        </>
    )
}
export default FooterRow