import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Actions from "../actions";
import List from "react-list-select";

class ServerState extends Component {

    constructor(props) {
        super(props);
        this.state = {size: 1};
    }

    render() {
        const {actions, selected, available} = this.props;
        var updateCPUSize = () => {
            let newValue = document.getElementById("new.cpu.size").valueAsNumber;
            this.setState({size: newValue})
        };
        var header = <a>Selected CPU: {selected}</a>;
        var list = <List items={available.map((x) => { return "" + x.size +"qbits, "+x.id})}
                         selected={available.map((x) => x.id).indexOf(selected)}
                         multiple={false}
                         onChange={(selected) => {actions.selectCPU(available[selected].id)}}/>;

        if (selected === 'undefined' || selected == null) {
            header = <a>No available computers.</a>;
            list = undefined;
        }
        return (
            <div>
                <button onClick={() => actions.fetchCPUsFromServer()}>Refresh</button>
                <br/>
                <input id="new.cpu.size" type="number" defaultValue={this.state.size} onChange={updateCPUSize}/>
                <button onClick={() => actions.executeCreateCPU(this.state.size)}>Create new CPU with {this.state.size}qbit
                    register
                </button>
                <br/>
                {header}
                {list}
            </div>
        )
    }
}

ServerState.propTypes = {
    actions: PropTypes.object,
    available: PropTypes.array,
    selected: PropTypes.string
};


function mapStateToProps(state) {
    return {
        serviceUrl: state.serviceUrl,
        available: state.serverState.available,
        selected: state.serverState.selected || state.serverState.available[0]
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
)(ServerState)
