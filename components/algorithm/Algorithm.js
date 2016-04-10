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
import {DefaultAlgoSize} from "../../constants/defaults";

class Algorithm extends Component {


    renderField(qbit, position, isNext) {
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
            g = <Gate href={href} isNextStep={isNext}/>
        }
        return (
            <td key={divKey}>
                <div key={divKey}>
                    <AlgorithmField qbit={qbit} position={position}>
                        {g || <Gate isNextStep={isNext}/>}
                    </AlgorithmField>
                </div>
            </td>
        );
    }


    renderRow(qbit, registerSize, execData) {
        var squares = [];
        var name = "Q" + (registerSize - qbit - 1);
        squares.push(<td key={'fq'+qbit+'ph'}>{name}</td>);
        for (let p = 0; p < execData.length; p++) {
            squares.push(this.renderField(qbit, p, p === execData.position));
        }
        return <tr key={'q'+qbit}>{squares}</tr>;
    }

    renderTable(registerSize, execData) {
        var squares = [];
        for (let q = 0; q < registerSize; q++) {
            squares.push(this.renderRow(q, registerSize, execData))
        }
        return (<table style={{borderSpacing:0}}>
            <tbody key="rendertable">{squares}</tbody>
        </table>)
    }


    render() {
        const {registerSize, execData} = this.props;
        return (
            <div>
                <GatesPalette />
                <hr/>
                {this.renderTable(registerSize, execData)}
            </div>
        );
    }
}

Algorithm.propTypes = {
    registerSize: PropTypes.number.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired,
    execData: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        serviceUrl: state.serviceUrl,
        available: state.serverState.available,
        selected: state.serverState.selected,
        execData: (state.execution[state.serverState.selected] || {position: 0, length: DefaultAlgoSize})
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
