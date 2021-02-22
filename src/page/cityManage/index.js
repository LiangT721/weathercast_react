import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import { actionCreators as homepageActionCreactors } from '../homepage/store';
import { Link } from 'react-router-dom';
import './citypage-style.scss'

class CityManage extends Component {

	citySearchDisplay() {
		if (this.props.city_search_focus) {
			const city_search_list = this.props.city_search_display.toJS()
			return <ul className="city-search-display list-group position-absolute w-100 zindex-dropdown box-shadow"
			>
				{city_search_list.map((city, index) => {
					return <li className="list-group-item list-city"
						key={index}
						onClick={() => { this.props.addCity(city) }}
					>{city.formatted}</li>
				})
				}
			</ul>
		}

	}
	citySearchBg() {
		if (this.props.city_search_focus) {
			return <div className="city-search-display-bg"
				onClick={() => { this.props.inputBlur() }}>
			</div>
		}
	}

	EditButton() {
		if (this.props.ifEdit) {
			return <button className="btn btn-primary"
				onClick={() => { this.props.deleteList() }}>DELETE</button>
		}

		else {
			return <button className="btn btn-primary"
				onClick={() => { this.props.editList() }}>EDIT</button>
		}
	}

	render() {
		return (
			<div className="city-page position-relative"
			>	{this.citySearchBg()}
				<div className="input-row position-relative w-75 mx-auto pt-5">
					<div className="input-group"
					>
						<input
							type="text"
							className="form-control"
							placeholder="City Name"
							value={this.props.input_city}
							onChange={this.props.citySearch}
							onFocus={this.props.inputFocus}
						/>
						{this.EditButton()}
					</div>
					{this.citySearchDisplay()}
				</div>
				<ul className="city-list list-group px-1 pt-2"
					onClick={() => { this.props.inputBlur() }}
				>
					{this.props.citys_list_form.map((city, index) => {
						return <li className="city-row list-group-item row" key={index}>
							<span className='col-1'>
								<input className={this.props.ifEdit ? "select-show form-check-input me-1":"select-off form-check-input me-1"} type="checkbox" value={city.name} aria-label="..."
								onChange={this.props.deleteCitySelect}></input>
							</span>
							<Link className="link" to="/" >
								<span className="col-8"
									onClick={() => { this.props.selectCity(city) }}
								>{city.formatted}</span></Link>
							<Link className="link" to="/" >
								<span className="col-2 text-end"
									onClick={() => { this.props.selectCity(city) }}
								>{city.temp}°C</span>
							</Link>
						</li>
					})}
				</ul>
			</div>
		)
	}

	handleInputChange(e) {
		this.setState({
			search_city: e.target.value
		})
	}

	componentDidMount() {
		this.props.getCityListWithWeather()
	}
}

const mapStateToProps = (state) => {
	return {
		default_city_list: state.getIn(['location', 'default_city_list']).toJS(),
		citys_list_form: state.getIn(['cityManage', 'citys_list_form']).toJS(),
		city_search_focus: state.getIn(['cityManage', 'city_search_focus']),
		input_city: state.getIn(['cityManage', 'input_city']),
		city_search_display: state.getIn(['cityManage', 'city_search_display']),
		ifEdit: state.getIn(['cityManage', 'ifEdit'])
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getCityListWithWeather() {
			dispatch(actionCreators.getCityListWithWeather())
		},
		citySearch(e) {
			dispatch(actionCreators.citySearch(e.target.value))
		},
		inputFocus() {
			dispatch(actionCreators.inputFocus())
		},
		inputBlur() {
			dispatch(actionCreators.inputBlur())
		},
		addCity(data) {
			dispatch(actionCreators.addCity(data))
		},
		selectCity(data) {
			console.log(data)
			dispatch(homepageActionCreactors.setDefaultCity(data))
		},
		editList() {
			dispatch(actionCreators.editListTrue())
		},
		deleteCitySelect(e) {
			console.log(e.target.value)
			const city = e.target.value;
			dispatch(actionCreators.addDeletCity(city))
		},
		deleteList() {
			dispatch(actionCreators.confirmDeleteCity())
			// dispatch(actionCreators.editListFalse())
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CityManage); 