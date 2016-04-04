import React, {Component, PropTypes} from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AlgorithmField from "./AlgorithmField";
import Gate from "../gates/Gate";
import GatesPalette from "./GatesPalette";
import {PauliXHref, PauliYHref, PauliZHref, HadamardHref, NoopHref} from "../../aliases/index";

class Algorithm extends Component {
    renderField(qbit, position) {
        var g = this.props.gates.find((g) => g.position === position && g.qbit === qbit);
        console.log("Found " + JSON.stringify(g));
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
            <div key={divKey} style={{    width: '12.5%', height: '12.5%' }}>
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
                squares.push(this.renderField(q, p));
            }
        }

        return (
            <div>
                <GatesPalette />
                <div style={{display: "flex", flexWrap: "wrap", width: "100%", height: "100%"}}>
                    {squares}
                </div>
            </div>
        );
    }
}

Algorithm.propTypes = {
    registerSize: PropTypes.number.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DragDropContext(HTML5Backend)(Algorithm);