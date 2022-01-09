import React, {Component, createRef} from 'react';

import './SelectionModal.scss';
import axios from "axios";
import RedirectIndex from "./RedirectIndex/RedirectIndex";

class SelectionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStyle: {
                display: 'none'
            },
            fullName: '',
            id_user: -1,
            options: [],
            id_switch: -1,
            id_shift: -1,
            date: '',
            shift: '',
        };
        this.redirectRef = React.createRef();

        this.modalVisibilityHandler = this.modalVisibilityHandler.bind(this);
        this.selectionChangeHandler = this.selectionChangeHandler.bind(this);
        this.switchWorkersInShift = this.switchWorkersInShift.bind(this);
    }

    modalVisibilityHandler() {
        this.setState({
            modalStyle: {
                display: 'none'
            },
            fullName: '',
            id_user: -1,
            options: [],
            id_switch: -1,
            date: '',
            shift: '',
        })
    }

    modalStateDisplayValueHandler(display, fullName, id, isWorker, id_shift, date, shift) {
        this.setState({
            modalStyle: {
                display: display
            },
            fullName: fullName,
            id_user: parseInt(id),
            id_shift: parseInt(id_shift),
            date: date,
            shift: shift,
        })

        if (isWorker !== null) {
            axios.get('https://osowiec.000webhostapp.com/getWorkersManagers.php?isWorker=' + isWorker)
                .then(res => {
                    this.setState({
                        options: res.data
                    })
                })
        } else {
            axios.get('https://osowiec.000webhostapp.com/getWorkersManagers.php')
                .then(res => {
                    this.setState({
                        options: res.data
                    })
                })
        }
    }

    selectionChangeHandler(event) {
        const id = event.target.value;

        this.setState({
            id_switch: parseInt(id),
        });
    }

    switchWorkersInShift() {
    	const id_shift = this.state.id_shift ? this.state.id_shift : null;
    	const id_user = this.state.id_switch;
    	const date = this.state.date;
    	const shift = this.state.shift + 1;
    	let url = 'https://osowiec.000webhostapp.com/switchWorkers.php?' +
            '&id_user=' + id_user +
            '&date=' + date +
            '&shift=' + shift;

    	if (id_shift) {
    	    url = url + '&id_shift=' + id_shift;
        }

    	axios.get(url)
    		.then(res => {
                this.redirectRef.current.click();
            })
    }

    render() {
        return (
            <div className="modal" style={this.state.modalStyle}>
                <div className="modal-overlay" onClick={this.modalVisibilityHandler}></div>
                <div className="modal-body">
                    <p>Zameni korisnika: {this.state.fullName}</p>
                    <div className="center-container">
                        <select name="exchange" id="exchange" onChange={this.selectionChangeHandler}>
                            <option>Obrisi zaposlenog:</option>
                            {
                                this.state.options.map((el, index) => {
                                    if (this.state.id_user !== parseInt(el['id'])) {
                                        return <option
                                            key={index}
                                            value={el['id']}>
                                            {el['fullName']}
                                        </option>
                                    }
                                })
                            }
                        </select>
                    </div>
                    <div className="buttons">
                        <button onClick={this.switchWorkersInShift}>Zameni</button>
                        <button onClick={this.modalVisibilityHandler}>Otkazi</button>
                    </div>
                </div>
                <RedirectIndex ref={this.redirectRef} />
            </div>
        );
    }
}

export default SelectionModal;