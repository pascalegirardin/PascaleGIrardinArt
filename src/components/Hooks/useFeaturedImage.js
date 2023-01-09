/* import { graphql, useStaticQuery } from "gatsby";

const useFeaturedImage = () => {
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
    
    return data
}
export default useFeaturedImage; */

/* import { graphql, useStaticQuery } from "gatsby";

const useFeaturedImage = (id) => {
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
        image.node.id == id
        ? x = image.node 
        : void(0)
    })
    return x
}
export default useFeaturedImage; */