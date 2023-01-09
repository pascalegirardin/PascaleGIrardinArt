/* import { graphql, useStaticQuery } from "gatsby";

const useRestPosts = () => {
    const data = useStaticQuery(graphql`
        query {
            allRestProjects {
                edges {
                    node {
                        acf {
                            align
                            dates
                            subtitle
                            size
                            place
                        }
                        slug
                        status
                        title
                        polylang_current_lang
                        featured_media
                        categories
                        date
                        type
                    }
                }
            }
        }
    `);
    return data.allRestProjects.edges
}
export default useRestPosts; */