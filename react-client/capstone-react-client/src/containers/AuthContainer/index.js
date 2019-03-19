import React, { Component } from 'react';
import Login from '../../components/Login';
import Register from '../../components/Register';
import SuccessMessage from '../../components/SuccessMessage';
import ErrorMessage from '../../components/ErrorMessage';
import { Grid, Header } from 'semantic-ui-react';
import './index.css';

class AuthContainer extends Component{

	constructor(){
		super();

		this.state ={
			login:{
				email: '',
				password: '',
				successful: false
			},

			register:{
				username: '',
				password: '',
				verify_password: '',
				email: '',
				successful: false
			},

			loginButton: true,
			successMessage: '',
			errorMessage: ''
		}
	}


	handleLoginChange = (e) =>{
		const updatedChange = {
			...this.state.login
		}
		updatedChange[e.target.name] = e.target.value;

		this.setState({
			login: updatedChange
		});

		// console.log("State from handleLoginChange: ", this.state);
	}

	handleLoginSubmit = async (e) =>{
		e.preventDefault();
		const updatedLogin = {
			...this.state.login //spreads current value of login into updatedLogin
		}

		// console.log("State from handleLoginSubmit: ", this.state);
		const response = await fetch('http://localhost:9000/api/v1/auth/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(updatedLogin),
			headers: {
				'Content-Type': 'application/json'
				}
			});

		const parsedResponse = await response.json();
		// console.log('Parsed response from handleLoginSubmit: ', parsedResponse);

		if(response.ok){
			// console.log("Successful Parsed Response from handleLoginSubmit: ", parsedResponse);
			this.setState({
				successMessage: parsedResponse.success,
				errorMessage: ''
			});

			// Storing current user info as a cookie
			localStorage.setItem('session', JSON.stringify(parsedResponse.session));
			localStorage.setItem('navbar', 'home');
			this.props.history.push('/home');


		}

		else{
			// console.log("Failed Parsed Response from handleLoginSubmit: ", parsedResponse);
			this.setState({
				errorMessage: parsedResponse.error,
				successMessage: ''
			});
		}
	}


	// Need to clear off the state whenenver there is a change in the view
	triggerLoginView = ()=>{
		const resetRegister = {
			...this.state.register
		}

		// console.log("ResetRegister from triggerLoginView: ", resetRegister);
		resetRegister.username =  '';
		resetRegister.email =  '';
		resetRegister.password = '';
		resetRegister.verify_password =  '';

		// console.log("After reset: ", resetLogin);

		this.setState({
			register: resetRegister,
			loginButton: true
		});

		// console.log("State from triggerRegisterView: ", this.state);
	}

	handleRegisterChange = (e) => {
		const updatedChange = {
			...this.state.register
		}
		updatedChange[e.target.name] = e.target.value;

		this.setState({
			register: updatedChange
		});

		// console.log("State from handleRegisterChange: ", this.state)
	}

	handleRegisterSubmit = async (e) =>{
		e.preventDefault();
		const updatedRegister = {
			...this.state.register //spreads current value of register into updatedRegister
		}

		// console.log("State from handleRegisterSubmit: ", this.state);
		const response = await fetch('http://localhost:9000/api/v1/auth/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(updatedRegister),
			headers: {
				'Content-Type': 'application/json'
				}
			});


		// console.log("Response: ", response);
		const parsedResponse = await response.json();
		if(response.ok){
			// console.log("Successful Parsed Response from handleRegisterSubmit: ", parsedResponse);
			this.setState({
				successMessage: parsedResponse.success,
				errorMessage: ''
			});

			// Storing current user info as a cookie
			localStorage.setItem('session', JSON.stringify(parsedResponse.session));
			localStorage.setItem('navbar', 'home');
			this.props.history.push('/home');
		}

		else{
			// console.log("Failed Parsed Response from handleRegisterSubmit: ", parsedResponse);
			this.setState({
				errorMessage: parsedResponse.error,
				successMessage: ''
			})

		}
	}


	// Need to clear off the state whenenver there is a change in the view
	triggerRegisterView = ()=>{
		const resetLogin = {
			...this.state.login
		}

		// console.log("ResetLogin from triggerRegisterView: ", resetLogin);
		resetLogin.email =  '';
		resetLogin.password = '';
		// console.log("After reset: ", resetLogin);

		this.setState({
			login: resetLogin,
			loginButton: false
		});

		// console.log("State from triggerRegisterView: ", this.state);
	}

/*
<div className='box box1'>
					</div>
					<div className='box box2'>
					</div>
					<div className='box box3'>
					</div>
					<div className='box box4'>
					</div>
					<div className='box box5'>
					</div>
					<div className='box box6'>
					</div>
					</div>

<div className = 'bg'>
					 
				</div>
*/
	render(){
		// console.log("State from render: ", this.state);

		return(
				<div className='row'>
					<div className='authentication column column-4'>
						{this.state.loginButton ? <Login handleLoginChange={this.handleLoginChange} handleLoginSubmit={this.handleLoginSubmit} triggerRegisterView={this.triggerRegisterView}/>
							:
							<Register handleRegisterChange={this.handleRegisterChange} handleRegisterSubmit={this.handleRegisterSubmit} triggerLoginView={this.triggerLoginView}/>
						}
						{ this.state.errorMessage !== '' ?
					       	<ErrorMessage errorMessage={this.state.errorMessage}/> : null
					    }

						{ this.state.successMessage !== '' ?
					        <SuccessMessage successMessage={this.state.successMessage}/> : null
					    }
					</div>

					<div className='column column-8 bgBlack'>
						<div className='row'>
							<h1 className='text'> Get Real-Time Information With Videos, Songs, Articles</h1>
							<h1 className='text'> and News From Different Sources. </h1>
						</div>
						<div className='row'> 
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box1'></div>
							</div>
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box2'></div>
							</div>
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box3'></div>
							</div>
						</div>

						<div className='row'> 
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box4'></div>
							</div>
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box5'></div>
							</div>
							<div className = 'boxColumn column column-4 bgBlack'> 
								<div className='box box6'></div>
							</div>
						</div>
					</div>						
				</div>
		);
	}
}

export default AuthContainer;