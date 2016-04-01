import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from "../actions";


class MachineState extends Component {
    render() {
        const {serviceUrl, actions} = this.props;
        return (
            <div>
                <p>Here is machine state!</p>
                <button onClick={() => actions.executeCreateCPU(serviceUrl, 4)}/>
            </div>
        )
    }
}

MachineState.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
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
