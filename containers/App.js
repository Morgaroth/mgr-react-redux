import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ServiceUrl from "../components/ServiceUrl";
import ServerState from "../components/ServerState";
import CPUState from "../components/CPUState";
import * as Actions from "../actions";

class App extends Component {
    render() {
        const {serviceUrl, actions} = this.props;
        return (
            <div>
                <ServiceUrl serviceUrl={serviceUrl} onChange={actions.changeServiceURL}/>
                <hr/>
                <ServerState />
                <hr/>
                <CPUState />
                <div style={{clear: 'both'}}></div>
                <hr/>
                <p>Here is entire app state:</p>
                <pre>{JSON.stringify(this.props, null, 3)}</pre>
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
