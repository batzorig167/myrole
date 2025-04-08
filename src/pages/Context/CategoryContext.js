import { useState } from "react"
const { createContext, useContext } = require("react");
const CategoryContext = createContext();

 const CategoryProvider = ({children})=>
{
    const [category,setCategory] = useState(0);
    const [catIndex,setCatindex] = useState(0);
    const [catChall,setCatchall] = useState(0);
    return <CategoryContext.Provider value={{category,setCategory,catIndex,setCatindex,catChall,setCatchall}}>
        {children}
    </CategoryContext.Provider>
}

export default CategoryProvider;
export const useCategory = () => useContext(CategoryContext);