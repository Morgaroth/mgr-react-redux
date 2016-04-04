import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from "../actions";


class MachineState extends Component {
    render() {
        const {actions} = this.props;
        return (
            <div>
                <p>Here is machine state!</p>
                <button onClick={() => actions.executeCreateCPU(4)}/>
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
