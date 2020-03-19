import React, { Component } from 'react';
import logo from './components/img/1pig.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { MdPermContactCalendar , MdAccountCircle} from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link,Redirect } from 'react-router-dom';
import {loginuser} from "./data";
import './App.css';
import regis from "./regis";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Row,
  Col
} from "reactstrap";

class login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false,
      defaultModal: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  login() {
    console.log(this.state.username);
    
    if (this.state.username && this.state.password) {
      loginuser(this.state).then((result) => {
        let responseJson = result;
        console.log(responseJson);
        if (responseJson.userData) {
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({ redirectToReferrer: true });
        }
        else
          alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
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
        <div className="App-header Appfont">
          <img src={logo} className="App-logo" />
          <h1 className="Appfont na1">KAPOOK</h1><br/>
          <button
            type = "button"
            className="btn btn btn-success btn-lg"
            onClick={() => this.toggleModal("formModal")}
          >
            Login
          </button>
          <Modal
            className="modal-dialog-centered"
            size="sm"
            isOpen={this.state.formModal}
            toggle={() => this.toggleModal("formModal")}
          >
            <div className="modal-body p-0">
              <Card className="loginp">

                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                      <h2 className="na"><span style = {{fontSize:"50px"}}><MdPermContactCalendar /></span> Login</h2><br />
                  </div>
                  <Form role="form">
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText >
                            <MdAccountCircle style = {{fontSize:"20px"}}/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.onChange} placeholder="Username" type="text" name = "username"/>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <IoMdKey style = {{fontSize:"20px"}}/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.onChange} placeholder="Password" type="password" name = "password"/>
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <br />
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="Appfont ap">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <br />

                      <Form inline>
                        <Button onClick={this.login}  outline color="primary" className="Appfont log2" >Login </Button><br />
                        <Link to="/regis" ><Button outline color="danger" className="Appfont log2"> Sign up</Button></Link>
                      </Form>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default login;
