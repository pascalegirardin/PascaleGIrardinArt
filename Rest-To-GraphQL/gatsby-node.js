const axios = require('axios');
const crypto = require('crypto');

exports.onPreInit = () => console.log("Rest-To-GraphQl")

exports.sourceNodes = async ({ actions }) => {
    
    const { createNode } = actions;

    const api = {
        projects : `http://admin.pascalegirardin.art/wp-json/wp/v2/projects?per_page=100&page=1` ,
        posts : `http://admin.pascalegirardin.art/wp-json/wp/v2/posts` ,
        pages : `http://admin.pascalegirardin.art/wp-json/wp/v2/pages` ,
        categories : `http://admin.pascalegirardin.art/wp-json/wp/v2/categories` ,
        menus : `http://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus/`,
    }

    const cherche = (x) => axios.get(x)

    //// START PROJECTS ////
    const projects = await cherche(api.projects);
    projects.data.map((element) => {
        const userNode = {
            id: `${element.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: `RestProjects`, 
            },
            children: [],
            slug: element.slug,
            status: element.slug,
            polylang_current_lang: element.polylang_current_lang,
            polylang_translations: {
                polylang_current_lang : element.polylang_translations.polylang_current_lang,
                slug : element.polylang_translations.slug,
            },
            title: element.title.rendered, 
            slug: element.slug,
            link: element.link,
            type: element.type,
            date: element.date,
            excerpt: element.excerpt.rendered,
            featured_media : element.featured_media,
            acf: element.acf,
            categories: element.categories,
            featured_media : element.featured_media,
        }

        const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
        userNode.internal.contentDigest = contentDigest;
        createNode(userNode);
    });
    console.log('****** PROJECTS ********')
    /////////// END PROJECT //////////////


    //// START POSTS ////
    const posts = await cherche(api.posts);
    posts.data.map((element) => {
        const userNode = {
            id: `${element.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: `RestPosts`, 
            },
            children: [],
            slug: element.slug,
            status: element.slug,
            polylang_current_lang: element.polylang_current_lang,
            polylang_translations: {
                polylang_current_lang : element.polylang_translations.polylang_current_lang,
                slug : element.polylang_translations.slug,
            },
            title: element.title.rendered,
            date: element.date,
            link: element.link,
            type: element.type,
            acf : element.acf,
            content: element.content.rendered,
            excerpt: element.excerpt.rendered,
        }

        const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
        userNode.internal.contentDigest = contentDigest;

        createNode(userNode);
    });
    console.log('****** POST ********')
    /////////// END POSTS //////////////


    //// START PAGES ////
    const pages = await cherche(api.pages);
    pages.data.map((element) => {
        const userNode = {
            id: `${element.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: `RestPages`, 
            },
            children: [],
            date: element.date,
            title: element.title.rendered,
            slug: element.slug,
            link: element.link,
            excerpt: element.excerpt,
            status: element.slug,
            polylang_current_lang: element.polylang_current_lang,
            polylang_translations: {
                polylang_current_lang : element.polylang_translations.polylang_current_lang,
                slug : element.polylang_translations.slug,
            },
            acf : element.acf,
            sections: element.sections,
        }

        
        const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
        userNode.internal.contentDigest = contentDigest;

        createNode(userNode);
    });
    console.log('****** PAGES ********')
    /////////// END PAGES //////////////
    
    //// START CATEGORIES ////
    const categories = await cherche(api.categories);;
    categories.data.map((element) => {
        const userNode = {
            id: `${element.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: `RestCategory`, 
            },
            slug: element.slug,
            name: element.name,
            polylang_current_lang: element.polylang_current_lang,
            
        }

        const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
        userNode.internal.contentDigest = contentDigest;

        createNode(userNode);
    });
    console.log('****** CATEGORIES ********')
    //// END CATEGORIES ///

    /// START MENUS ////
    const menus = await cherche(api.menus)
    menus.data.map( async (e) => {
        let xo = await cherche(api.menus.concat(e.ID))
        let element = xo.data

        const userNode = {
            id: `${element.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: `RestMenus`, 
            },
            slug: element.slug,
            wordpress_id: element.id,
            name: element.name,
            count: element.count,
            items : element.items,
        }

        const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
        userNode.internal.contentDigest = contentDigest;

        createNode(userNode);
    })
    console.log('****** MENUS ********')
    console.log("==== It's not how you drive it's how you arrive...") 
    console.log("@_@")
    return;
}
