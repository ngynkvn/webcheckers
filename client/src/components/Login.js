import React, {Component} from 'react';
import '../styles/login.css'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }
    handleChange(e) {
        let val = e.target.value;
        this.setState({name: val});
    }
    submit() {
        this
            .props
            .sendData(this.state.name);
    }
    render() {
        return (
            <form id="login-form"
                onSubmit={(e) => {
                this.submit();
                e.preventDefault()
            }}>
                <label htmlFor="username">Name :
                </label>
                <input style={{ margin: '5px' }}
                    type="text"
                    autoFocus={true}
                    name="username"
                    onChange={(e) => this.handleChange(e)}/>
                <input type="submit" value="Submit" style={{ margin: '5px' }} />
                {this.props.problem?<p><i>There was a problem with your request. Please select a different username.</i></p>:null}
            </form>
        );
    }
}

export default Login;