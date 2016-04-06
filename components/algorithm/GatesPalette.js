import React, {Component, PropTypes} from "react";
import Gate from "../Gate";
import {PauliXHref, PauliYHref, PauliZHref, HadamardHref} from "../../aliases/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";


class GatesPalette extends React.Component {
    render() {
        let {cpu, actions} = this.props;
        console.log("gates cpu" + cpu);
        return <div style={{display: "flex", flexWrap: "wrap"}}>
            <Gate type="N" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <Gate href={HadamardHref} type="H" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <Gate href={PauliXHref} type="X" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <Gate href={PauliYHref} type="Y" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <Gate href={PauliZHref} type="Z" cpuId={cpu} dis={actions.addGateToAlgo}/>
        </div>
    }
}

function mapStateToProps(state) {
    console.log("GatesPalette: state" + JSON.stringify(state));
    return {cpu: state.machineState.selected}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GatesPalette)
