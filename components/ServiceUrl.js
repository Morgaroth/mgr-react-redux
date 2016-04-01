import React, {Component, PropTypes} from "react";


class ServiceUrl extends Component {

    handleEnter(e) {
        if (e.keyCode === 13) {
            this.setUrl();
        }
    }

    setUrl() {
        const a = document.getElementById("serviceurl.input");
        const value = a.value;
        if (value.length > 0 && value !== this.props.serviceUrl) {
            this.props.onChange(value)
        }
    };


    render() {
        const {serviceUrl, onChange} = this.props;
        return (
            <div>
                <p>Current url to service is {serviceUrl}</p>
                <button onClick={() => onChange("http://localhost:9999")}>Set to localhost</button>
                <br/>
                <button onClick={() => onChange("http://quide.jaje.ninja")}>Set to Internet</button>
                <br/>
                <button onClick={this.setUrl.bind(this)}>Set to:</button>
                <input id="serviceurl.input" default={serviceUrl} onkeyup={this.handleEnter.bind(this)}/>
            </div>
        )
    }
}


ServiceUrl.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default ServiceUrl