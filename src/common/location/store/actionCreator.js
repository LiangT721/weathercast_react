import store from '../../../store'
import * as actionTypes from "./constants";
import { actionCreators } from '../../../page/homepage/store'
import { fromJS } from 'immutable';
import cookie from 'react-cookies'


export const cityDisplayChange = (data) => {
    return (dispatch) => {
        const state = store.getState();
        const city = state.getIn(['location', 'default_city_list']).toJS()[data];
        dispatch(actionCreators.setDefaultCity(city))
    }
}

export const saveCityList = (data) => {
    return (dispatch) => {
        cookie.save("cityList", data)
        const action = {
            type: actionTypes.SAVE_CITY_LIST,
            data: fromJS(data)
        }
        dispatch(action)
    }
}

export const addCityList = (data) => {
    return (dispatch) => {
        const state = store.getState();
        const city = state.getIn(['location', 'default_city_list']).toJS()
        city.push(data)
        // cookie.save("cityList", city)
        dispatch(saveCityList(city))

    }
}