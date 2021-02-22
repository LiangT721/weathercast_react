import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    city_input_focus: false,
    default_city_list: [
        {
            name: "Calgary",
            formatted: "Calgary, AB, Canada",
            geometry: {
                lat: "51.05011",
                lng: "-114.08529"
            }
        },
        {
            name: "Nanjing",
            formatted: "Nanjing, Jiangsu Sheng, China",
            geometry: {
                lat: "32.06167",
                lng: "118.77778"
            }
        },
        {
            name: "Beijing",
            formatted: "Beijing, Beijing Shi, China",
            geometry: {
                lat: "39.9075",
                lng: "116.39723"
            }
        },
    ],
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CITY_INPUT_FOCUS:
            return state.set('city_input_focus', action.value);
        case actionTypes.CITY_INPUT_BLUR:
            return state.set('city_input_focus', action.value);
        case actionTypes.SAVE_CITY_LIST:
            return state.set('default_city_list', action.data);
        default:
            break;
    }
    return state
};

export default reducer;