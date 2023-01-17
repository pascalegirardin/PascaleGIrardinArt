import axios from 'axios'

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
async function getMedia(){
    let x = 1
    let xo = 1
    let y = []
    let z = await getMediaChunk(x)
    while (z.data !== undefined){
        y = y.concat(z.data)
        x++
        z = await getMediaChunk(x)
    }
    return y
}

async function cherche(params ){
    try {
        if(params === 'menus'){
            const response = await axios.get(`https://admin.pascalegirardin.art/wp-json/wp-api-menus/v2/menus`);
            const data = response.data
            return data
        }
        const response = await axios.get(`https://admin.pascalegirardin.art/wp-json/wp/v2/${params}`);
        const data = response.data
        return data
    }
    catch (error) {
        if (error.response) {
            let x = [{data: 'gardes la peche'}]
            return error.response.data
        }
    }
}

export { cherche, getMedia}