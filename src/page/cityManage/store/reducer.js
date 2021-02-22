import { fromJS } from  "immutable";
import * as actionTypes from './constants';


const defaultState = fromJS({
    citys_list_form:[],
    search_city: "",
    input_city:"",
    city_search_display:[],
    city_search_focus:false,
    ifEdit:false,
    deleteCityList:[],
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_CITYS_LIST_FORM:
            return state.set("citys_list_form", action.data);
        case actionTypes.INPUT_CITY_CHANGE:
            return state.set("input_city", action.data);
        case actionTypes.CITY_INPUT_FOCUS:
            return state.set("city_search_focus", true);
        case actionTypes.CITY_INPUT_BLUR:
            return state.set("city_search_focus", false);
        case actionTypes.EDIT_CITYLIST_TRUE:
            return state.set("ifEdit", true);
        case actionTypes.EDIT_CITYLIST_FALSE:
            return state.set("ifEdit", false);
        case actionTypes.CITY_SEARCH_DISPLAY:
            return state.set("city_search_display",action.data)    
        case actionTypes.SET_DELET_CITY_LIST:
            return state.set("deleteCityList",action.data)    
        default:
            break;
    }

    return state
}

export default reducer;