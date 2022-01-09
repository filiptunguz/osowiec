import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";


import 'swiper/swiper.scss';
import Shifts from "../../../Containers/Shifts";

const ThisWeek = (props) => {

	const days = ['Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja'];
	let weekDays = [];

	// Get monday of this week
	let monday = new Date();
	if (monday.getDay() > 1) {
		monday = new Date(monday.getTime() - ((monday.getDay() - 1) * 24 * 60 * 60 * 1000));
	} else if (monday.getDay() === 0) {
		monday = new Date(monday.getTime() - (6 * 24 * 60 * 60 * 1000));
	}

	for (let i = 0; i < 7; i++) {
		const dayInWeek = new Date(monday.getTime() + (i * 24 * 60 * 60 * 1000));

		// Format date
		let day = '';
		let month = '';
		const year = dayInWeek.getFullYear();

		// Format day
		if (dayInWeek.getDate() < 10) {
			day = '0' + dayInWeek.getDate();
		} else {
			day = dayInWeek.getDate();
		}

		// Format month
		if ((dayInWeek.getMonth() + 1) < 10) {
			month = '0' + (dayInWeek.getMonth() + 1);
		} else {
			month = (dayInWeek.getMonth() + 1);
		}

		const formatDate = day + '.' + month + '.' + year + '.';

		weekDays.push(formatDate);
	}

	return (
		<div>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
			>
				{days.map((el, index) => {
					return <SwiperSlide key={index} >
						<h3>{el}</h3>
						<Shifts
							user={props.user}
							modalVisibilityHandler={(fullName, id, isWorker, id_shift, shift) => props.modalVisibilityHandler(fullName, id, isWorker, id_shift, weekDays[index], shift)} date={weekDays[index]} />
					</SwiperSlide>
				})}
			</Swiper>
		</div>
	);
}

export default ThisWeek;
