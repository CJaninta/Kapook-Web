import React from 'react';
import logo from './components/img/1pig.png';
import { Button } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './App.css';

class login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.username && this.state.password) {
      PostData('login', this.state).then((result) => {
        let responseJson = result;
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
        else
          alert(result.error);
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/kp'} />)
    }
    if (sessionStorage.getItem('userData')) {
      return (<Redirect to={'/kp'} />)
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="Appfont al"  >Login</h2>
          <img src={logo} className="App-logo" /><br />

          <Form>
            <FormGroup inline>
              <h4 className="Appfont na">User name</h4>
              <Label for="exampleEmail" hidden>User name</Label>
              <Input onChange={this.onChange} className="Appfont ap" type="email" name="email" id="exampleEmail" placeholder="Enter your Username" />
            </FormGroup>
            {' '}

            <FormGroup>
              <h4 className="Appfont na">Password</h4>
              <Label for="examplePassword" hidden>Password</Label>
              <Input onChange={this.onChange} className="Appfont ap" type="password" name="password" id="examplePassword" placeholder="Enter your Password" />
            </FormGroup>
            {' '}
          </Form>
          <Form inline>
            <Button onClick={this.login} onClick=" " outline color="success" className="Appfont lg" >Login </Button><br />
            <Button outline color="danger" className="Appfont lg"> Sign up</Button>
          </Form>

        </div>
      </div>
    );
  }

}

export default login;
