const axios = require('axios');
const { Console } = require('console');
const crypto = require('crypto');

/* async function test(){
   
   const api = {
      projects : `https://admin.pascalegirardin.art/wp-json/wp/v2/projects?per_page=100&page=1` ,
      posts : `https://admin.pascalegirardin.art/wp-json/wp/v2/posts` ,
      pages : `https://admin.pascalegirardin.art/wp-json/wp/v2/pages` ,
      categories : `https://admin.pascalegirardin.art/wp-json/wp/v2/categories` ,
      menus : `https://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus/`,
      media1 : `https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=100&page=1`,
      media2 : `https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=100&page=2`,
      media3 : `https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=100&page=3`,
      media4 : `https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=100&page=4`,
      media5 : `https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=100&page=5`,
   }
   const cherche = (x) => axios.get(x)

   const media1 = await cherche(api.media1)
   const media2 = await cherche(api.media2)
   //const media3 = await cherche(api.media3)
   //const media4 = await cherche(api.media4)
   //const media5 = await cherche(api.media5)
   console.log(await cherche(api.media))
   // merge all media
   const media = media1.data.concat(media2.data)
   console.log(media)
} */


async function getMediaChunk(x) {
   try {
      const response = await axios.get(`https://admin.pascalegirardin.art/wp-json/wp/v2/media?per_page=50&page=${x}`);
      return response
   } catch (error) {
      if (error.response) {
         let x = [{data: 'gardes la peche'}]
         return x
      }
   }
}

// getUser until it returns null
async function getMedia(){
   let x = 1
   let xo = 1
   let y = []
   let z = await getMediaChunk(x)
   while (z.data !== undefined){
      y = y.concat(z.data)
      // combinie two arrays
      x++
      z = await getMediaChunk(x)
   }
   //console.log("et pis that's it oui")
   //console.log(`number of medias object === ${y.length}`)
   return y
}

let xox = await.getMedia()

console.log(xox)