import React, { useState } from "react"

const contextApi = React.createContext({
    items:[],
    addItemsFunction:()=>{},
    deleteItemsFunction:()=>{}
})
export const ContextProvider = (props)=>{
    const [items,setItems] = useState([])
    const addItemsFunction=(item)=>{
        var ind = items.findIndex(itm => itm.id === item.id)
        if(ind>=0){
            items[ind].todo = item.todo;
            setItems([...items])
            return;
        }
        const updatedItems = [...items,item]
        setItems(updatedItems)
    }   
    const deleteItemsFunction=(id)=>{
        const ind = items.findIndex(item=>item.id===id)
        items.splice(ind,1)
        setItems([...items])
    }
    const context = {
        items,
        addItemsFunction,
        deleteItemsFunction
    }
    return <contextApi.Provider value={context}>{props.children}</contextApi.Provider>
}
export default contextApi;