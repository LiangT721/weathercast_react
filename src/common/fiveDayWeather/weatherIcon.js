import React, { Component } from "react";
import clear from './asset/Clear.png'
import Clouds from './asset/Clouds.png'
import haze from './asset/haze.png'
import mist from './asset/mist.png'
import rain from './asset/rain.png'
import Snow from './asset/Snow.png'
import Wind from './asset/Wind.png'
import storm from './asset/storm.png'


class WeatherIcon extends Component {

    Icon (data) {
        switch (data) {
            case "Clear":
                return <img className='weather-icon px-1 pt-3 pb-0' src={clear}></img> 
            case "Snow":
                return <img className='weather-icon px-1 pt-3 pb-0' src={Snow}></img> 
            case "Clouds":
                return <img className='weather-icon px-1 pt-3 pb-0' src={Clouds}></img> 
            case "Rain":
                return <img className='weather-icon px-1 pt-3 pb-0' src={rain}></img> 
        
            default:
                break;
        }
    }

    render () {
        return (
            <div className="px-1">
                {this.Icon(this.props.main)}
            </div>
        )
    }
}
{/* */}
export default WeatherIcon;