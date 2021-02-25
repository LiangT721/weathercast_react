import * as actionTypes from './constants';
import axios from 'axios';
import { actionCreators as locationActionCreators } from '../../../common/location/store';
import { fromJS } from "immutable";
import store from '../../../store'
import cookie from 'react-cookies'


export const setDefaultCityName = (cityName) => ({
    type: actionTypes.SET_DEFAULT_CITY_NAME,
    data: cityName,
});

export const setHomeDisplayWeather = (data) => ({
    type:actionTypes.SET_DEFAULT_CITY_WEATHER,
    data: fromJS(data),
}
)
export const setCurrentWeather = (data) => ({
    type:actionTypes.SET_CURRENT_WEATHER,
    data: fromJS(data),
})

export const loadingCookiesCityList = () => {
    return (dispatch) => {
        const state = store.getState();
        let cityList = cookie.load("cityList");
        console.log(cityList)
        if (cityList == undefined){
            cityList = state.getIn(['location',"default_city_list"]).toJS()
        } else {
            dispatch(locationActionCreators.saveCityList(cityList))
        }

        // const state = store.getState();
        // let cityList = state.getIn(['location',"default_city_list"]).toJS()
        // console.log(cityList)
        // if (cookie.load("cityList") != "undefined"){
        //     console.log(cookie.load("cityList"))
        //     cityList = cookie.load("cityList")
        // }
        console.log(cityList)
        console.log(cityList[0])
        const defaultCity = cityList[0];
        const home_display_city = state.getIn(['homepage', 'home_display_city'])
        console.log(home_display_city)
        console.log(defaultCity)
        if(home_display_city === "city"){
            dispatch(setDefaultCity(defaultCity))
        }
        }
}

export const settingCurrentWeather = (data) => {
    return (dispatch) => {
        let fullDate = new Date(data.dt * 1000);
        let day = fullDate.toLocaleString('en-us', { weekday: 'long' })
        let date = String(fullDate).slice(4, 15);
        let temp = Math.round((data.temp - 273.15) * 10) / 10;
        let tempFeel = Math.round((data.feels_like - 273.15) * 10) / 10;
        let home_display_weather = {
            day: day,
            date: date,
            description: data.weather[0].description,
            main: data.weather[0].main,
            temp: temp,
            tempFeel: tempFeel,
        }
        dispatch(setHomeDisplayWeather(home_display_weather))
        dispatch(setCurrentWeather(home_display_weather))
    }
}
export const settingFiveDayWeather = (fiveDayData) => {
    return (dispatch) => {
        let fiveDayWeather = [];
        for (let index = 0; index < 5; index++) {
            const data = fiveDayData[index];
            let fullDate = new Date(data.dt * 1000);
            let day = fullDate.toLocaleString('en-us', { weekday: 'long' })
            let date = String(fullDate).slice(4, 15);
            let temp = Math.round((data.temp.day - 273.15) * 10) / 10;
            let tempMax = Math.round((data.temp.max - 273.15) * 10) / 10;
            let tempMin = Math.round((data.temp.min - 273.15) * 10) / 10;
            let tempFeel = Math.round((data.feels_like.day - 273.15) * 10) / 10;
            let windSpeed = data.wind_speed
            let pressure = data.pressure
            let humidity = data.humidity
            let uvi = data.uvi
            let single_day_weather = {
                day: day,
                date: date,
                description: data.weather[0].description,
                main: data.weather[0].main,
                temp: temp,
                tempMax: tempMax,
                tempMin: tempMin,
                tempFeel: tempFeel,
                windSpeed: windSpeed,
                pressure: pressure,
                humidity: humidity,
                uvi: uvi,
            }
            fiveDayWeather.push(single_day_weather)
        }
        const action = {
            type: actionTypes.SET_FIVE_DAY_WEATHER,
            data:fromJS(fiveDayWeather)
        }
        dispatch(action)
    }
}

export const setDefaultCity = (city) => {
    return (dispatch) => {
        console.log(city)
        const cityName = city.name;
        dispatch(setDefaultCityName(cityName))
        const lat = city.geometry.lat;
        const lng = city.geometry.lng;
        let path = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely&appid=c5af052cc8ce6d245bf6a7497799037e";
        axios.get(path).then((res) => {
            const currenData = res.data.current;
            dispatch(settingCurrentWeather(currenData))
            const fiveDayData = res.data.daily
            dispatch(settingFiveDayWeather(fiveDayData))
        }).catch((res) => {
            console.log(res)
        })
    }
}

export const setBackCurrentWeather = () =>{
    return (dispatch) =>{
        const state = store.getState();
        const currentWeather = state.getIn(['homepage', 'current_display_weather']).toJS()
        dispatch(setHomeDisplayWeather(currentWeather));
    }
}

