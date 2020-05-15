import React from 'react';
import'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import '../App.css';

class Login extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          username: '',
          password: '',
          valid: false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
      this.setState ({
          [e.target.name]: [e.target.value]
      });
  }

  handleSubmit = (e) => {
      e.preventDefault();
      window.alert(this.state.username);
  }

  render() {
      return(
        <div id="login">
            <div class="container">
                <div id="login-row" class="row justify-content-center align-items-center">
                    <div id="login-column" class="col-md-6">
                        <div id="login-box" class="col-md-12">
                            <form id="login-form" class="form" onSubmit={this.handleSubmit}>
                                <h2 class="text-center text-info">CS Survey Portal<hr></hr></h2>
                                <div class="form-group">
                                    <label for="username" class="text-info">Username:</label>
                                    <input type="text" name="username" value={this.state.username} class="form-control" onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label for="password" class="text-info">Password:</label>
                                    <input type="password" name="password" value={this.state.password} class="form-control" onChange={this.handleChange} />
                                </div>
                                <div class="form-group text-center">
                                    <input type="submit" name="submit" class="btn btn-info btn-lg" value="submit" />
                                </div>
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
