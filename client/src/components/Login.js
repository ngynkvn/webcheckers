import React, {Component} from 'react';

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
        // console.log(this.state.name);
    }
    submit() {
        console.log(this.state.name);
        this
            .props
            .sendData(this.state.name);
    }
    render() {
        return (
            <form
                onSubmit={(e) => {
                this.submit();
                e.preventDefault()
            }}>
                <label htmlFor="username">name :
                </label>
                <input
                    type="text"
                    autoFocus={true}
                    name="username"
                    onChange={(e) => this.handleChange(e)}/>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Login;