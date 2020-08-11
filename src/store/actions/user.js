export function userLog( isLogged, authToken ){
    return{
        type: 'SIGN_IN',
        isLogged,
        authToken
    }
}
