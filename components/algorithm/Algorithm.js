import React, {Component, PropTypes} from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AlgorithmField from "./AlgorithmField";
import Gate from "../Gate";
import GatesPalette from "./GatesPalette";
import {PauliXHref, PauliYHref, PauliZHref, HadamardHref, NoopHref} from "../../aliases/index";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../../actions";

class Algorithm extends Component {


    renderField(qbit, position, maxPositions) {
        var g = this.props.gates.find((g) => g.position === position && g.qbit === qbit);
        let divKey = "q" + qbit + "p" + position;
        var href = NoopHref;
        if (g !== undefined) {
            if (g.gate.type === "H") {
                href = HadamardHref;
            } else if (g.gate.type === "X") {
                href = PauliXHref;
            } else if (g.gate.type === "Y") {
                href = PauliYHref;
            } else if (g.gate.type === "Z") {
                href = PauliZHref;
            }
            g = <Gate href={href}/>
        }
        return (
            <div key={divKey} style={{height:50, width: 50*1.475 }}>
                <AlgorithmField qbit={qbit} position={position}>
                    {g || <Gate />}
                </AlgorithmField>
            </div>
        );
    }

    render() {
        const {registerSize, gates} = this.props;
        let positions = Math.max(8, Math.max.apply(gates.map((g) => g.position)));
        const squares = [];
        for (let q = 0; q < registerSize; q++) {
            for (let p = 0; p < positions; p++) {
                squares.push(this.renderField(q, p, positions));
            }
        }

        return (
            <div style={{height: 50*registerSize, width: (positions*50*1.475)}}>
                <GatesPalette />
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {squares}
                </div>
            </div>
        );
    }
}

Algorithm.propTypes = {
    registerSize: PropTypes.number.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired,
    positions: PropTypes.number
};

// export default DragDropContext(HTML5Backend)(Algorithm);
//

function mapStateToProps(state) {
    return {
        serviceUrl: state.serviceUrl,
        available: state.serverState.cpus,
        selected: state.serverState.selected || state.serverState.cpus[0]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DragDropContext(HTML5Backend)(Algorithm))
