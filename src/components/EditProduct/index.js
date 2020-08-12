import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as ProductActions from '../../store/actions/products'

import CurrencyInput from '../Inputs/InputCurrencyBR/index'

import '../CreateProduct/style.scss'

function EditProducts({ target, token, isEditProduct, editProduct }){

    const [ hasName, setName ] = useState(target ? target.name : '')
    const [ isPerishable, setPerishable ] = useState(target ? target.perishableProduct : false)
    const [ hasManufactDate, setManufactDate ] = useState(target ? target.manufacturingDate.substring(0,10) : '') 
    const [ hasExpirationDate, setExpirationDate ] = useState(target.expirationDate ? target.expirationDate.substring(0,10) : '') 
    const [ hasPrice, setPrice ] = useState(target ? target.price : 0 )

    const [ hasType, setType ] = useState({
        manufact : 'text',
        expiration : 'text'
    })

    function HandleSubmite(e) {
        e.preventDefault()

        const data = {
            productId: target._id,
            name: hasName,
	        manufacturingDate: hasManufactDate,
	        perishableProduct: isPerishable,
	        expirationDate: hasExpirationDate,
	        price: hasPrice
        }

        editProduct(data, token)
        isEditProduct(false)

        
    }

    function HandleCurrency({ value }){
        setPrice(value)
    }

    return (
        <div className="box-create-product">
            <div className="content-create-product">
                <strong>Editar Produto</strong>

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
                            checked={isPerishable}
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
                        <button type="button" onClick={()=>{isEditProduct(false)}}>Cancelar</button>
                        <button className="important-button" type="submit">Concluir</button>
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
    isEditProduct: (isEdit) => dispatch(ProductActions.isEditProduct(isEdit)),
    editProduct: (product, token) => dispatch(ProductActions.editProduct(product, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts)