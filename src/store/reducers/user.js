
const INITIAL_STATE = {
    authToken: sessionStorage.getItem('token') || '',
    isLogged: sessionStorage.getItem('token') ? true : false
}

export default function users(state = INITIAL_STATE , action){

    if(action.type === 'SIGN_IN'){
        return { ...state, isLogged: action.isLogged, authToken: action.authToken }
    }

    return state
}