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
                <a>Current url to service is {serviceUrl}</a><br/>
                <button onClick={() => onChange("http://localhost:9999")}>Set to localhost</button>
                <button onClick={() => onChange("http://quide.jaje.ninja")}>Set to Internet</button>
                <button onClick={this.setUrl.bind(this)}>Set to:</button>
                <input id="serviceurl.input" type="url" defaultValue={serviceUrl} onkeyup={this.handleEnter.bind(this)}/>
            </div>
        )
    }
}

ServiceUrl.defaultProps = {
    serviceUrl: "http://localhost:9999"
};

ServiceUrl.propTypes = {
    serviceUrl: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default ServiceUrl