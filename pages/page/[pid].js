import { useRouter } from 'next/router'
import { cherche } from '../../components/lib/lib'
import { useAppContext } from '../../components/context/context'
import Layout from "../../components/Layout";
import PageContent from '../../components/PageContent/PageContent';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Post({wordpressPage, menus}) {

    const {pageContext} = useAppContext()

    const router = useRouter()
    const { pid } = router.query
    const { asPath } = useRouter()
    const [originalPath, setOriginalPath] = useState(null)

    useEffect(()=>{
        setOriginalPath(asPath)
    }, [])

    const [hash, setHash] = useState(0)

    console.log(asPath)

    useEffect(()=>{
        asPath.includes('#')
        ? setHash(asPath.split('#')[1])
        : setHash(0)
    }, [ asPath ])

    return(
        <Layout 
            title={wordpressPage.acf.sections[hash].title} 
            description={wordpressPage.acf.sections[hash].excerpt} 
            pageContext={pageContext} 
            menus={menus}
        >
            <nav className ="inline-nav">
                <div className ="inline-nav__title">
                    <span
                        dangerouslySetInnerHTML={{ __html: wordpressPage.title.rendered }}    // section.title
                    />
                </div>
                <ul className="inline-nav__items">
                {
                    wordpressPage.acf.sections.map((section, index) => (
                        <li key={`${originalPath}ok${index}`} className="inline-nav__item">
                            <Link
                                href={`/${originalPath}#${index}`} >
                                <span
                                    key={`${originalPath}s${index}`}
                                    className={index == hash ? 'active' : ''}
                                    onClick={() => setHash(index)}
                                    dangerouslySetInnerHTML={{ __html: section.title }}    // section.title
                                />
                            </Link>
                        </li>
                    ))
                }
                </ul>
            </nav>
            {
                wordpressPage.acf.sections.map((section, index) => {
                    return index == hash 
                    ? section.flexible_content.map(element =>
                        <PageContent 
                        element={element} 
                        wordpressPage={wordpressPage} 
                        key={ (index + element.acf_fc_layout).toString() } 
                        pageContext={pageContext}
                        />
                    ): null
                })
            }
        </Layout>
    )
}

export async function getStaticProps(pid) {
    const x = await cherche(`pages?slug=${pid.params.pid}`)
    const wordpressPage = x[0]
    const menus = await cherche("menus")
    return {
        props: {wordpressPage, menus},
    }
}

export async function getStaticPaths() {

    const pages = await cherche("pages")
    let paths = []
    pages.map(expo => {
        paths.push(`/page/${expo.slug}`)
    })
    /* console.log(paths) */
    return {
        paths,
        fallback: false,
    }
}