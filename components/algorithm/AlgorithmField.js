import React, {Component, PropTypes} from "react";
import {ItemTypes} from "./Constants";
import {DropTarget} from "react-dnd";

const gateTarget = {
    // canDrop(props) {
    //     // teoretycznie tu moglaby sie pojawiac informacja czy dane pole jest wolne, chociaż zawsze możnaby w tym miejscu zamienić istniejącą bramkę
    //     return canMoveKnight(props.x, props.y);
    // },

    drop(props, monitor) {
        // implementacja wsadzania bramki na linie algorytmu, props należy do docelowego pola na które sie upuszcza, chyba
        console.log("drop", props);
        console.log("push", monitor.getItem());
        // moveKnight(props.x, props.y);
        monitor.getItem().publish(monitor.getItem().gate, monitor.getItem().cpuId, props.qbit, props.position)
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


class AlgorithmField extends Component {
    // pomocnicza funckcja do kolorowania pól, u mnie moze sie przydać do kolorowania pola do puszczenia
    // renderOverlay(color) {
    //     return (
    //         <div style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     height: '100%',
    //     width: '100%',
    //     zIndex: 1,
    //     opacity: 0.5,
    //     backgroundColor: color,
    //   }}/>
    //     );
    // }


    // <Square black={black}>
// {children}
// </Square>
// {isOver && !canDrop && this.renderOverlay('red')}
// {!isOver && canDrop && this.renderOverlay('yellow')}
// {isOver && canDrop && this.renderOverlay('green')}


// connect drop target nie mam pojecia co robi, ale chyba wiaze propsy m. in. trzeba używać
    render() {
        const {connectDropTarget, isOver, children} = this.props;
        // zamiast square bedzie sie pojwiac gate z propsów
        return connectDropTarget(
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                {children}
            </div>
        );
    }
}

AlgorithmField.propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    children: PropTypes.node,
    qbit: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired
};

export default DropTarget(ItemTypes.GATE, gateTarget, collect)(AlgorithmField);