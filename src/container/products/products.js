import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import * as ProductActions from '../../store/actions/products'
import Table from '../../components/Table/index'
import CreateProduct from '../../components/CreateProduct/index'

import './style.scss'

function Products({ hasProducts, token, getProducts, pageLimit, isCreate, isCreateProduct }){

    const [ hasPage, setPage ] = useState([0, 10])
    const [ isPageActual, setPageActual ] = useState(1)

    function nextPage(){
        if(hasProducts.length > hasPage[1]){
            setPage([hasPage[0]+10 , hasPage[1]+10])
            setPageActual(isPageActual+1)
            
        }else if(pageLimit){
                setPageActual(isPageActual+1)
                getProducts(token, isPageActual)
        }

        if(pageLimit){
            setPage([hasPage[0]+10 , hasPage[1]+10])
            
            getProducts(token, isPageActual+1)
        }
    }

    
    function prevPage(){
        if(hasPage[0]-10 >= 0){
            setPage([hasPage[0]-10 , hasPage[1]-10])
            setPageActual(isPageActual-1)
        }
            
    }

    useEffect(()=>{

        getProducts(token)

    },[getProducts, token])

    return(
        <div className="container-products">
            <div className="box-products">
                <div className="content-products">
                    <h2>Produtos</h2>
                    { hasProducts && <Table data={hasProducts.slice(hasPage[0], hasPage[1])} page={isPageActual}/> }
                    <div className="page-products">
                        <button type="button" onClick={()=>{prevPage()}}>Anterior</button>
                        <button className="important-button" type="button" onClick={()=>{ isCreateProduct(!isCreate)}}>Criar Produto</button>
                        <button type="button" onClick={()=>{nextPage()}}>Próximo</button>
                    </div>
                </div>
            </div>

            <div className="modal-create-product" style={{ display: isCreate ? 'flex' : 'none'}}>
                <CreateProduct />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    hasProducts: state.products.products,
    isCreate : state.products.isCreate,
    pageLimit : state.products.pageLimit,
    token: state.user.authToken,
})

const mapDispatchToProps = dispatch => ({
    getProducts:(token, page) => dispatch(ProductActions.getProducts(token, page)),
    isCreateProduct:(isCreate) => dispatch(ProductActions.isCreateProduct(isCreate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)