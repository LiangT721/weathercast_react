import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import "./homepage-style.scss"
import CurrentWeather from '../../common/currentWeather';
import Location from '../../common/location';
import FiveDayWeather from '../../common/fiveDayWeather'
import cookie from 'react-cookies'



class HomePage extends Component {
    componentDidMount() {

        this.props.loadingCookiesCityList();
    }

    background() {
        switch (this.props.home_display_main) {
            case "Clear":
                return <div className="homePage-bgimg default-bg"></div>;

            case "Clouds":
                return <div className="homePage-bgimg clouds-bg"></div>;

            case "Mist":
                return <div className="homePage-bgimg mist-bg"></div>;

            case "Rain":
                return <div className="homePage-bgimg rainy-bg"></div>;

            case "Snow":
                return <div className="homePage-bgimg snowy-bg"></div>;

            case "Haze":
                return <div className="homePage-bgimg haze-bg"></div>;

            case "Wind":
                return <div className="homePage-bgimg windy-bg"></div>;
            case "Storm":
                return <div className="homePage-bgimg storm-bg"></div>;

            default:
                break;
        }
    }

    render() {
        return (
            <div className="homePage container-fliuid">
                {this.background()}
                {/* <div className="homePage-bgimg default-bg"></div> */}
                <Location />
                <CurrentWeather />
                <FiveDayWeather />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const currentWeather = state.getIn(['homepage', 'home_display_weather']).toObject();
    return {
        default_city_list: state.getIn(['location', 'default_city_list']).toJS(),
        home_display_city: state.getIn(['homepage', 'home_display_city']),
        home_display_main: currentWeather.main,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadingCookiesCityList() {
            console.log()
            dispatch(actionCreators.loadingCookiesCityList())
        },
        setDefaultCity(city) {
            dispatch(actionCreators.setDefaultCity(city));
            console.log(city)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);