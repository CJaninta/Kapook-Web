import React, { Component } from 'react';
import logo from './components/img/pig2.png';
import { Button } from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { signupuser } from "./data";
import { MdAccountCircle, MdEmail, MdPhone } from "react-icons/md";
import { IoMdKey, IoIosHome } from "react-icons/io";

import './App.css';
class regis extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', repassword: '', email: '', redirectToReferrer: false };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(event) {

    if (this.state.username != '' &&
      this.state.password != '' &&
      this.state.email != '' &&
      this.state.repassword != '') {
      if (this.state.password == this.state.repassword) {
        signupuser(this.state).then((result) => {
          let responseJson = result;
          if (responseJson.userData) {
            //อาจลบ session นี้
            //sessionStorage.setItem('userData', JSON.stringify(responseJson));
            this.setState({ redirectToReferrer: true });
            alert("ลงทะเบียนเรียบร้อย");
          }
          else{
            alert(responseJson.error);
            console.log(responseJson, responseJson.error);
          }
        });
      }
      else {
        alert("รหัสผ่านไม่ตรงกัน");
      }
      console.log(this.state);
    }
    else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  }

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/'} />)
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="Appfont al"  >Register</h2>
          <Link to="/"><img src={logo} className="App-logo1" /></Link>

          <Form className="Appfont na2">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail"><MdAccountCircle style={{ fontSize: "30px" }} /> Username</Label>
                  <Input onChange={this.onChange} type="text" name="username" id="exampleEmail" placeholder="Enter your username" required />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail"><MdEmail style={{ fontSize: "35px" }} /> Email</Label>
                  <Input
                    onChange={this.onChange}
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your email"
                    required
                  />
                </FormGroup>
              </Col>

            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword"><IoMdKey style={{ fontSize: "35px" }} /> Password</Label>
                  <Input onChange={this.onChange} type="password" name="password" id="examplePassword" placeholder="Enter your password" required />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword"><IoMdKey style={{ fontSize: "35px" }} /> Re-Password</Label>
                  <Input onChange={this.onChange} type="password" name="repassword" id="examplePassword" placeholder="Re-enter password" required />
                </FormGroup>
              </Col>



            </Row>
            <Link to="/"><Button color="secondary" className="Appfont lg" size="lg">Back to login</Button></Link>
            <Button color="danger" className="Appfont lg" size="lg" onClick={this.onClick}> Sign in</Button>
          </Form>

        </div>
      </div>

    );
  }

}

export default regis;
