const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState({
        class:"",
        buleg:"",
        lastName:"",
        firstName: "",
    });
    const [testUser, setTestUser] = useState(null);
    return <UserContext.Provider value={{user,setUser,testUser, setTestUser}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext);
