import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as ProductActions from '../../store/actions/products'

import CurrencyInput from '../Inputs/InputCurrencyBR/index'

import './style.scss'

function CreateProducts({ token, isCreateProduct , postProduct}){

    const [ hasName, setName ] = useState('')
    const [ isPerishable, setPerishable ] = useState(false)
    const [ hasManufactDate, setManufactDate ] = useState('') 
    const [ hasExpirationDate, setExpirationDate ] = useState('') 
    const [ hasPrice, setPrice ] = useState(0)

    const [ hasType, setType ] = useState({
        manufact : 'text',
        expiration : 'text'
    })

    function HandleSubmite(e) {
        e.preventDefault()

        const data = {
            name: hasName,
	        manufacturingDate: hasManufactDate,
	        perishableProduct: isPerishable,
	        expirationDate: hasExpirationDate,
	        price: hasPrice
        }

        postProduct(data , token)
        isCreateProduct(false)

    }

    function HandleCurrency({ value }){
        setPrice(value)
    }

    return (
        <div className="box-create-product">
            <div className="content-create-product">
                <strong>Criar Produto</strong>

                <form onSubmit={HandleSubmite}>
                    <div className="form-input-block">
                        <input 
                            className="form-input"
                            type="text" 
                            placeholder="Nome do Produto"
                            value={hasName}
                            onChange={ e => setName(e.target.value)}   
                            required        
                        />
                    </div>

                    <div className="form-input-block">
                        <input 
                            className="form-input-checkbox"
                            type="checkbox" 
                            value={isPerishable}
                            onChange={()=> {
                                setPerishable(!isPerishable)
                            }}
                        />
                        <label htmlFor="Perecível">Perecível</label>
                    </div>

                    <div className="form-input-block">
                        <input 
                            className="form-input"
                            type={hasType.manufact} 
                            placeholder="Data de fabricação" 
                            value={hasManufactDate}
                            onChange={ e => setManufactDate(e.target.value)} 
                            onFocus={()=> setType({...hasType, manufact: 'date'})} 
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                            required
                        />
                    </div>

                    <div className="form-input-block">
                        <input 
                            className="form-input"
                            type={hasType.expiration} 
                            placeholder="Data de validade" 
                            value={hasExpirationDate}
                            onChange={ e => setExpirationDate(e.target.value)} 
                            disabled={!isPerishable} 
                            onFocus={()=> setType({...hasType, expiration: 'date'})} 
                            min={hasManufactDate}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        />
                    </div>

                    <div className="form-input-block">

                        <CurrencyInput 
                            className="form-input" 
                            value={hasPrice}
                            onSubmit={HandleCurrency}
                            required     
                        />
                       
                    </div>
                    
                    <div className="button-create-product">
                        <button type="button" onClick={()=>{isCreateProduct(false)}}>Cancelar</button>
                        <button className="important-button" type="submit">Criar</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    token: state.user.authToken
})

const mapDispatchToProps = dispatch => ({
    postProduct:( product , token ) => dispatch(ProductActions.postProduct( product, token )),
    isCreateProduct:(isCreate) => dispatch(ProductActions.isCreateProduct(isCreate))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateProducts)