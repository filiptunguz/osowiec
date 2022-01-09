import React, {Component} from 'react';
import axios from "axios";
import {withRouter} from "react-router";

import './Profile.scss';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            employed: ''
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        axios.get('https://osowiec.000webhostapp.com/getUserInfoById.php?id=' + id)
            .then(res => {
                // setUser(res.data);
                this.setState({user: res.data});

                if (this.state.user.employed < 1) {
                    this.setState({employed:
                        <i>
                            <span className="notEmployed">Korisnik nije vise zaposlen!</span>
                        </i>
                    });
                } else {
                    this.setState({
                        employed:
                        <div>
                            <h2>Upisani dani:</h2>
                            <p>
                                <strong>Upisanih dana u godini: </strong>
                                {this.state.user.yearCount}
                            </p>
                            <p>
                                <strong>Upisanih dana u ovom mesecu: </strong>
                                {this.state.user.monthCount}
                            </p>
                            <p>
                                <strong>Trece smene ovog meseca: </strong>
                                {this.state.user.thirdCount}
                            </p>
                            <h2>Godisnji odmor:</h2>
                            <p>
                                <strong>Preostalo: </strong>
                                {parseInt(this.state.user.vacationDays) + parseInt(this.state.user.lastYearVacationDays)}
                            </p>
                            <p>
                                <strong>Od toga su proslogodisnji: </strong>
                                {this.state.user.lastYearVacationDays}
                            </p>
                        </div>
                    })
                }
            })
    }


    render() {
        return (
            <div className="profile">
                <h1>{this.state.user.firstName + ' ' + this.state.user.lastName}</h1>
                <p>
                    <strong>Mesto:</strong> {this.state.user.city}
                </p>
                <p>
                    <strong>Adresa:</strong> {this.state.user.address}
                </p>
                <p>
                    <strong>Pozicija:</strong> {this.state.user.engagement}
                </p>
                <p>
                    <strong>Email: </strong>
                    <a href={'mailto:' + this.state.user.email}>{this.state.user.email}</a>
                </p>
                <p>
                    <strong>Kontakt telefon: </strong>
                    <a href={'tel:' + this.state.user.phone}>{this.state.user.phone}</a>
                </p>
                {this.state.employed}
            </div>
        );
    }
}

export default withRouter(Profile);