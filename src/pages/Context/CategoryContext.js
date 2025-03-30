import { useState } from "react"
const { createContext, useContext, useState } = require("react");
const CategoryContext = createContext();

export const CategoryProvider = ({children})=>
{
    const [category,setCategory] = useState({})
    return <CategoryContext.Provider value={{category,setCategory}}>
        {children}
    </CategoryContext.Provider>
}
export const useCategory = () => useContext(CategoryContext);