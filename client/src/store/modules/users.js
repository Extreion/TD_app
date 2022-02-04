import axios from "axios";
import { throws } from "assert";


let URL = 'http://172.19.182.97:4545/';
//let URL = 'http://PA133237:4545/';
const users = {
    namespaced: true,
    state: {
        users: [],
        user: {},
    },
    mutations: {
        setUser(state, user) {
            if (user) {
                state.user = user
            }
        }
    },
    actions: {
        login({
            dispatch,
        }, login) {
            return new Promise((resolve, reject) => {
                axios
                    .post(URL.concat('/api/user/login/'), login)
                    .then((response, error) => {
                        if (response.data.success) {
                            localStorage.setItem("jwtToken", response.data.token)
                            dispatch("getUsers").then(() => {
                                resolve(response)
                            });
                        } else {
                            if (error) {
                                reject(error)
                            } else {
                                reject(response)
                            }
                        }
                    })
                    .catch((e) => {
                        reject(e)
                    });
            })
        },
    },
}

export default users