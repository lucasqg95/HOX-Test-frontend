import React , { useState }from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import api from '../../services/api'
import * as UserActions from '../../store/actions/user'

import FormLogin from '../../components/FormLogin/index'

import './style.scss'




function Login({ dispatch }){

    const histoty = useHistory()
    const [ hasLogError, setLogError ] = useState('')

    const HandleSubmit = async ({ hasEmail, hasPassword }) =>{


        try{
            const response = await api.post('/auth', {
                'email' : hasEmail,
                'password' : hasPassword
            })

            sessionStorage.setItem('token', response.data.token )

            dispatch(UserActions.userLog(true, response.data.token))
            
            histoty.push('/products')

        }catch(error) {
            setLogError(error.response.data)
        }
    
    }

    return(
        <div className="container-login">
            <div className="box-login">
                <FormLogin onSubmit={HandleSubmit} errorAlert={hasLogError} />
            </div>

        </div>
    )
}

export default connect()(Login)