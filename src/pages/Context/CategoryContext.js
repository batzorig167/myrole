import { useState } from "react"
const { createContext, useContext } = require("react");
const CategoryContext = createContext();

export const CategoryProvider = ({children})=>
{
    const [category,setCategory] = useState(0);
    const [catIndex,setCatindex] = useState(0);
    return <CategoryContext.Provider value={{category,setCategory,catIndex,setCatindex}}>
        {children}
    </CategoryContext.Provider>
}
export const useCategory = () => useContext(CategoryContext);