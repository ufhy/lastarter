import axios from 'axios'

export default () => {
    const instance = axios.create({
        // baseURL: ufhy.API_URL,
        // withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    instance.defaults.withCredentials = true;
    instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    instance.interceptors.response.use(
        response => {
            return response
        },
        function(error) {
            // const { status, statusText } = error.response;
            // if (status === 405) {
            //     // VUE.$router.push({
            //     //     name: 'dashboard.index'
            //     // });
            //     // VUE.$coresnackbars.error('Code: ' + status + ' ' + statusText);
            //     // VUE.$toasted.error('Please refresh your browser!');
            // } else if (status === 403) {
            //     window.location.href = ufhy.SITE_URL;
            // }
            // if (error.response.data.message) {
            //     VUE.$coresnackbars.error(error.response.data.message, {y: 'bottom'});
            // }
            return Promise.reject(error.response)
        }
    );

    return instance
};
