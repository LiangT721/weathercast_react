import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    home_display_weather: {
        day: "Day",
        date: "Date",
        description: "Description",
        temp: "temp",
        tempFeel: "tempFeel",
        main:"Clear"
    },
    current_display_weather: {
        day: "Day",
        date: "Date",
        description: "Description",
        temp: "temp",
        tempFeel: "tempFeel",
        main:"Clear"
    },
    home_display_city: "city",
    five_days_weather: [{
        day: "day1",
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
    },{
        day: "day2",
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
    },{
        day: "day3",
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
    },{
        day: "day4",
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
    },{
        day: "day5",
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
    }]
})

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_DEFAULT_CITY_NAME:
            return state.set("home_display_city", action.data)
        case actionTypes.SET_DEFAULT_CITY_WEATHER:
            return state.set("home_display_weather", action.data)
        case actionTypes.SET_CURRENT_WEATHER:
            return state.set("current_display_weather", action.data)
        case actionTypes.SET_FIVE_DAY_WEATHER:
            return state.set("five_days_weather",action.data)
    }
    
    return state
};

export default reducer;