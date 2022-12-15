import { graphql, useStaticQuery } from "gatsby";

const useRestPosts = () => {
    const data = useStaticQuery(graphql`
        query {
            allRestPosts {
                edges {
                    node {
                        id
                        slug
                        title
                        polylang_current_lang
                        status
                        date
                        type
                        acf {
                            title_2
                            subtitle
                            dates
                        }
                    }
                }
            }
        }
    `);
    return data.allRestPosts.edges
}
export default useRestPosts;