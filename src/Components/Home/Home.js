import React, {Component} from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";
import Shifts from '../../Containers/Shifts';

// Import Swiper styles
import 'swiper/swiper.scss';
import './Home.scss';
import ThisWeek from "./ThisWeek/ThisWeek";
import NextWeek from "./NextWeek/NextWeek";

class Home extends Component {
	render() {
		return (
			<div className="Home">
				<h1>Raspored zaposlenih lica:</h1>
				<h2>Tekuca nedelja</h2>
				<ThisWeek />
				<h2>Naredna nedelja</h2>
				<NextWeek />
			</div>
		);
	}
}

export default Home;
