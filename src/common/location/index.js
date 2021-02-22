import React, { Component } from 'react';
import { connect } from 'react-redux';
import './location-style.scss';
import { actionCreators } from "./store"
import { Link } from 'react-router-dom';


class Location extends Component {
	
	render() {
		return (
			<div className=" city-input-row m-auto row">
				<div className="mx-0 col-9 px-0">
					<select className="form-select mx-0" 
					name="" 
					onChange={this.props.citySelect}
					id="">
						{this.getCitylist()}
					</select>
				</div>
				<Link className="link col-3 btn btn-primary px-0" to="/city">
				Add City
				</Link>
			</div>
		)
	}
	getCitylist() {
		return this.props.default_city_list.map((city, index) => {
			return (
				<option
					key={index}
					value={index}				
				>{city.formatted}</option>
				
			)
		})
	}
	
	
}

const mapStateToProps = (state) => {
	return {
		default_city_list: state.getIn(['location', 'default_city_list']).toJS()
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		citySelect(e) {
			console.log(e.target.value)
			const city_index = e.target.value
			dispatch(actionCreators.cityDisplayChange(city_index))
		},

	}
}
// console.log(this.props.default_city_list)

export default connect(mapStateToProps, mapDispatchToProps)(Location);