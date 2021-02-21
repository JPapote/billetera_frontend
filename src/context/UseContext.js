import {createContext, useState, useEffect} from 'react'
import { withRouter } from 'react-router';
export const UseContext = createContext();


const ContextProvider = (props) => {
    const [token, setToken] = useState('')
  

    
    const loginUser = (token) => {
        setToken(token)
        props.history.push('/cuenta')
    }
    
    const logoutUser = () => {
        setToken('')
        
    }

    
    useEffect(() => {
        const checkoutUser = () => {
            if(token){
                props.history.push('/cuenta')
        
            }else{
                props.history.push('/')
        
            }
               
            }
        checkoutUser()
    }, [token, props.history])

    return(
        <UseContext.Provider value={{token, loginUser, logoutUser}}>
            {props.children}
        </UseContext.Provider>
    )
}

export default withRouter(ContextProvider)