import React, {Component} from 'react'
import Login from './login'
import {fire, gglProvider} from './firebase1'

class header extends React.Component {
	
constructor() {
	super();
	this.signInSignOut = this.signInSignOut.bind(this);
	this.signUp = this.signUp.bind(this);
	this.myCallBack = this.myCallBack.bind(this);
	this.callBackForGoogleSignIn = this.callBackForGoogleSignIn.bind(this);
	this.state = {
		popupVisibility : false,
		buttonName: "",
	};
}

signInSignOut() {
	console.log("sign");

	if(this.props.authenticated) {
		if(confirm("Are you sure you want to signout ?")) {
			fire.auth().signOut();
			this.props.callBackAuthenticated(false);
		}
	}else {
		this.setState({
			popupVisibility : true,
			buttonName: "SignIn"
		})
	}
}

signUp() {
	console.log("sign");
	this.setState({
		popupVisibility : true,
		buttonName: "SignUp"
	})
	
}

myCallBack(visibility) {
	console.log("myCallback");
	this.setState({
		popupVisibility : visibility
	})
}

callBackForGoogleSignIn(visibility,authenticated) {
		console.log("googelSignIn");
//		this.props.authenticated = authenticated;
		this.props.callBackAuthenticated(authenticated);
		this.setState({
			popupVisibility: visibility
		})
	
}

componentDidMount() {
	console.log("Header componentDidMount");
}

componentWillMount() {
	console.log("Header componentWillMount");
}


componetnDidUpdate() {
	console.log("Header componetn Did Update");
}

componetnWillUpdate() {
	console.log("Header componetn Wil Update");
}

componentWillUnmount() {
	console.log("header Unmount");
	
}


render() {
	
	
	return(
			<div id="menu" >
		        <button style={{width:"auto", visibility:this.props.authenticated ? 'hidden': 'visible'}} id="sign-up" className = "right" onClick = {this.signUp}>Sign-up</button>
				<button style={{width:"auto"}} id="sign-in"
							className="right" onClick={this.signInSignOut}>{this.props.authenticated ? 'SignOut' : 'SignIn'}</button>
				<h2><b>Chat Application</b></h2>
				{this.props.authenticated ? null : this.state.popupVisibility ? <Login viewId = {this.state.buttonName} popupVisibility = {this.state.popupVisibility} callbackFromParent={this.myCallBack} callBackForGoogleSignIn = {this.callBackForGoogleSignIn}/> : null}
			</div>
	
	);
	
	}
};

export default header