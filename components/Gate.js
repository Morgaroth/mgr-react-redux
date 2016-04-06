import React, {Component, PropTypes} from "react";
import {ItemTypes} from "./algorithm/Constants";
import {DragSource} from "react-dnd";
import {NoopHref} from "../aliases/index";

const gateSource = {
    beginDrag(props) {
        console.log("begin drag " + JSON.stringify(props));
        return {
            gate: {type: props.type},
            cpuId: props.cpuId,
            publish: props.dis
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Gate extends React.Component {
    render() {
        const {size, connectDragSource, href} = this.props;
        return connectDragSource(
            <div style={{fontWeight: 'bold', cursor: 'move'}}>
                <img height={size} width={size*1.475} src={href || NoopHref}/>
            </div>)
    }
}

Gate.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    href: PropTypes.string,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool
};

Gate.defaultProps = {
    size: 50
};

export default DragSource(ItemTypes.GATE, gateSource, collect)(Gate);