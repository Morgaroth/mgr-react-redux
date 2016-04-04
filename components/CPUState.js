import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from "../actions";

import Algorithm from "../components/algorithm/Algorithm";


class CPUState extends Component {
    render() {
        console.log("CPUState: has props:" + JSON.stringify(this.props));
        const {cpuState, algorithms} = this.props;
        return (
            <div>
                <Algorithm registerSize={5} gates={algorithms[cpuState.id] || []}/>
            </div>
        )
    }
}

CPUState.propTypes = {
    cpuState: PropTypes.object.isRequired,
    algorithms: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    console.log("CPUState: received state " + JSON.stringify(state));
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CPUState)
