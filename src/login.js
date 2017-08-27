import React, {Component} from 'react'
import {fire, gglProvider} from './firebase1'

class login extends React.Component {

	
	constructor(props) {
		super(props);
		console.log("in cons");
		this.cancel = this.cancel.bind(this);
		this.submit = this.submit.bind(this);
		this.signInUsingGoogle = this.signInUsingGoogle.bind(this);
		this.nameVisibility = this.props.viewId ==="SignUp" ?"none":"hidden";
		this.popupVisibility = this.props.popupVisibility ? "block" : "none";
		this.state = {
				display:"hidden"
		}
		
	}
	
	submit() {
		
		const email = this.emailInput.value;
		const password = this.passwordInput.value;
		
		if(this.props.viewId == "SignUp") {
			const name = this.nameInput.value;
			const provider = fire.auth().createUserWithEmailAndPassword(email,password).then((user, error) => {
				if (error) {
					console.log("error: "+error);
				} else {
					const provider1 = fire.auth().signInWithEmailAndPassword(email,password).then((user, error) => {
						if (error) {
							console.log("error: "+error);
						} else {
							//callBackForSignIn(popUpVisibility,authenticated)
							this.props.callBackForSignIn(false,true);
						}
					});
				}
			});
			
		}else{
			const provider = fire.auth().signInWithEmailAndPassword(email,password).then((user, error) => {
				if (error) {
					console.log("error: "+error);
				} else {
					this.props.callBackForSignIn(false,true);
				}
			});
		}
	}
	
	signInUsingGoogle() {
	    fire.auth().signInWithPopup(gglProvider)
	      .then((user, error) => {
	        if (error) {
	        	console.log("error: "+error);
	        } else {
	        	this.props.callBackForSignIn(false,true);
//	        	this.popupVisibility = false;
//	          this.setState({ authenticated: true })
	      }
	      })
	
	}
	
	componentDidMount() {
		console.log("Login componentDidMount");
	}

	componentWillMount() {
		console.log("Login componentWillMount");
	}

	componentWillUnmount() {
		console.log("Login Unmount");
		
	}
	
	componetnDidUpdate() {
		console.log("Login componetn Did Update");
	}

	componetnWillUpdate() {
		console.log("Login componetn Wil Update");
	}

	cancel() {
		this.props.callbackFromParent(false);
//		this.popupVisibility = false;
//		this.setState({
//			display: "none"
//		})
//		return {}
		
	}
	
render() {

	console.log("in render");

	return(
		<div id="pop" className="modal" style = {{display:this.popupVisibility}}>
			<form className="modal-content" style={{width:"30%"}} method = "post">
				<div className="container">
					<label  id= "namelbl" style ={{visibility: this.nameVisibility}}><b>Name</b></label> 
					<input style ={{visibility: this.nameVisibility, backgroundColor: '#fff'}} type="text" placeholder="Enter Name" ref={(input) => { this.nameInput = input }} id = "name" name="name"></input>
					<label><b>Email</b></label> 
					<input style={{backgroundColor: "#fff"}} type="email" placeholder="Enter Email" ref={(input) => { this.emailInput = input }} id = "email" name="email"></input>
					<label><b>Password</b></label> 
					<input type="password" placeholder="Enter Password" id = "password" ref={(input) => { this.passwordInput = input }} name="psw"></input>
					<span className="name_help" id="pop_help"></span>
				</div>
	
				<div className="container" style={{backgroundColor: "#f1f1f1"}}>
					<button type="button" style={{width:"auto"}} className = "loginbtn" id="submit" onClick = {this.submit}>{this.props.viewId}</button>
					<button type="button" style={{width:"auto"}}
						onClick={this.cancel} className="cancelbtn">Cancel</button><br/><br/>
					<a onClick = {this.signInUsingGoogle}>Sign In using Google account..</a>
				</div>
			</form>
		</div>
	
		);
	}
};

export default login