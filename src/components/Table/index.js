import React, { useState } from 'react'
import { connect } from 'react-redux'

import * as ProductActions from '../../store/actions/products'
import EditProduct from '../EditProduct/index'

import './style.scss'
import editIcon from '../../assets/tableIcons/edit.svg'
import deleteIcon from '../../assets/tableIcons/bin.svg'

//Table o display de produtos, carrengado do banco e monstrando de 10 em 10 itens
//Filtros com ordem crescente

function Table({ data, isEdit, token, deleteProduct, isEditProduct, sortProducts, page }) {

    const [hasProduct, setProduct] = useState({})
    const [isButtonActive, setButtonActive] = useState('')
    let numIndex = (page - 1) * 10;

    function dateToBR(date) {
        return date.split('-').reverse().join('/');
    }


    return (
        <>
            <table className="content-table">
                <thead>
                    <tr>
                        <th>
                            <button
                                className={isButtonActive === "name" ? "active" : ''}
                                onClick={() => {
                                    sortProducts('name')
                                    setButtonActive('name')
                                }}>
                                Nome
                            </button>
                        </th>
                        <th>
                            <button
                                className={isButtonActive === "perishable" ? "active" : ''}
                                onClick={() => {
                                    sortProducts('perishableProduct')
                                    setButtonActive('perishable')
                                }}>
                                Perecível
                            </button>
                        </th>
                        <th>
                            <button
                                className={isButtonActive === "manufact" ? "active" : ''}
                                onClick={() => {
                                    sortProducts('manufacturingDate')
                                    setButtonActive('manufact')
                                }}>
                                Fabricação
                            </button>
                        </th>
                        <th>
                            <button
                                className={isButtonActive === "expiration" ? "active" : ''}
                                onClick={() => {
                                    sortProducts('expirationDate')
                                    setButtonActive('expiration')
                                }}>
                                Validade
                            </button>
                        </th>
                        <th>
                            <button
                                className={isButtonActive === "price" ? "active" : ''}
                                onClick={() => {
                                    sortProducts('price')
                                    setButtonActive('price')
                                }}>
                                Preço
                                </button>
                        </th>
                        <th>Opção</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (Object.keys(data).length > 0) && data.map((record, index) =>
                            <tr key={record._id}>
                                <td>{record.name}</td>
                                <td>{record.perishableProduct ? "Sim" : "Não"}</td>
                                <td>{dateToBR(record.manufacturingDate.substring(0, 10))}</td>
                                <td>{record.expirationDate ? dateToBR(record.expirationDate.substring(0, 10)) : ""} </td>
                                <td>{record.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                <td style={{ display: "flex" }}>
                                    <button onClick={() => {
                                        isEditProduct(true)
                                        setProduct(record)
                                    }} ><span><img src={editIcon} alt="Editar" /></span></button>
                                    <button onClick={() => deleteProduct(record._id, token, index + numIndex)}><span><img src={deleteIcon} alt="Excluir" /></span></button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {isEdit && <div className="modal-create-product">
                <EditProduct target={hasProduct} />
            </div>}
        </>
    )
}

const mapStateToProps = state => ({
    isEdit: state.products.isEdit,
    token: state.user.authToken
})

const mapDispatchToProps = dispatch => ({
    editProduct: (record) => dispatch(ProductActions.editProduct(record)),
    deleteProduct: (record_id, token, index) => dispatch(ProductActions.deleteProduct(record_id, token, index)),
    isEditProduct: (isEdit) => dispatch(ProductActions.isEditProduct(isEdit)),
    sortProducts: (key) => dispatch(ProductActions.sortProducts(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(Table)