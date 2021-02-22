import * as actionTypes from "./constants";
import { fromJS } from 'immutable';
import store from '../../../store';
import { actionCreators as homepageActionCreators }from '../../../page/homepage/store'

export const setHomeDisplayDetail = (data) => ({
    type:actionTypes.DAY_DETAIL_SELECT,
    data: fromJS(data)
})

export const detailShow = () =>({
    type:actionTypes.DETAIL_SHOW,
})
export const detailHide = () =>({
    type:actionTypes.DETAIL_HIDE,
})

export const dayDetailSelect = (data) => {
    return(dispatch) => {
        const state = store.getState();
        const five_days_weather = state.getIn(['homepage', 'five_days_weather']).toJS()
        const detail_day_select = five_days_weather[data];
        dispatch(setHomeDisplayDetail(detail_day_select))
        dispatch(homepageActionCreators.setHomeDisplayWeather(detail_day_select))
        dispatch(detailShow())

    }
}