import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-project-10da5.firebaseio.com/'
});

export default instance;