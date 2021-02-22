import { fromJS } from 'immutable';
import * as actionTypes from './constants';

const defaultState = fromJS({
    detail_show:false,
    home_display_detail: {
        day: "day",
        date: "date",
        description: "description",
        temp: "temp",
        tempMax: "tempMax",
        tempMin: "tempMin",
        tempFeel: "tempFeel",
        windSpeed: "windSpeed",
        pressure: "pressure",
        humidity: "humidity",
        uvi: "uvi",
    }
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.DAY_DETAIL_SELECT:
            return state.set("home_display_detail", action.data)    
        case actionTypes.DETAIL_SHOW:
            return state.set("detail_show", true)    
        case actionTypes.DETAIL_HIDE:
            return state.set("detail_show", false)    
        default:
            break;
    }

    return state;
};

export default reducer;