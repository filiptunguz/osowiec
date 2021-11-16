import {useState} from "react";
import React from 'react';
import {SwiperSlide} from "swiper/react/swiper-react";
import axios from "axios";

const Shifts = (props) => {
	let workers = 0;
	let managers = 0;

	let shifts = {
		// Get from Database where shift = 1, date = props.date
		firstShift: [
			['Radnik#1', 'Radnik#2', 'Radnik#3'],
			['Nebo']
		],
		secondShift: [
			['Radnik#4', 'Radnik#5', 'Radnik#6', 'Radnik#7', 'Radnik#8'],
			['Atila', 'Maja']
		],
		thirdShift: [
			['Radnik#9', 'Radnik#10'],
			['Nemanja']
		],
	}

	Object.keys(shifts).map((key, index) => {
		if (shifts[key][0].length > workers) {
			workers = shifts[key][0].length;
		}
		if (shifts[key][1].length > managers) {
			managers = shifts[key][1].length;
		}
	});

	const getShift = (key) => {
		let employer = shifts[Object.keys(shifts)[key]];
		return employer;
	}

	const makeEmployersRow = (isWorker, i) => {
		let workerManager = isWorker ? 0 : 1;
		let length = isWorker ? workers : managers;
		let rows = [];
		for (let i = 0; i < length; i++) {
			rows[i] = <tr>
				<td>{isWorker ? 'Radnik' : 'Menadzer'}</td>
				<td>
					{getShift(0)[workerManager][i] ? getShift(0)[workerManager][i] : '-'}
				</td>
				<td>
					{getShift(1)[workerManager][i] ? getShift(1)[workerManager][i] : '-'}
				</td>
				<td>
					{getShift(2)[workerManager][i] ? getShift(2)[workerManager][i] : '-'}
				</td>
			</tr>
		}
		return rows;
	}

	const testAjax = () => {
		let json = JSON.stringify({
			email: 'filip@filip.com',
			password: '12345'
		});
		axios.post('http://localhost/osowiec/login.php', json)
			.then(res => {
				console.log(res.data.email);
			})
	}

	return (
		// <table>
		// 	<thead>
		// 		<tr>
		// 			<th>Pozicija</th>
		// 			<th>Prva smena:</th>
		// 			<th>Druga smena:</th>
		// 			<th>Treca smena:</th>
		// 		</tr>
		// 	</thead>
		// 	<tbody>
		// 		{makeEmployersRow(true).map(el => el)}
		// 		{makeEmployersRow(false).map(el => el)}
		// 	</tbody>
		// </table>
		<button onClick={testAjax}>CLICK ME</button>
	);
}

export default Shifts;
