

const INITIAL_STATE = {
    isCreate: false,
    isEdit:false,
    pageLimit: true,
    products : []
}

export default function products(state = INITIAL_STATE , action){

  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
        return { ...state, products: [...state.products.concat(action.res.data)] }

    case 'ADD_PRODUCT':
        if(state.pageLimit){
            return { ...state }
        }else{
            return { ...state, products: [...state.products, action.res.data ] }    
        }
    
    case 'SORT_PRODUCTS':
        const sortByKey = key => (a, b) => a[key] > b[key] ? 1 : -1

        const sortByDate = key => (a, b) => convertDate(a[key], b[key]) > 0 ? 1 : -1

        function convertDate ( a, b){
            return new Date(a) - new Date(b)
        }

        let newStateOfProducts = state.products.slice().sort(sortByKey(action.payload.key))

        if( action.payload.key === 'manufacturingDate' || action.payload.key === 'expirationDate')
            newStateOfProducts = state.products.slice().sort(sortByDate(action.payload.key))

        return {...state, products: newStateOfProducts }

    case 'DELETE_PRODUCT':
        return { ...state, products: [...state.products.slice(0, action.index), ...state.products.slice(action.index + 1)] }

    case 'IS_CREATE_PRODUCT':
        return { ...state, isCreate: action.payload.isCreate }
    
    case 'IS_EDIT_PRODUCT':
        return { ...state, isEdit: action.payload.isEdit }

    case 'PRODUCTS_REQUEST_FAILED':
        return { ...state, pageLimit: action.errCheck }

    default:
        return state
  }

}