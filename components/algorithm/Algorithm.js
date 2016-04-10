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


    renderField(qbit, position) {
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
            <td key={divKey}>
                <div key={divKey}>
                    <AlgorithmField qbit={qbit} position={position}>
                        {g || <Gate />}
                    </AlgorithmField>
                </div>
            </td>
        );
    }


    renderRow(qbit, positions, registerSize) {
        var squares = [];
        var name = "Q" + (registerSize - qbit - 1);
        squares.push(<td key={'fq'+qbit+'ph'}>{name}</td>);
        for (let p = 0; p < positions; p++) {
            squares.push(this.renderField(qbit, p));
        }
        return <tr key={'q'+qbit}>{squares}</tr>;
    }

    renderTable(registerSize, positions) {
        var squares = [];
        for (let q = 0; q < registerSize; q++) {
            squares.push(this.renderRow(q, positions, registerSize))
        }
        return (<table style={{borderSpacing:0}}>
            <tbody key="rendertable">{squares}</tbody>
        </table>)
    }


    render() {
        const {registerSize, gates} = this.props;
        let positions = Math.max(8, Math.max.apply(gates.map((g) => g.position)));
        return (
            <div>
                <GatesPalette />
                <hr/>
                {this.renderTable(registerSize, positions)}
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
