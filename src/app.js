import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './header'
import {fire} from './firebase1'

// create a react class ChatApp as a component
class ChatApp extends React.Component {
		
		// making the constructor
		constructor(props,context) {
			super(props,context);
			// binding the onchange and onclick event
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.callBackFromHeaderAfterLogin = this.callBackFromHeaderAfterLogin.bind(this);

			// maintaining the state of the component
			this.state = {
				message : "",
				messages : [],
				authenticated:false
			}
			
			
		}
		
		// method called by system where we load all the existing messages. It was called as we load the page
		componentWillMount() {
			// setting the event on value changed and will load all the messages into the component state
			fire.database().ref('chatbox/').on('value', (msgs) => {
				const currMessages = msgs.val();
				if(currMessages !=null) {
					this.setState({
						messages: currMessages
					})
				}
			})
		}
		
		// handle change function
		handleChange(event) {
			// setting the message state after each key press on the textbox
			this.setState({
				message: event.target.value
			})
			if (event.keyCode == 13) {
			this.handleSubmit();
		}
		}
		
		// handle submit function
		handleSubmit() {
			
			// creating a new JSON message by taking the message state value stored during handlechange event
			const newMessage = {
				id: this.state.messages.length, 
				text : this.state.message
			}
			
			firebase.database().ref('chatbox/'+newMessage.id).set(newMessage)
			//setting the value of textbox field to blank
			document.getElementById("usermsg").value = "";
			
		}
		
		callBackFromHeaderAfterLogin(authenticated) {
			console.log("APp callback");
			this.setState({
				authenticated : authenticated
			})
		}
	

		
	//	rendering the react component
	render() {
		// iterating and mapping the messages state and printing them on chatbox div one by one
		const msgs =  this.state.authenticated ? this.state.messages.map((message) => {
			return(
					<div  key = {message.id}>
						<div id = "spacing">
							<div id="pic"></div>
						</div>
						<div id = "message"> 
							{message.text}
						</div> <br />
					</div>

			)
		}) : null;
		
		return(
				<div id ="chatbox-container">
				<Header authenticated = {this.state.authenticated} callBackAuthenticated = {this.callBackFromHeaderAfterLogin} />
					<div id = "chatbox"> 
							{msgs}
					</div>
					<input id = "usermsg" type = "text" size="53" onChange = {this.handleChange} ></input>
					<button style={{width:"auto"}} name="submitmsg"
						id="submitmsg" onClick= {this.handleSubmit}> Submit </button>
				</div>
		
		);
	}
};

// creating and calling the new chatapp component and render it and pass it to div with id = app in index html page to show in browser
ReactDOM.render(<ChatApp />, document.getElementById('app'))
export default app