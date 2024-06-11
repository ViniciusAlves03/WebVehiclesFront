import api from "../utils/api";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFlashMessage from "./useFlashMessage";

export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function registerStore(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/store/register', user).then((response) => {
                return response.data
            })

            await authStore(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function register(user) {

        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'sucess'

        try {
            const data = await api.post('/client/register', user).then((response) => {
                return response.data
            })

            await authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate(`/client/login`)
    }

    async function authUserLogin(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))

        navigate(`/client/page/${data.clientId}`)
    }

    async function authStore(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))
        console.log(data)
        navigate(`/store/login`)
    }

    async function authStoreLogin(data){

        setAuthenticated(true)

        localStorage.setItem('token', JSON.stringify(data.token))
        console.log(data)
        navigate(`/store/page/${data.clientId}`)
    }

    async function login(user, type){
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'sucess'

        try {

            const data = await api.post('/client/login', user).then((response) => {
                return response.data
            })

            await authUserLogin(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
    }

    async function loginStore(user){
        let msgText = 'Login realizado com sucesso!'
        let msgType = 'sucess'

        try {

            const data = await api.post('/store/login', user).then((response) => {
                return response.data
            })

            await authStoreLogin(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }
    }

    function logout(){
        let msgText = 'Logout realizado com sucesso!'
        let msgType = 'sucess'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, logout, login, loginStore, registerStore}
}
