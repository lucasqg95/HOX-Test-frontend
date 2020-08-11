
export function isCreateProduct( isCreate ){
    return{
        type: 'IS_CREATE_PRODUCT',
        payload: {
            isCreate
        }
    }
}

export function isEditProduct( isEdit ){
    return{
        type: 'IS_EDIT_PRODUCT',
        payload: {
            isEdit
        }
    }
}

export function sortProducts( key ){
    return{
        type: 'SORT_PRODUCTS',
        payload: {
            key
        }
    }
}


export function editProduct( product, token ){
    return{
        type: 'ASYNC_EDIT_PRODUCT',
        payload: {
            product,
            token
        }
    }
}

export function deleteProduct( _id  , token , index){
    return{
        type: 'ASYNC_DELETE_PRODUCT',
        payload: {
            _id,
            token,
            index
        }
    }
}

export function postProduct( product , token ){
    return{
        type: 'ASYNC_POST_PRODUCT',
        payload: {
            product,
            token
        }
    }
}

export function getProducts( token, page ){
    return{
        type: 'ASYNC_GET_PRODUCTS',
        payload:{
            token,
            page
        }
    }
}