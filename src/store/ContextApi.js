import React, { useState } from "react"

const contextApi = React.createContext({
    token:'',
    isLogin:false,
    isLoginFunc:()=>{}
})

export const ContextProvider = (props)=>{
    const [token,setToken]= useState()
    const [isLogin,setIsLogin] = useState(false)
    const isLoginFuncHandler=(token)=>{
        setIsLogin(true)
        setToken(token)
    }
    console.log(token)
    console.log(isLogin)
    const ctxApi = {
        token:token,
        isLogin:isLogin,
        isLoginFunc:isLoginFuncHandler
    }
    return <contextApi.Provider value={ctxApi}>
        {props.children}
    </contextApi.Provider>
}

export default contextApi;