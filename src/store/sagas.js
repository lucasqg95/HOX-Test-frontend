import { takeEvery, put, call, all, fork } from 'redux-saga/effects'
import api from '../services/api'

function* asyncGetProducts(action){
    
    const token = action.payload.token;
    const page = action.payload.page
    const headerParams = { Authorization: `Bearer ${token}` }

    
    try{
        const res = yield call(api.get, `/product?page=${page}`, {headers:headerParams})
    
        yield put({ type: 'RECEIVE_PRODUCTS', res})
    } catch (err){
        let errCheck = false
        yield put({ type: 'PRODUCTS_REQUEST_FAILED', errCheck })
    }
}

function* asyncPostProduct(action) {

    
    const token = action.payload.token;
    const data = action.payload.product;
    const headerParams = { Authorization: `Bearer ${token}` }
    
    const res = yield call(api.post, '/product', data ,{headers:headerParams})

    yield put({ type: 'ADD_PRODUCT', res})
}

function* asyncDeleteProduct(action){

    const token = action.payload.token;
    const index = action.payload.index;


    const config = {
        headers: {
            Authorization: `Bearer ${token}`
          },
          data: {
            productId: action.payload._id
          }
    }
    
    yield call(api.delete, '/product', config)

    yield put({ type: 'DELETE_PRODUCT', index})
}

function* asyncPutProduct(action) {

    
    const token = action.payload.token;
    const data = action.payload.product;
    const headerParams = { Authorization: `Bearer ${token}` }
    
    yield call(api.put, '/product', data ,{headers:headerParams})

}


function* sagaGetProducts(){
    yield takeEvery('ASYNC_GET_PRODUCTS', asyncGetProducts)
}

function* sagaPostProducts() {
    yield takeEvery('ASYNC_POST_PRODUCT', asyncPostProduct)
}

function* sagaDeleteProducts() {
    yield takeEvery('ASYNC_DELETE_PRODUCT', asyncDeleteProduct)
}

function* sagaPutProducts() {
    yield takeEvery('ASYNC_EDIT_PRODUCT', asyncPutProduct)
}

export default function* root(){

    yield all([ fork(sagaGetProducts), fork(sagaPostProducts), fork(sagaDeleteProducts), fork(sagaPutProducts) ])

}