import React, { useState } from "react"

const contextApi = React.createContext({
    token:'',
    isLogin:false,
    isLoginFunc:()=>{},
    isLogoutFunc:()=>{}
})

export const ContextProvider = (props)=>{
    const localToken = localStorage.getItem("token")
    const [isLogin,setIsLogin] = useState(!!localToken)

    const isLoginFuncHandler=(token)=>{
        localStorage.setItem("token",token)
        setIsLogin(true)
    }
    const isLogOutFuncHandler = ()=>{
        localStorage.removeItem("token")
        setIsLogin(false)
    }
    const ctxApi = {
        token:localToken,
        isLogin:isLogin,
        isLoginFunc:isLoginFuncHandler,
        isLogoutFunc:isLogOutFuncHandler
    }
    return <contextApi.Provider value={ctxApi}>
        {props.children}
    </contextApi.Provider>
}

export default contextApi;