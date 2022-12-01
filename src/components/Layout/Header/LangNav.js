import React from "react";
import { Link, languages } from '../../../i18n'

function LangNav ({pageContext}){

    return (
        pageContext.locale === undefined ? <></>:
        <ul className="lang">
            {languages.map(lang => {
            let translation = false

            if (pageContext.translations) {
                translation = pageContext.translations.find(
                t => t.locale === lang.locale
                )
            }

            const path = translation
                ? { to: translation.path }
                : { to: '/', locale: lang.locale, }

            return (
                <li
                key={lang.locale}
                aria-hidden={lang.locale === pageContext.locale}
                >
                <Link {...path} state={{
                    modal: false,
                }}>{lang.text}</Link>
                </li>
            )
            })}
        </ul>
    )
}

export default LangNav