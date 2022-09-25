import axios from 'axios';
import * as actionTypes from './constants';
import { fromJS } from "immutable";
import store from "../../../store";
import { actionCreators as locationActionCreactors } from '../../../common/location/store';
import cookie from 'react-cookies'



export const setCitysListForm = (data) => ({
    type: actionTypes.SET_CITYS_LIST_FORM,
    data: fromJS(data)
})

export const inputCityChange = (data) => ({
    type: actionTypes.INPUT_CITY_CHANGE,
    data
})

export const citySearchDisplay = (data) => ({
    type: actionTypes.CITY_SEARCH_DISPLAY,
    data: fromJS(data)
})

export const inputFocus = () => ({
    type: actionTypes.CITY_INPUT_FOCUS,
})

export const inputBlur = () => ({
    type: actionTypes.CITY_INPUT_BLUR,
})

export const editListTrue = () => ({
    type: actionTypes.EDIT_CITYLIST_TRUE
})
export const editListFalse = () => ({
    type: actionTypes.EDIT_CITYLIST_FALSE
})

export const getCityListWithWeather = () => {
    return (dispatch) => {
        const state = store.getState();
        let data = cookie.load("cityList");
        if (data == undefined){
            data = state.getIn(['location',"default_city_list"]).toJS()
        } else {
            dispatch(locationActionCreactors.saveCityList(data))
        }
        for (let i = 0; i < data.length; i++) {
            const city = data[i];
            const lat = city.geometry.lat;
            const lng = city.geometry.lng;
            let path = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely&appid=c5af052cc8ce6d245bf6a7497799037e";
            axios.get(path).then((res) => {
                const currenData = res.data.current;
                let temp = Math.round((currenData.temp - 273.15) * 10) / 10;
                data[i].temp = temp
                dispatch(setCitysListForm(data))
            }).catch((res) => {
                console.log(res)
            })
        }
    }
}

export const citySearch = (data) => {
    return (dispatch) => {
        dispatch(inputCityChange(data))
        console.log(data)
        let path = "https://api.opencagedata.com/geocode/v1/json?q=URI-ENCODED-" + data + "&key=24af578530cd40c19a1ac3fc3e7ca782";
        axios.get(path).then((res) => {
            if (res.data.results[0]) {
                dispatch(citySearchDisplay(res.data.results))
            }
        })
    }
}

export const addCity = (data) => {
    return (dispatch) => {
        dispatch(inputBlur())
        let city = {
            name: data.components.town,
            formatted: data.formatted,
            geometry: {
                lat: data.geometry.lat,
                lng: data.geometry.lng
            }
        }
        dispatch(locationActionCreactors.addCityList(city))

        const lat = city.geometry.lat;
        const lng = city.geometry.lng;
        let path = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&exclude=minutely&appid=c5af052cc8ce6d245bf6a7497799037e";
        axios.get(path).then((res) => {
            const currenData = res.data.current;
            let temp = Math.round((currenData.temp - 273.15) * 10) / 10;
            city.temp = temp
            console.log(city)
            const state = store.getState();
            let new_city_list_form = state.getIn(['cityManage', 'citys_list_form']).toJS()
            new_city_list_form.push(city)
            console.log(new_city_list_form)
            dispatch(setCitysListForm(new_city_list_form))
        }).catch((res) => {
            console.log(res)
        })

    }
}

export const addDeletCity = (city) => {
    return (dispatch) => {
        const state = store.getState();
        const deleteCityList = state.getIn(['cityManage', 'deleteCityList']).toJS();
        deleteCityList.push(city);
        const action = {
            type: actionTypes.SET_DELET_CITY_LIST,
            data: fromJS(deleteCityList),
        }
        dispatch(action)
    }
}

export const confirmDeleteCity = () => {
    return (dispatch) => {
        dispatch(editListFalse())
        const state = store.getState();
        const deleteCityList = state.getIn(['cityManage', 'deleteCityList']).toJS();
        let city_list_form = state.getIn(['cityManage', 'citys_list_form']).toJS()
        for (let i = 0; i < city_list_form.length; i++) {
            const element = city_list_form[i];
            console.log(element)
            for (let j = 0; j < deleteCityList.length; j++) {
                const deletCityName = deleteCityList[j];
                if (element.name == deletCityName){
                    city_list_form.splice(i,1)
                    deleteCityList.splice(j,1)
                    console.log(deleteCityList)
                }        
            }
            console.log(city_list_form)
        }
        dispatch(setCitysListForm(city_list_form))
        dispatch(locationActionCreactors.saveCityList(city_list_form))
    }
}


