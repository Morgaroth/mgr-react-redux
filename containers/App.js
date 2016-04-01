import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ServiceUrl from "../components/ServiceUrl";
import MachineState from "../components/MachineState";
import * as Actions from "../actions";

class App extends Component {
    render() {
        const {serviceUrl, actions} = this.props;
        return (
            <div>
                <p>Here is App controls {JSON.stringify(this.props)}</p>
                <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeServiceURL}/>
                <MachineState serviceUrl={serviceUrl}/>
            </div>
        )
    }
}

App.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    machineState: PropTypes.object,
    cpuState: PropTypes.object,
    actions: PropTypes.object
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
