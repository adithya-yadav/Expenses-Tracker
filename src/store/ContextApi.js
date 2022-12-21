import React, { useEffect, useState } from "react"

const contextApi = React.createContext({
    token:'',
    isLogin:false,
    isLoginFunc:()=>{},
    isLogoutFunc:()=>{},
    expenses:[],
    addExpenseFunc:()=>{},
    totalAmount:0
})

export const ContextProvider = (props)=>{
    const localToken = localStorage.getItem("token")
    const [isLogin,setIsLogin] = useState(!!localToken)
    const [expenses,setExpenses] = useState([])
    const [totalAmount , setTotalAmount] = useState(0)
    const localEmail = localStorage.getItem("email")

    const isLoginFuncHandler=(token,email)=>{
        localStorage.setItem("token",token)
        localStorage.setItem("email",email.replace("@","").replace(".","").replace(".",""))
        setIsLogin(true)
    }
    const isLogOutFuncHandler = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        setIsLogin(false)
    }
    useEffect(()=>{
        const getExpense = async()=>{
            try{
                const res = await fetch(`https://myweblink-6a02d-default-rtdb.firebaseio.com/${localEmail}.json`)
                const data = await res.json()
                if(res.ok){
                    let tempArr = [];
                    let tempAmount = 0;
                    for(const key in data){
                        tempArr.push(data[key])
                        tempAmount+=data[key].amount
                    }
                    setExpenses(tempArr)
                    setTotalAmount(tempAmount)
                }else{
                    throw new Error(data.error.message)
                }
            }catch(err){
                alert(err.message)
            }
        }
        getExpense()
    },[])
    const addExpenseFuncHandler = async(expense)=>{
        try{
            const response = await fetch(`https://myweblink-6a02d-default-rtdb.firebaseio.com/${localEmail}.json`,{
                method:"POST",
                body:JSON.stringify(expense),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await response.json()
            if(response.ok){

            }else{
                throw new Error(data.error.message)
            }
        }catch(error){
            return alert(error.message)
        }
        const updatedExpense = [...expenses,expense]
        setExpenses(updatedExpense)
        const updateAmount = totalAmount+expense.amount
        setTotalAmount(updateAmount)
    }

    const ctxApi = {
        token:localToken,
        isLogin:isLogin,
        isLoginFunc:isLoginFuncHandler,
        isLogoutFunc:isLogOutFuncHandler,
        expenses:expenses,
        addExpenseFunc:addExpenseFuncHandler,
        totalAmount:totalAmount
    }
    return <contextApi.Provider value={ctxApi}>
        {props.children}
    </contextApi.Provider>
}

export default contextApi;