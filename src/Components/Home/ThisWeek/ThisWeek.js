import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react/swiper-react";


import 'swiper/swiper.scss';
import Shifts from "../../../Containers/Shifts";

const ThisWeek = (props) => {
	const days = ['Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja'];

	return (
		<div>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{days.map((el) => {
					return <SwiperSlide>
						<h3>{el}</h3>
						<Shifts />
					</SwiperSlide>
				})}
			</Swiper>
		</div>
	);
}

export default ThisWeek;
