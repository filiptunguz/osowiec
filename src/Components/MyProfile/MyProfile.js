import React, {Component} from 'react';
import Cookies from "universal-cookie/lib";

import './MyProfile.scss';

const cookies = new Cookies();

class MyProfile extends Component {
    render() {
        const user = this.props.user;

        return (
            <div className="my-profile">
                <h1>Moj Profil</h1>
                <h2>{user.firstName + ' ' + user.lastName}</h2>
                <p>
                    <strong>Mesto: </strong>
                    {user.city}
                </p>
                <p>
                    <strong>Adresa: </strong>
                    {user.address}
                </p>
                <p>
                    <strong>Radna pozicija: </strong>
                    {user.engagement}
                </p>
                <p>
                    <strong>Email: </strong>
                    <a href={'mailto:' + user.email}>{user.email}</a>
                </p>
                <p>
                    <strong>Broj telefona: </strong>
                    <a href={'tel:' + user.phone}>
                        {user.phone}
                    </a>
                </p>
                <h2>Upisani dani:</h2>
                <p>
                    <strong>Upisanih dana u godini: </strong>
                    {user.yearCount}
                </p>
                <p>
                    <strong>Upisanih dana u ovom mesecu: </strong>
                    {user.monthCount}
                </p>
                <p>
                    <strong>Trece smene ovog meseca: </strong>
                    {user.thirdCount}
                </p>
                <h3>Godisnji odmor:</h3>
                <p>
                    <strong>Preostalo: </strong>
                    {parseInt(user.vacationDays) + parseInt(user.lastYearVacationDays)}
                </p>
                <p>
                    <strong>Od toga su proslogodisnji: </strong>
                    {user.lastYearVacationDays}
                </p>
                <button onClick={this.props.logoutUser}>Izloguj se</button>
            </div>
        );
    }
}

export default MyProfile;