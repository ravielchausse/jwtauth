import Vue from './app.js';
import { router } from './app.js';

export default {

    user: {

        authenticated: false,

        profile: null

    },

    check () {

        let token = localStorage.getItem('id_token');

        if (token !== null) {

            Vue.http.get(`api/user?token=${token}`)
            .then(({ data }) => {

                this.user.authenticated = true

                this.user.profile = data.data

            });
        }
    },

    register (context, name, email, password) {

        Vue.http.post('api/register', { name, email, password })
        .then(({ data }) => {
                
            context.success = true;
        
        }, ({ data }) => {
                
            context.response = data;
                
            context.error = true;

        });
    },

    signin(context, email, password) {

        Vue.http.post('api/signin', { email, password })
        .then(({ data }) => {

            context.error = false;

            localStorage.setItem('id_token', data.meta.token);

            Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

            this.user.authenticated = true;

            this.user.profile = data.data;

            router.push({ name: 'dashboard' });

        }, ({ data }) => {

            context.error = true;

        });
    },

    signout() {

        localStorage.removeItem('id_token');

        this.user.authenticated = false;

        this.user.profile = null;

        router.push({ name: 'home' });

    }

}
