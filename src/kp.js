import React, { Component } from 'react';
import logo1 from './components/img/save-money.png';
import userimg from './components/img/default-user.png';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import './main.css';
import { Redirect } from 'react-router-dom';
import { MdAccountCircle, MdExitToApp, MdGetApp, MdBorderColor, MdEmail, MdPhone, MdVpnKey, MdLockOpen, MdClear, MdAccountBox, MdContacts, MdModeEdit ,MdViewList} from "react-icons/md";
import { IoMdKey, IoIosHome, IoIosLock ,IoIosListBox} from "react-icons/io";
import $ from 'jquery';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { FiLock, FiHome, FiInbox, FiPhoneCall } from "react-icons/fi";
import { FaMoneyBill } from "react-icons/fa";
import { totalin, totalex, profile, email } from "./data";

class kp extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.getUserFeed = this.getUserFeed.bind(this);
        this.password = this.password.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.state = {
            collapsed: true,
            redirectToReferrer: false,
            id: '', user: '', password: '', email: '', img: '',
            newps: '-', oldps: '',
            newuser: '-', newemail: '-',
            data: [], totalin: 0, totalex: 0
        };

    }


    componentDidMount() {

        if (sessionStorage.getItem("userData")) {
            this.getUserFeed();
        }

        else {
            this.setState({ redirectToReferrer: true });
        }

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    password(pass) {
        var data = JSON.parse(sessionStorage.getItem("userData"));
        var def = "-";
        if(this.state.oldps == "-" || this.state.newps == "-")
        {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
        if (this.state.oldps == this.state.password && this.state.oldps != " " && this.state.newps != " ") {
            $.ajax({
                type: 'POST',
                url: 'http://localhost/kapook-php/api/password.php',
                data: { id: this.state.id, new: this.state.newps },
            });
            alert("เปลี่ยนรหัสผ่านเรียบร้อย")
            document.getElementById("pass").reset();
            data.userData.Password = this.state.newps;
            sessionStorage.setItem('userData', JSON.stringify(data));
            console.log(data.userData.Password);
            this.setState({ password: this.state.newps, oldps: def, newps: def });
            console.log(this.state.id);
            console.log(this.state);
            return (<Redirect to={'/kp'} />)
        }
        else if (this.state.oldps != this.state.password && this.state.oldps != " " && this.state.newps != " " && this.state.oldps != "-" && this.state.newps != "-") {
            alert("รหัสผ่านเก่าไม่ถูกต้อง")
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    onClick(event) {
        var data = JSON.parse(sessionStorage.getItem("userData"));
        var def = "-";
        if (this.state.newuser != "-" ||
            this.state.newemail != "-") {
            /*$.ajax({
                type: 'POST',
                url: 'http://localhost/kapook-php/api/update.php',
                data: {
                    user: this.state.newuser,
                    email: this.state.newemail,
                    id: this.state.id,
                },
            });*/

            if (this.state.newuser != "-" && this.state.newuser != " ") {
                let postData = { id: data.userData.User_ID, user: this.state.newuser };
                console.log(postData);
                if (data) {
                    profile(postData).then((result) => {
                        let responseJson = result;
                        console.log(responseJson.feedData);
                        if (responseJson.feedData) {
                            data.userData.Username = responseJson.feedData;
                            sessionStorage.setItem('userData', JSON.stringify(data));
                            console.log(data.userData.Username);
                            this.setState({ user: responseJson.feedData });
                            document.getElementById("user").reset();
                            alert("เปลี่ยนข้อมูลเรียบร้อย");
                            console.log(this.state.user);
                            return (<Redirect to={'/kp'} />)
                        }
                        else {
                            alert(responseJson.error);
                        }
                    });

                }
            }

            if (this.state.newemail != "-" && this.state.newemail != " ") {
                let postData = { id: data.userData.User_ID, email: this.state.newemail };
                console.log(postData);
                var emailuser = this.state.newemail;
                console.log(this.validateEmail(emailuser));
                if (data && this.validateEmail(emailuser) == true) {
                    email(postData).then((result) => {
                        let responseJson = result;
                        console.log(responseJson.email);
                        if (responseJson.email) {
                            data.userData.Email = responseJson.email;
                            sessionStorage.setItem('userData', JSON.stringify(data));
                            console.log(data.userData.Email);
                            this.setState({ email: responseJson.email });
                            document.getElementById("user").reset();
                            alert("เปลี่ยนข้อมูลเรียบร้อย");
                            console.log(this.state.email);
                            return (<Redirect to={'/kp'} />)
                        }
                        else {
                            alert(responseJson.error);
                        }
                    });

                }
                else {
                    alert("กรุณากรอก Email ให้ถูกต้อง");
                }

            }

            this.setState({ newuser: def, newemail: def })
            console.log(this.state)
        }
    }

    getUserFeed() {
        var data = JSON.parse(sessionStorage.getItem("userData"));
        let postData = { user_id: data.userData.User_ID };

        if (data) {
            totalin(postData).then((result) => {
                let responseJson = result;
                if (responseJson.totalin) {
                    this.setState({ totalin: responseJson.totalin });
                    console.log(this.state.data);
                }
            });

            totalex(postData).then((result) => {
                let responseJson = result;
                if (responseJson.totalex) {
                    this.setState({ totalex: responseJson.totalex });
                    console.log(this.state.data);
                }
            });
        }

        this.setState({
            id: data.userData.User_ID,
            user: data.userData.Username,
            password: data.userData.Password,
            email: data.userData.Email,
            img: data.userData.img
        });
        if (this.state.img == '') {
            this.setState({ img: userimg });
        }
        console.log("getuser");

    }

    resetform() {
        document.getElementById("pass").reset();
        document.getElementById("user").reset();
        document.getElementById("email1").reset();
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    logout() {
        sessionStorage.setItem("userData", '');
        sessionStorage.clear();
        this.setState({ redirectToReferrer: true });
    }
    render() {

        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/'} />)
        }

        const { user, totalin, totalex } = this.state;
        var dif = totalin - totalex;
        return (

            <div className="lay">
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand mb-0 h1" href="/kp"><img src={logo1} className="App-logo2" /> KAPOOK</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-item nav-link active" href="/kp">Home <span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link" href="/in">Income</a>
                            <a className="nav-item nav-link" href="/ex">Expense</a>
                        </div>
                    </div>
                    <h5 className="nav-item nav-link" style={{ margin: "2px", color: "rgb(128, 237, 255)", fontWeight: "600" }}><MdAccountCircle style={{ fontSize: "27px" }} /> {user}</h5>
                    <form class="form-inline my-2 my-lg-0">
                        <button onClick={this.logout} type="button" class="btn btn-light btn-sm" type="submit">Log out <MdExitToApp style={{ fontSize: "20px" }} /></button>
                    </form>
                </nav>
                <div className="paperpro Appfont">
                    <div className="boxpro">

                        <br /><center><h1 style={{ fontSize: "40px", fontWeight: "700", color: "rgb(25, 95, 246)" }}>Profile</h1>
                            <button onClick={this.resetform} data-toggle="modal" data-target="#exampleModal" style={{ margin: "10px" }} type="button" class="btn btn-success">แก้ไขรหัสผ่าน <IoIosLock style={{ fontSize: "22px", }} /></button>
                            <br /> <br /><img src={this.state.img} className="App-logo" style={{ width: "170px", height: "150px", borderRadius: "30px" }} />
                            <br />
                        </center>
                        <div className="boxuser">
                            <br /><h4><span onClick={this.resetform} style={{ fontWeight: "700", color: "rgb(25, 95, 246)" }}><button data-toggle="modal" data-target="#username" type="button" class="btn btn-secondary"><MdBorderColor style={{ fontSize: "20px", }} /></button> <MdAccountCircle style={{ fontSize: "30px" }} /> User name : </span> {this.state.user}</h4>
                            {/*}<h4><span onClick={this.resetform} style={{ fontWeight: "700", color: "rgb(25, 95, 246)" }}><button data-toggle="modal" data-target="#add" type="button" class="btn btn-secondary"><MdBorderColor style={{ fontSize: "20px", }} /></button> <IoIosHome style={{ fontSize: "27px" }} />  Address : </span> {this.state.address}</h4>{*/}
                            <h4><span onClick={this.resetform} style={{ fontWeight: "700", color: "rgb(25, 95, 246)" }}><button data-toggle="modal" data-target="#email" type="button" class="btn btn-secondary"><MdBorderColor style={{ fontSize: "20px", }} /></button> <MdEmail style={{ fontSize: "30px" }} /> Email : </span> {this.state.email}</h4>
                            {/*}<h4><span onClick={this.resetform} style={{ fontWeight: "700", color: "rgb(25, 95, 246)" }}><button data-toggle="modal" data-target="#tel" type="button" class="btn btn-secondary"><MdBorderColor style={{ fontSize: "20px", }} /></button> <MdPhone style={{ fontSize: "30px" }} /> Tel : </span> {this.state.tel}</h4>{*/}
                            <br/>
                            {/*}<button data-toggle="modal" data-target="#account" style = {{fontSize:"20px",fontWeight:"700",backgroundColor:"rgb(255, 97, 0)",color:"white"}} type="button" class="btn btn-warning"><MdViewList style={{ fontSize: "25px", }} /> แสดงรายรับ - รายจ่าย ทั้งหมด</button>{*/}
                        </div>

                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "100px" }}>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "rgb(0, 197, 69)" }} class="modal-title" id="exampleModalLabel">แก้ไขรหัสผ่าน <FiLock style={{ fontSize: "32px", fontWeight: "700" }} /></h2>
                                        <button onClick={this.resetform} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><MdClear style={{ fontSize: "40px", color: "rgb(255, 0, 0)" }} /></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <Form className="Appfont" id="pass">
                                            <Row form style={{ fontSize: "20px", color: "rgb(255, 50, 83)" }}>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword"><IoMdKey style={{ fontSize: "30px" }} /> Old Password</Label>
                                                        <Input onChange={this.onChange} type="password" name="oldps" id="examplePassword" placeholder="Enter your old password" required />
                                                    </FormGroup>
                                                </Col>
                                                <Col md={6}>
                                                    <FormGroup>
                                                        <Label for="examplePassword"><IoMdKey style={{ fontSize: "30px" }} /> New Password</Label>
                                                        <Input onChange={this.onChange} type="password" name="newps" id="examplePassword" placeholder="Enter your new password" required />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={this.password} type="submit" class="btn btn-success">เปลี่ยนรหัสผ่าน <MdLockOpen style={{ fontSize: "20px" }} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="username" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "100px" }}>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "rgb(0, 197, 69)" }} class="modal-title" id="exampleModalLabel">แก้ไข User name <MdAccountCircle style={{ fontSize: "35px", fontWeight: "700" }} /></h2>
                                        <button onClick={this.resetform} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><MdClear style={{ fontSize: "40px", color: "rgb(255, 0, 0)" }} /></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <Form className="Appfont" id="user">
                                            <Row form style={{ fontSize: "20px", color: "rgb(255, 50, 83)" }}>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="examplePassword"><MdAccountBox style={{ fontSize: "30px" }} /> New user name</Label>
                                                        <Input onChange={this.onChange} type="text" name="newuser" id="examplePassword" placeholder="Enter your new user name" required />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={this.onClick} type="submit" class="btn btn-success">เปลี่ยนชื่อผู้ใช้ <MdModeEdit style={{ fontSize: "20px" }} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="email" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "100px" }}>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "rgb(0, 197, 69)" }} class="modal-title" id="exampleModalLabel">แก้ไข Email <MdEmail style={{ fontSize: "35px", fontWeight: "700" }} /></h2>
                                        <button onClick={this.resetform} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><MdClear style={{ fontSize: "40px", color: "rgb(255, 0, 0)" }} /></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <Form className="Appfont" id="email1">
                                            <Row form style={{ fontSize: "20px", color: "rgb(255, 50, 83)" }}>
                                                <Col md={12}>
                                                    <FormGroup>
                                                        <Label for="examplePassword"><FiInbox style={{ fontSize: "30px" }} /> New Email</Label>
                                                        <Input onChange={this.onChange} type="text" name="newemail" id="examplePassword" placeholder="Enter your new email" required />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </Form>

                                    </div>
                                    <div class="modal-footer">
                                        <button onClick={this.onClick} type="submit" class="btn btn-success">เปลี่ยนอีเมล <MdModeEdit style={{ fontSize: "20px" }} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/*}<div class="modal fade" id="account" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ paddingTop: "100px" }}>
                            <div class="modal-dialog" role="document">
                                <div class="modal-content" >
                                    <div class="modal-header" style = {{backgroundColor:"rgb(225, 255, 216)"}}>
                                        <h2 style={{ fontSize: "40px", fontWeight: "700", color: "rgb(0, 197, 69)" }} class="modal-title" id="exampleModalLabel"><IoIosListBox style={{ fontSize: "32px", fontWeight: "700" ,color:"rgb(17, 85, 235)"}} /> 
                                         {' '}รายรับ <span style={{color: "rgb(17, 85, 235)" }}>-</span> <span style={{color: "rgb(255, 50, 83)" }}>รายจ่าย</span>
                                        </h2>
                                        <button onClick={this.resetform} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true"><MdClear style={{ fontSize: "40px", color: "rgb(255, 0, 0)" }} /></span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                       

                                    </div>
                                    <div class="modal-footer" style = {{backgroundColor:"rgb(225, 255, 216)"}}>
                                    <h5 className="nav-item nav-link" style={{ margin: "2px", color: "rgb(17, 85, 235)", fontWeight: "600" }}>บัญชีของ : <MdAccountCircle style={{ fontSize: "27px" }} /> {user}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>{*/}

                    <div className="boxpro" style={{ paddingLeft: "50px", paddingTop: "50px" }}>

                        <div className="income card text-white bg-success mb-3" style={{ float: "left", height: "190px" }}>
                            <center><span style={{ color: "rgb(144, 255, 0)", paddingRight: "85px" }}><FaMoneyBill style={{ fontSize: "27px" }} /> รายรับทั้งหมด  {' '}</span></center>
                            <center><span style={{ float: "left", fontSize: "60px", paddingLeft: "25px" }}><span style={{ fontSize: "50px" }}>+</span>{' '} {totalin}  {' '}<span style={{ fontSize: "30px" }}>บาท</span></span></center>
                        </div>

                        <div className="income card text-white bg-danger mb-3" style={{ float: "left", height: "190px" }}>
                            <center><span style={{ color: "rgb(255, 191, 255)", paddingRight: "85px" }}><FaMoneyBill style={{ fontSize: "27px" }} /> รายจ่ายทั้งหมด  {' '}</span></center>
                            <center><span style={{ float: "left", fontSize: "60px", paddingLeft: "25px" }}><span style={{ fontSize: "50px" }}>-</span>{' '} {totalex}  {' '}<span style={{ fontSize: "30px" }}>บาท</span></span></center>

                        </div>

                        <div className="income card text-white bg-dark mb-3" style={{ float: "left", height: "90px" }}>
                            <center><span style={{ float: "left" }}> รวมทั้งหมด : {' '}{dif} บาท</span></center>
                        </div>

                    </div>

                </div>
            </div>


        );
    }
}
export default kp;