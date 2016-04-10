import React, {Component, PropTypes} from "react";
import {PauliXHref, PauliYHref, PauliZHref, HadamardHref} from "../../aliases/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";
import GateOnPallette from "./GateOnPalette"

class GatesPalette extends React.Component {
    render() {
        let {cpu, actions} = this.props;
        return <div style={{display: "flex", flexWrap: "wrap"}}>
            <GateOnPallette type="N" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={HadamardHref} type="H" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={PauliXHref} type="X" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={PauliYHref} type="Y" cpuId={cpu} dis={actions.addGateToAlgo}/>
            <GateOnPallette href={PauliZHref} type="Z" cpuId={cpu} dis={actions.addGateToAlgo}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {cpu: state.serverState.selected}
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
