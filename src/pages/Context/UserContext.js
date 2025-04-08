const { createContext, useContext, useState } = require("react");

const UserContext = createContext();

 const UserProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [testUser, setTestUser] = useState(null);
    return <UserContext.Provider value={{user,setUser,testUser, setTestUser}}>
        {children}
    </UserContext.Provider>
}
export default UserProvider;
export const useUser = () => useContext(UserContext);
