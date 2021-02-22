import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { actionCreators as fiveDaysWeatherActionCreators} from '../fiveDayWeather/store';
import { actionCreators as homepageActionCreators} from '../../page/homepage/store';
import "./style.scss"

class CurrentWeather extends Component {
    
    render() {
        const { default_city ,home_display_day,home_display_date,home_display_temp,home_display_tempFeel,home_display_description, detail_show} = this.props
        return (
                <div className={detail_show ? 'current-weather-0 container row mx-auto align-content-center' : 'current-weather-Y container row mx-auto align-content-center'} 
                onClick={()=>{
                    this.props.detailHide()
                }}
                >
                    <div className="home_display_cityname col-12 text-center fs-1 fw-bolder text-shadow py-2">{default_city}</div>
                    <div className="home_display_day col-6 text-center ps-5 fs-5 text-shadow">{home_display_day}</div>
                    <div className="home_display_day col-6 fs-5 text-shadow">{home_display_date}</div>
                    <div className="home_display_description col-12 text-center fs-1 fw-bolder text-shadow py-2">{home_display_description}</div>
                    <div className="home_display_temp col-12 text-center fs-1 fw-bolder text-shadow">{home_display_temp}°C</div>
                    <div className="home_display_temp col-12 text-center fs-5 fw-bold text-shadow">Feels like: {home_display_tempFeel}°C</div>
                </div>
        )
    }

}


const mapStateToProps = (state) => {
    const currentWeather = state.getIn(['homepage', 'home_display_weather']).toObject();
    return {
        default_city:state.getIn(['homepage', 'home_display_city']),
        detail_show: state.getIn(['fiveDayWeather', 'detail_show']),
        home_display_day: currentWeather.day,
        home_display_date: currentWeather.date,
        home_display_temp: currentWeather.temp,
        home_display_tempFeel: currentWeather.tempFeel,
        home_display_description: currentWeather.description,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeIftoday() {
            dispatch(actionCreators.ChangeIfToday());
        },
        detailHide() {
            dispatch(homepageActionCreators.setBackCurrentWeather());
            dispatch(fiveDaysWeatherActionCreators.detailHide());
        }
       
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);