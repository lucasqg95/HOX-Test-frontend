import React, { useState } from 'react'


import './style.scss'

function FormLogin ( { onSubmit, errorAlert } ){

    const [ hasEmail, setEmail ] = useState('')
    const [ hasPassword, setPassword ] = useState('')

    
    async function HandleSubmit(e){
        e.preventDefault()
        
        await onSubmit({
            hasPassword,
            hasEmail,
        })

        
    }

    return(
        <form onSubmit={HandleSubmit}>
            <div className="form-container">
                
                <h2>Login to your account</h2>

                <div className="form-input-block">
                    <input 
                        className="input-email"
                        type="email" 
                        placeholder="your@email.com" 
                        value={hasEmail}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-input-block">
                    <input 
                        className="input-password"
                        type="password" 
                        placeholder="Password"
                        value={hasPassword}
                        onChange={ e => setPassword(e.target.value)}   
                        required
                    />
                </div>

                <span>{errorAlert.error}</span>

                <div className="form-button">
                    <button type="submit">LOGIN</button>
                </div>
            </div>
        </form>
    )
}

export default FormLogin