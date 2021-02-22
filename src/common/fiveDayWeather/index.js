import React, { Component } from 'react';
import { connect } from "react-redux";
import { actionCreators } from './store';
import "./fiveDayWeather-style.scss"
import WeatherIcon from "./weatherIcon";
import WeatherDetail from './weatherDetail';

class FiveDayWeather extends Component {

  render() {
    return (
      <div className="five-day-frame">
        <div className={this.props.detail_show ? "icon-0 row" : " icon-Y row"

        }>
          <div className="col-1 mx-0"></div>
          {this.props.five_days_weather.map((item, index) => {
            const day_weather = item.toJS()
            const day_short = day_weather.day.slice(0, 3)
            return <div
              key={day_weather.day}
              className="single-day col-2 px-0 mx-0">
              <div className="five-days-day col-12 px-0 pb-3 text-center text-uppercase fw-bold text-shadow">{day_short}</div>
              <div className="frame mx-1 px-0 row"
                onClick={() => { this.props.daySelect(index) }}
              >
                <WeatherIcon
                  main={day_weather.main}
                />
                <div className="temp text-center px-0">{day_weather.temp}°C</div>
              </div>
            </div>
          })}
          <div className="col-1 mx-0"></div>
        </div>
        <WeatherDetail weather={this.props.home_display_detail}
          detail_show={this.props.detail_show} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    five_days_weather: state.getIn(['homepage', 'five_days_weather']),
    home_display_detail: state.getIn(['fiveDayWeather', 'home_display_detail']).toObject(),
    detail_show: state.getIn(['fiveDayWeather', 'detail_show'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    daySelect(index) {
      dispatch(actionCreators.dayDetailSelect(index))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FiveDayWeather);