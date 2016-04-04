import React, {Component, PropTypes} from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AlgorithmField from "./AlgorithmField"
import Knight from "./Knight"

class Algorithm extends Component {
    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight />;
        }
    }

    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);

        return (
            <div key={i} style={{ width: '12.5%', height: '12.5%' }}>
                <AlgorithmField x={x} y={y}>
                    {this.renderPiece(x, y)}
                </AlgorithmField>
            </div>
        );
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
            squares.push(this.renderSquare(i));
        }

        return (
            <div className='Algorithm'>
                {squares}
            </div>
        );
    }
}

Algorithm.propTypes = {
    knightPosition: PropTypes.arrayOf(
        PropTypes.number.isRequired
    ).isRequired,
    registerSize: PropTypes.number.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DragDropContext(HTML5Backend)(Algorithm);