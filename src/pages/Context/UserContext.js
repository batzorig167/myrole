const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState(null);
    
    return <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
}

export const useUser = () => useContext(UserContext);
