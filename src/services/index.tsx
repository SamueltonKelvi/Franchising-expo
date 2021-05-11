import Axios from 'axios';

const Api = Axios.create({
    baseURL: 'https://processo.profranchising.com.br'
})

export default Api;