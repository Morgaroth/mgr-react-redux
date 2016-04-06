import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";


class MachineState extends Component {

    constructor(props) {
        super(props);
        this.state = {size: 1};
    }

    render() {
        const {actions} = this.props;
        var updateCPUSize = () => {
            let newValue = document.getElementById("new.cpu.size").valueAsNumber;
            this.setState({size: newValue})
        };
        return (
            <div>
                <input id="new.cpu.size" type="number" onChange={updateCPUSize}/>
                <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create new CPU with {this.state.size}qbit
                    register
                </button>
            </div>
        )
    }
}

MachineState.propTypes = {
    actions: PropTypes.object
};


function mapStateToProps(state) {
    console.log("mapStateToProps: " + JSON.stringify(state));
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MachineState)
