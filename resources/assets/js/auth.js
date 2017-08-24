import Vue from './app.js';
import { router } from './app.js';

export default {

    user: {

        authenticated: false,

        profile: null

    },

    register(context, name, email, password) {

        Vue.http.post('api/register', { name, email, password })
        .then(({ data }) => {
                
            context.success = true;
        
        }, ({ data }) => {
                
            context.response = data;
                
            context.error = true;

        });
    }
}