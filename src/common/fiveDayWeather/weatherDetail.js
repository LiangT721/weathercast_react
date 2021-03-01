import React, { Component } from 'react';

class WeatherDetail extends Component {
    render () {
        const detail = this.props.weather
    
        return (
            <div className={this.props.detail_show ? "detail-0 detail-frame row box-shadow" :"detail-Y detail-frame row box-shadow" } >
                <div className="line-bottom line-right col-6 py-3 text-center">
                    Heigh <br/> Temperature <br/> {detail.tempMax}°C </div>
                <div className="line-bottom col-6 py-3 text-center">Low <br/> Temperature <br/> {detail.tempMin}°C </div>
                <div className="line-bottom line-right col-6 py-3 text-center">Wind <br/> {detail.windSpeed}KM/H</div>
                <div className="line-bottom col-6 py-3 text-center">Pressure <br/> {detail.pressure}HPa</div>
                <div className="col-6 py-3 line-right text-center">Humidity <br/> {detail.humidity}%</div>
                <div className="col-6 py-3 text-center">UVI <br/> {detail.uvi}</div>
            </div>
        )
    }
}

export default WeatherDetail;