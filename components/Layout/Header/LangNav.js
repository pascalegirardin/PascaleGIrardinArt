import React from "react";
import Link from "next/link";
import { useAppContext } from "../../context/context";

function LangNav ({pageContext}){

    const { updatePageContext } = useAppContext();

    function handleClick(e) {
        updatePageContext({ locale: e.target.innerText === 'fr' ? 'fr_CA' : 'en_CA' })
    }

    let targetLang = pageContext.locale === 'fr_CA' ? 'en' : 'fr';
    return (
        pageContext.locale === undefined ? <></>:
        <ul className="lang">
            <Link href='/'  onClick={(e)=> handleClick(e)}>
                {targetLang}
            </Link>
        </ul>
    )
}
export default LangNav