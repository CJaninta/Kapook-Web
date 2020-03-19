import React, { Component } from 'react';
import logo1 from './components/img/save-money.png';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import './App.css';
import { feedex } from "./data";
import { Redirect, Link } from 'react-router-dom';
import { FaPenSquare, FaMoneyBillWave } from 'react-icons/fa';
import { MdAccountCircle, MdExitToApp, MdClear, MdModeEdit, MdDone } from "react-icons/md";
import { IoIosCash, IoMdListBox } from "react-icons/io";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import $ from 'jquery';
import expense from './components/img/out.png';
import { Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class kp extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getUserFeed = this.getUserFeed.bind(this);
        this.save = this.save.bind(this);
        this.save = this.save.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteFeed = this.deleteFeed.bind(this);
        this.deleteFeedAction = this.deleteFeedAction.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onSet = this.onSet.bind(this);
        this.update = this.update.bind(this);
        this.state = {
            data: [],
            topic: '',
            expense: '',
            redirectToReferrer: false,
            id: '', user: '', password: '', address: '', email: '', tel: '',
            newlist: '-', newam: '-'
        };
    }

    componentWillMount() {

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

    getUserFeed() {

        let data = JSON.parse(sessionStorage.getItem("userData"));
        this.setState({ user: data.userData.Username, id: data.userData.User_ID });
        let postData = { user_id: data.userData.User_ID };
        console.log(data);
        if (data) {
            feedex(postData).then((result) => {
                let responseJson = result;
                if (responseJson.feedData) {
                    this.setState({ data: responseJson.feedData });
                    console.log(this.state.data);
                }
            });

        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    update(e, l, a) {

        let list_ex = l;
        let amount_ex = a;

        if (this.state.newlist != " " || this.state.newam != " ") {
            if (this.state.newlist != l && this.state.newlist != " " && this.state.newlist != "-") {
                list_ex = this.state.newlist;
            }
            if (this.state.newam != a && this.state.newam != " " && this.state.newam != "-") {
                amount_ex = this.state.newam;
            }
            console.log(e, l, a);
            console.log(list_ex, amount_ex);
            $.ajax({
                type: 'POST',
                url: 'http://localhost/kapook-php/api/feedupex.php',
                data: { ex_id: e, list: list_ex, amount:  amount_ex},
            });
        }

        window.location.reload(false);
    }

    onSet() {
        var def = "-";
        this.setState({ newlist: def, newam: def });
    }

    onUpdate(e, l, a) {

        this.onSet();
        console.log(this.state.newam, this.state.newlist);
        console.log("update", e, l, a);
        confirmAlert({
            title: <span className="Appfont" style={{ fontSize: "50px", color: "rgb(255, 98, 0)" }}>Update List</span>,
            message: <span className="Appfont" style={{ fontSize: "20px" }}><IoMdListBox style={{ fontSize: "27px", color: "rgb(0, 186, 80)" }} /> <span style={{ fontSize: "28px", color: "rgb(26, 112, 80)" }} >รายการ :</span> {l} <br />
                <IoIosCash style={{ fontSize: "27px", color: "rgb(0, 186, 80)" }} /> <span style={{ fontSize: "28px", color: "rgb(26, 112, 80)" }} >จำนวน :</span> {a} บาท <br /><br />
                <span style={{ fontSize: "23px", color: "rgb(26, 112, 80)" }} >รายการ</span><Input onChange={this.onChange} type="text" name="newlist" id="list" placeholder="Enter your new list" />
                <span style={{ fontSize: "23px", color: "rgb(26, 112, 80)" }} >จำนวนเงินที่ใช้จ่าย</span><Input onChange={this.onChange} type="number" name="newam" id="amount" placeholder="Enter your new amount" /><br />
                <span className="Appfont" style={{ fontSize: "25px", color: "rgb(255, 0, 96)" }}>จะเปลี่ยนแปลงรายการนี้หรือไม่ ?</span>
            </span>,
            buttons: [
                {
                    label: <span className="Appfont" style={{ fontSize: "20px" }}> Yes <MdDone style={{ fontSize: "30px", fontWeight: "700" }} /></span>,
                    onClick: () => this.update(e, l, a)
                },
                {
                    label: <span className="Appfont" style={{ fontSize: "20px" }}>No <MdClear style={{ fontSize: "30px", fontWeight: "700" }} /></span>,
                    onClick: () => <Redirect to={'/'} />
                }
            ]
        });

    }

    deleteFeed(e, l, a) {

        console.log("delete", e, l, a);
        confirmAlert({
            title: <span className="Appfont" style={{ fontSize: "50px", color: "rgb(255, 0, 0)" }}>Delete List</span>,
            message: <span className="Appfont" style={{ fontSize: "20px" }}><IoMdListBox style={{ fontSize: "27px", color: "rgb(0, 186, 80)" }} /> <span style={{ fontSize: "28px", color: "rgb(26, 112, 80)" }} >รายการ :</span> {l} <br />
                <IoIosCash style={{ fontSize: "27px", color: "rgb(0, 186, 80)" }} /> <span style={{ fontSize: "28px", color: "rgb(26, 112, 80)" }} >จำนวน :</span> {a} บาท <br /><br />

                <span className="Appfont" style={{ fontSize: "25px", color: "rgb(255, 0, 96)" }}>จะลบรายการนี้หรือไม่ ?</span>
            </span>,
            buttons: [
                {
                    label: <span className="Appfont" style={{ fontSize: "20px" }}> Yes <MdDone style={{ fontSize: "30px", fontWeight: "700" }} /></span>,
                    onClick: () => this.deleteFeedAction(e)
                },
                {
                    label: <span className="Appfont" style={{ fontSize: "20px" }}>No <MdClear style={{ fontSize: "30px", fontWeight: "700" }} /></span>,
                    onClick: () => <Redirect to={'/'} />
                }
            ]
        });

    }

    deleteFeedAction(e) {

        console.log(e);
        let data = JSON.parse(sessionStorage.getItem("userData"));
        let postData = { user_id: data.userData.User_ID, ex_id: e };
        if (postData) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost/kapook-php/api/feeddelex.php',
                data: { user_id: data.userData.User_ID,ex_id:e},
            });
        }
        window.location.reload(false);
    }

    save(e) {

        document.getElementById("input").reset();
        e.preventDefault();
        let data = JSON.parse(sessionStorage.getItem("userData"));
        let postData = { user_id: data.userData.User_ID, list: this.state.topic, amount: this.state.expense };

        console.log(postData, this.state.topic);
        if (this.state.topic) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost/kapook-php/api/expense.php',
                data: { user_id: data.userData.User_ID, list: this.state.topic, amount: this.state.expense},
            });

        }
        window.location.reload(false);

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
        const { user } = this.state;
        const { data } = this.state;

        return (
            <React.Fragment>
                <div>
                    <div className="lay">
                        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary">
                            <a className="navbar-brand mb-0 h1" href="/kp"><img src={logo1} className="App-logo2" /> KAPOOK</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse nav" id="navbarNavAltMarkup">
                                <div className="navbar-nav ">
                                    <a className="nav-item nav-link" href="/kp">Home</a>
                                    <a className="nav-item nav-link" href="/in">Income<span className="sr-only">(current)</span></a>
                                    <a className="nav-item nav-link active" href="/ex">Expense</a>
                                </div>
                            </div>
                            <h5 className="nav-item nav-link" style={{ margin: "2px", color: "rgb(128, 237, 255)", fontWeight: "600" }}><MdAccountCircle style={{ fontSize: "27px" }} /> {user}</h5>
                            <form class="form-inline my-2 my-lg-0">
                                <button onClick={this.logout} type="button" class="btn btn-light btn-sm" type="submit">Log out <MdExitToApp style={{ fontSize: "20px" }} /></button>
                            </form>
                        </nav>
                        <br></br>
                    </div>
                    <div className="inf">
                        <center><h1 style={{ fontSize: "70px", fontWeight: "700" }}><img style={{ height: "10vmin" }} src={expense} className="App-logo" /> รายจ่าย</h1></center>
                    </div>
                    <div className="log inf">
                        <button type="button" class="btn btn-outline-danger" style={{ float: "right" ,border:"4px solid",fontSize:"20px",fontWeight:"500"}} data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">เพิ่มรายการ</button>
                    </div>
                    <div className="paper">
                        <div className="boxin">
                            <div class="col inf">
                                <div class="collapse multi-collapse" id="multiCollapseExample1" >
                                    <form onSubmit={this.save} method="post" id="input">
                                        <div className="input" style = {{border:"2px groove rgb(255, 0, 28)"}}>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1"><FaPenSquare /></span>
                                                </div>
                                                <input value={this.state.topic} onChange={this.onChange} name="topic" type="text" class="form-control" placeholder="รายการ" aria-label="topic" aria-describedby="basic-addon1" />
                                            </div>
                                        </div>
                                        <br />
                                        <div className="input" style = {{border:"2px groove rgb(255, 0, 28)"}}>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text"><FaMoneyBillWave /></span>
                                                </div>
                                                <input value={this.state.expense} onChange={this.onChange} name="expense" type="text" placeholder="จำนวนเงินที่ใช้จ่าย" class="form-control" aria-label="Amount (to the nearest dollar)" />
                                                <div class="input-group-append">
                                                    <span class="input-group-text">บาท</span>
                                                </div>
                                            </div>
                                        </div>
                                        <br />

                                        <div className="input1">
                                            <div class="input-group mb-3">
                                                <button value="Post" onClick={this.save} type="submit" class="btn btn-danger" style={{ width: "100%", borderRadius: "20px" }}>ตกลง</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="boxinfo">
                            {data.map(data => (
                                <div>

                                    <div className="income card text-white bg-danger mb-3" >

                                        <span style={{ color: "rgb(255, 191, 255)" }}><IoMdListBox style={{ fontSize: "27px" }} /> รายการ : {' '}
                                            <span style={{ fontSize: "25px", color: "white" }}>{data.List_name}</span>

                                        </span>
                                        <span style={{ color: "rgb(255, 191, 255)" }}><IoIosCash style={{ fontSize: "27px" }} /> จำนวน :  {' '}
                                            <span style={{ fontSize: "25px", color: "white" }}>{data.Amount} บาท</span>
                                        </span>
                                        <span style={{ color: "rgb(255, 191, 255)", paddingRight: "20px" }}>
                                            <span style={{ fontSize: "18px", color: "white", float: "right" }}>{data.Date}</span>
                                        </span>

                                    </div>
                                    {/* เลขไอดีของแต่ละรายการ*/}<span style={{ fontSize: "30px", float: "right" }}>{/*data.Ex_ID*/}</span>

                                    <span style={{ float: "right", paddingTop: "10px" }}>
                                        <button id="del" class="btn btn-danger" onClick={(e) => this.deleteFeed(data.Ex_ID, data.List_name, data.Amount)} data={data.Ex_ID} style={{ padding: "1px", margin: "3px" }}>
                                            <MdClear style={{ fontSize: "30px", color: "white" }} />
                                        </button>
                                        <br />
                                        <button id="up" class="btn btn-info" onClick={(e) => this.onUpdate(data.Ex_ID, data.List_name, data.Amount)} data={data.Ex_ID} style={{ padding: "1px", margin: "3px" }}>
                                            <MdModeEdit style={{ fontSize: "30px", color: "white" }} />
                                        </button>
                                    </span>

                                </div>), this)}
                        </div>

                    </div>
                </div>

            </React.Fragment>

        );
    }
}
export default kp;