import React, {Component, PropTypes} from 'react';
import {ItemTypes} from './Constants';
import {DragSource} from 'react-dnd';

const gateSource = {
    beginDrag(props) {
        return {
            type: props.type
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class GateView extends Component {
    render() {
        const {connectDragSource, isDragging, name} = this.props;
        return connectDragSource(
            <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>G{name}</div>);
    }
}

GateView.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string
};

export default DragSource(ItemTypes.GATE, gateSource, collect)(GateView);