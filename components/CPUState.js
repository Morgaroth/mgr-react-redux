import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import Algorithm from "../components/algorithm/Algorithm";


class CPUState extends Component {
    render() {
        const {cpu, algorithms, enabled} = this.props;
        if (enabled) {
            return (
                <div>
                    <Algorithm registerSize={cpu.size} gates={algorithms[cpu.id] || []}/>
                </div>)
        } else {
            return <div></div>
        }
    }
}

CPUState.propTypes = {
    cpuState: PropTypes.object.isRequired,
    algorithms: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    const selected = state.serverState.selected;
    return Object.assign({}, state, {
        enabled: selected != 'undefined' && selected != null,
        cpu: state.serverState.cpus[(state.serverState.cpus.map((x) => x.id).indexOf(selected))]
    });
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CPUState)
