/* import { graphql, useStaticQuery } from "gatsby";

const useImage = () => {
    const data = useStaticQuery(graphql`
        query {
            allRestMedias {
                edges {
                    node {
                        source_url
                        caption
                        id
                    }
                }
            }
        }
    `);
    return [data]
}
export default useImage; */
/* 
import { graphql, useStaticQuery } from "gatsby";

const useImage = (id) => {
    const data = useStaticQuery(graphql`
        query {
            allRestMedias {
                edges {
                    node {
                        source_url
                        caption
                        id
                    }
                }
            }
        }
    `);
    
    let x

    data.allRestMedias.edges.forEach((image) => {
        image.node.source_url === id
        ? x = image.node 
        : void(0)
    })
    console.log(x)
    return [x]
}
export default useImage; */