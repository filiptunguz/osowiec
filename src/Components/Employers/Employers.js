import React, {Component} from 'react';
import {Link} from "react-router-dom";

import './Employers.scss';
import axios from "axios";

class Employers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employers: []
        };
    }

    componentDidMount() {
        axios.get('https://osowiec.000webhostapp.com/getEmployers.php')
            .then(res => {
                this.setState({employers: res.data});
            })
    }

    render() {
        return (
            <div className='employers'>
                <h1>Zaposleni</h1>
                {this.state.employers.map((el, index) => {
                    return <Link
                        to={'/' + el.id + '/profil'}
                        key={el.id}
                    >
                        {el.firstName + ' ' + el.lastName}
                    </Link>;
                })}
            </div>
        );
    }
}

export default Employers;