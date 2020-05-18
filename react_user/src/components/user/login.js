import React from 'react';
import'bootstrap/dist/css/bootstrap.css';
import '../../App.css';

class Login extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
          apiMessage: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  // server call to get message
  callAPI() {
      fetch("http://localhost:9000/users")
        .then(res => res.text())
        .then(res => this.setState({ apiMessage: res}));
  }

  componentWillMount(){
      this.callAPI();
  }

  handleChange = (e) => {
      this.setState ({
          [e.target.name]: [e.target.value]
      });
  }

  handleSubmit = (e) => {
      e.preventDefault();

    //   window.alert(this.state.username + this.state.password);
    // handle submit request, pass JWT to server as credentials and validate
    fetch('http://localhost:9000/users', {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => this.setState({ apiMessage: data}));
  }

  render() {
      return(
        <div id="login">
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form" onSubmit={this.handleSubmit}>
                                <h2 className="text-center text-info">CS Survey Portal<hr></hr></h2>
                                <div className="form-group">
                                    <label htmlFor="username" className="text-info">Username:</label>
                                    <input type="text" name="username" value={this.state.username} className="form-control" onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="text-info">Password:</label>
                                    <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.handleChange} />
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit" name="submit" className="btn btn-info btn-lg" value="submit" />
                                </div>
                                <p>{this.state.apiMessage}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default Login;
