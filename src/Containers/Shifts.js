import React, {Component} from 'react';
import axios from "axios";
import Cookies from "universal-cookie/lib";
import {withRouter} from "react-router";
import SvgIcons from "./SvgIcons";
import {findAllByDisplayValue} from "@testing-library/react";

const cookies = new Cookies();

class Shifts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            shifts: {
                firstShift: [[], []],
                secondShift: [[], []],
                thirdShift: [[], []]
            },
            visibleShift: ''
        };
        this.getShift = this.getShift.bind(this);
        this.isMarked = this.isMarked.bind(this);
        this.goToUsersProfile = this.goToUsersProfile.bind(this);
    }

    componentDidMount() {
        this.updateShiftsHandler();
    }

    updateShiftsHandler() {
        const url = 'https://osowiec.000webhostapp.com/getShifts.php?date=' + this.props.date;

        axios.get(url)
            .then(res => {
                this.setState({
                    user: this.props.user,
                    shifts: {
                        firstShift: res.data.firstShift,
                        secondShift: res.data.secondShift,
                        thirdShift: res.data.thirdShift,
                    }
                });
            })
    }

    getShift(key) {
        let employer = this.state.shifts[Object.keys(this.state.shifts)[key]];
        return employer;
    }

    isMarked(shift, workerManager, i) {
        if (this.getShift(shift)[workerManager][i]) {
            return cookies.get('userApiKey') === this.getShift(shift)[workerManager][i][1][0]['userApiKey']
        }
    }

    goToUsersProfile(shift, workerManager, i) {
        const id = this.getUsersOrShiftsId(shift, workerManager, i, false);
        this.props.history.push(this.isMarked(shift, workerManager, i) ? '/moj-profil' : '/' + id + '/profil');
    }

    getUsersOrShiftsId(shift, workerManager, i, isShift) {
        let id = isShift ? 'id_shift' : 'id';
        if (this.getShift(shift)[workerManager][i]) {
            return this.getShift(shift)[workerManager][i][1][0][id] ?
                this.getShift(shift)[workerManager][i][1][0][id] :
                null;
        } else {
            return null;
        }
    }

    editWorkerHandler(shift, i, fullName, id, isWorker) {
        let workerManager = isWorker ? 0 : 1;
        let id_shift = this.getUsersOrShiftsId(shift, workerManager, i, true);

        this.props.modalVisibilityHandler(fullName, id, isWorker, id_shift, shift);
    }

    removeWorkerHandler(id_shift) {
        const url = 'https://osowiec.000webhostapp.com/deleteUserFromShift.php?id_shift=' + id_shift;

        axios.get(url)
            .then(res => {
                this.props.history.push('/index');
            })
    }

    setVisibleShift(shift) {
        this.setState({
            visibleShift: shift
        })
    }

    render() {
        let workers = 0;
        let managers = 0;

        Object.keys(this.state.shifts).map((key, index) => {
            if (this.state.shifts[key][0].length > workers) {
                workers = this.state.shifts[key][0].length;
            }
            if (this.state.shifts[key][1].length > managers) {
                managers = this.state.shifts[key][1].length;
            }
        });

        const makeEmployersRow = (isWorker, i) => {
            let workerManager = isWorker ? 0 : 1;
            let length = isWorker ? workers : managers;
            let rows = [];
            for (let i = 0; i < length; i++) {
                rows[i] = <tr key={i}>
                    <td>{isWorker ? 'Radnik' : 'Menadzer'}</td>
                    <td className={this.isMarked(0, workerManager, i) ? 'marked pointer' : 'pointer'}>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(0, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        0, i,
                                        this.getShift(0)[workerManager][i][0],
                                        this.getUsersOrShiftsId(0, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="trash"/> : null
                        }
                        <a onClick={() => this.goToUsersProfile(0, workerManager, i)}>
                            {
                                !this.getShift(0)[workerManager][i] ?
                                    '-' :
                                    this.getShift(0)[workerManager][i][0]
                            }
                        </a>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(0, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        0, i,
                                        this.getShift(0)[workerManager][i][0],
                                        this.getUsersOrShiftsId(0, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="edit"/> : null
                        }
                    </td>
                    <td className={this.isMarked(1, workerManager, i) ? 'marked pointer' : 'pointer'}>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(1, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        0, i,
                                        this.getShift(1)[workerManager][i][0],
                                        this.getUsersOrShiftsId(1, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="trash"/> : null
                        }
                        <a onClick={() => this.goToUsersProfile(1, workerManager, i)}>
                            {
                                !this.getShift(1)[workerManager][i] ?
                                    '-' :
                                    this.getShift(1)[workerManager][i][0]
                            }
                        </a>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(1, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        1, i,
                                        this.getShift(1)[workerManager][i] ? this.getShift(1)[workerManager][i][0] : null,
                                        this.getUsersOrShiftsId(1, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="edit"/> : null
                        }
                    </td>
                    <td className={this.isMarked(2, workerManager, i) ? 'marked pointer' : 'pointer'}>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(2, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        0, i,
                                        this.getShift(2)[workerManager][i][0],
                                        this.getUsersOrShiftsId(2, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="trash"/> : null
                        }
                        <a onClick={() => this.goToUsersProfile(2, workerManager, i)}>
                            {
                                !this.getShift(2)[workerManager][i] ?
                                    '-' :
                                    this.getShift(2)[workerManager][i][0]
                            }
                        </a>
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <SvgIcons
                                    removeWorkerHandler={() => this.removeWorkerHandler(
                                        this.getUsersOrShiftsId(2, workerManager, i, true)
                                    )}
                                    editWorkerHandler={() => this.editWorkerHandler(
                                        2, i,
                                        this.getShift(2)[workerManager][i] ? this.getShift(2)[workerManager][i][0] : null,
                                        this.getUsersOrShiftsId(2, workerManager, i, false),
                                        isWorker
                                    )}
                                    type="edit"/> : null
                        }
                    </td>
                </tr>
            }
            return rows;
        }

        return (
            <div className="shifts-table">
                {this.props.date}

                {/* Desktop */}
                <table>
                    <thead>
                    <tr>
                        <th>Pozicija</th>
                        <th>Prva smena:</th>
                        <th>Druga smena:</th>
                        <th>Treca smena:</th>
                    </tr>
                    </thead>
                    <tbody>
                    {makeEmployersRow(true).map(el => el)}
                    {makeEmployersRow(false).map(el => el)}
                    {
                        this.state.user.role === 'ROLE_MANAGER' ?
                            <tr>
                                <td>Dodaj</td>
                                <td>
                                    <button onClick={
                                        () => this.props.modalVisibilityHandler(null, null, null, null, 0)
                                    }>+</button>
                                </td>
                                <td>
                                    <button onClick={
                                        () => this.props.modalVisibilityHandler(null, null, null, null, 1)
                                    }>+</button>
                                </td>
                                <td>
                                    <button onClick={
                                        () => this.props.modalVisibilityHandler(null, null, null, null, 2)
                                    }>+</button>
                                </td>
                            </tr> : null
                    }
                    </tbody>
                </table>

                {/* Mobile */}
                <div className="mobile-shifts">
                    <div className='mob-shift' onClick={() => this.setVisibleShift('first')}>Prva smena:</div>
                    <div className={this.state.visibleShift === 'first' ? 'visible-shift first-shift' : 'first-shift'}>
                        {this.state.shifts.firstShift[0].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(0, 0, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {this.state.shifts.firstShift[1].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(0, 1, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <button onClick={
                                    () => this.props.modalVisibilityHandler(null, null, null, null, 0)
                                }>+</button> : null
                        }
                    </div>
                    <div className='mob-shift' onClick={() => this.setVisibleShift('second')}>Druga smena:</div>
                    <div className={this.state.visibleShift === 'second' ? 'visible-shift second-shift' : 'second-shift'}>
                        {this.state.shifts.secondShift[0].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(1, 0, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {this.state.shifts.secondShift[1].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(1, 1, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <button onClick={
                                    () => this.props.modalVisibilityHandler(null, null, null, null, 1)
                                }>+</button> : null
                        }
                    </div>
                    <div className='mob-shift' onClick={() => this.setVisibleShift('third')}>Treca smena:</div>
                    <div className={this.state.visibleShift === 'third' ? 'visible-shift third-shift' : 'third-shift'}>
                        {this.state.shifts.thirdShift[0].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(2, 0, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {this.state.shifts.thirdShift[1].map((element, index) => {
                            return <div className="user">
                                <a onClick={() => this.goToUsersProfile(2, 1, index)}>{element ? element[0] : null}</a>
                            </div>
                        })}
                        {
                            this.state.user.role === 'ROLE_MANAGER' ?
                                <button onClick={
                                    () => this.props.modalVisibilityHandler(null, null, null, null, 2)
                                }>+</button> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Shifts);
