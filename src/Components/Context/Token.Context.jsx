import { createContext, useState } from "react";

export const tokenContext=createContext(0)

export default function TokenProvider({children}){
    const [userToken, setUserToken]=useState(localStorage.getItem('userToken'));

    function logout(){
        setUserToken(null)
        localStorage.removeItem('userToken')
    }
    return <tokenContext.Provider value={{userToken,setUserToken ,logout}}>
        {children}

    </tokenContext.Provider>
}