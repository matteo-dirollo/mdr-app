import axios from 'axios';

const KEY = process.env.REACT_APP_YT;

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResult: 10,
        key: KEY
    }
})