import { useAuthContext } from "./useAuthContext"

export const useLogOut = () =>{
    const { dispatch } = useAuthContext()
    
    const logout = () => {
        //remove the user from the storage first
        localStorage.removeItem('user')

        //dispatch the logout action from the auth context
        dispatch({type: 'LOGOUT'})

    }
    return {logout}
}