import axios from 'axios';

const KEY = 'AIzaSyAOpGMDqrVN2EV4_wEA7yHUsN0cHCvBwDI';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResult: 10,
        key: KEY
    }
})