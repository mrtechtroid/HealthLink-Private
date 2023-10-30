import {writable} from "svelte/store"

export const authStore = writable({
    user:null,
    loading:true,
    data: {}
})

export const authHandler = {
    signup: async function(email,password,re_password){
        // Sign Up function
    },
    signin: async function(email,password){
        // Sign In function
    },
    logout: async function(){
        // Log Out Function
    }
}