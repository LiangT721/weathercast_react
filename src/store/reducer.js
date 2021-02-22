import { combineReducers } from 'redux-immutable';
import { reducer as currentWeatherReducer } from "../common/currentWeather/store";
import { reducer as locationReducer } from "../common/location/store";
import { reducer as homepageReducer } from "../page/homepage/store";
import { reducer as cityManageReducer } from "../page/cityManage/store";
import { reducer as fiveDayWeatherReducer } from "../common/fiveDayWeather/store";


const reducer = combineReducers({
    currentWeather: currentWeatherReducer,
    location: locationReducer,
    homepage: homepageReducer,
    cityManage: cityManageReducer,
    fiveDayWeather: fiveDayWeatherReducer ,

});

export default reducer;