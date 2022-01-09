import React, {Component} from 'react';

// Import Swiper styles
import 'swiper/swiper.scss';
import './Home.scss';
import ThisWeek from "./ThisWeek/ThisWeek";
import NextWeek from "./NextWeek/NextWeek";
import SelectionModal from "./SelectionModal/SelectionModal";

class Home extends Component {
    constructor(props) {
        super(props);
        this.selectionModal = React.createRef();

        this.modalVisibilityHandler = this.modalVisibilityHandler.bind(this);
    }

    modalVisibilityHandler(fullName, id, isWorker, id_shift, date, shift) {
        this.selectionModal.current.modalStateDisplayValueHandler('flex', fullName, id, isWorker, id_shift, date, shift);
    }

    render() {
        return (
            <div className="Home">
                {
                    this.props.user.role ?
                        <div>
                            <h1>Raspored zaposlenih lica:</h1>
                            <h2>Tekuca nedelja</h2>
                            <ThisWeek
                                user={this.props.user}
                                modalVisibilityHandler={(fullName, id, isWorker, id_shift, date, shift) => this.modalVisibilityHandler(fullName, id, isWorker, id_shift, date, shift)}/>
                            {/*<h2>Naredna nedelja</h2>*/}
                            {/*<NextWeek modalVisibilityHandler={this.modalVisibilityHandler}/>*/}
                            <SelectionModal ref={this.selectionModal} updateShiftsHandler={this.updateShiftsHandler}/>
                        </div> :
                        <p>Morate biti ulogovani kako biste videli sadrzaj!</p>
                }
            </div>
        );
    }
}

export default Home;
