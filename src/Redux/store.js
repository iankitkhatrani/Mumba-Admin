import {configureStore} from "@reduxjs/toolkit"
import CurrentPageReducer from "./Features/CurrentPageDataSlice/CurrentPageDataSlice.js"
export default configureStore({
    reducer:{
      newCurrentPage:CurrentPageReducer
    }
})