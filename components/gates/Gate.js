import React, {Component, PropTypes} from "react";
import {NoopHref} from "../../aliases/index"

class Gate extends Component {

    gateHref() {
        return NoopHref;
    };

    render() {
        const {size} = this.props;
        return (
            <div>
                <img height={size} src={this.gateHref()}/>
            </div>
        )
    }
}


Gate.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Gate