import React, { Component } from 'react';
import ErrorMessage from '../../components/ErrorMessage';
import SuccessMessage from '../../components/SuccessMessage';
import EditProfileComponent from '../../components/EditProfileComponent';
import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';

class EditProfile extends Component{
	constructor(){
		super();

		this.state ={
			username: '',
			password: '',
			confirmPassword: '',
			responseObtained: {},
			errorMessage: false,
			errorMessageString: '',
			successMessage: ''
		}
	}


	handleSubmit = async (e) =>{
		e.preventDefault();
		console.log("Handle Submit Activated");

		const usernameRegex = /^[\w]{3,10}$/
	    const passwordRegex = /^[\w]{3,10}$/

	    const usernameTest = usernameRegex.test(this.state.username);
	    const passwordTest = passwordRegex.test(this.state.password);

	    if(usernameTest && passwordTest){
	    	if(this.state.password === this.state.confirmPassword){
	    		console.log('Password check met! Wait while we updated your password');

	    		const updatedInfo = {};
	    		updatedInfo.username = this.state.username;
	    		updatedInfo.password = this.state.password;

	    		const response = await fetch('http://localhost:9000/api/v1/user/' + JSON.parse(localStorage.getItem('session')).userId, {
	    			method: 'PUT',
	    			credentials: 'include',
	    			body: JSON.stringify(updatedInfo),
					headers: {
         		 		'Content-Type': 'application/json'
        			}
	    		});

	    		if(response.ok){
	    			const parsedResponse = await response.json();
	    			console.log('Parsed Response from handleSubmit: ', parsedResponse);

	    			const updatedResponse = await fetch('http://localhost:9000/api/v1/user/show/' + JSON.parse(localStorage.getItem('session')).userId, {
	    				credentials: 'include'
	    			});

	    			if(updatedResponse.ok){
	    				const updatedParsedResponse = await updatedResponse.json();
	    				console.log('Updated Parsed Response from handleSubmit: ', updatedParsedResponse);
	    				localStorage.setItem('currentUserDetails', JSON.stringify(updatedParsedResponse.user));
	    			}
	    		}

	    		// Remaining: 1. Need to update the user in the backend with the details sent;
	    		// 2. Need to update cookie in the frontend that stores the current user details with the updated
	    		// username and password [currentUserDetails]
	    		// 3. Verify it works properly
	    		// 4. Start design & css, troubleshooting
	    		// 5. Try stretch goals

	    		this.setState({
					errorMessage: false,
					errorMessageString: '',
					successMessage: 'User details successfully updated!'
				});
	    	}

	    	else{
	    		this.setState({
	    			errorMessage: true,
	    			errorMessageString: 'Password and Verify Password don\'t match. Please make sure they are the same.'
	    		});
	    	}
	    }

	    else if(!usernameTest){
	    	this.setState({
	    		errorMessage: true,
	    		errorMessageString: 'Username does not meet standard. Username must be alphanumeric with atleast 3 and atmost 10 characters'
	    	});
	    }

	    else if(!passwordTest){
	    	this.setState({
	    		errorMessage: true,
	    		errorMessageString: 'Password does not meet standard. Password must be alphanumeric with atleast 3 and atmost 10 characters'
	    	});
	    }
	}

	handleChange = (e) =>{
		console.log("Handle Change Activated");
		this.setState({
			[e.target.name] : e.target.value
		});
	}

	render(){
		console.log("State: ", this.state);
		return(
			<div>
				<Navbar/>
				<EditProfileComponent handleChange={this.handleChange} handleSubmit = {this.handleSubmit}/>
				{ this.state.errorMessage ?<ErrorMessage errorMessage={this.state.errorMessageString}/> : null}
				{ this.state.successMessage !== '' ?
                  <SuccessMessage successMessage={this.state.successMessage}/> : null
              	}
			</div>
		);
	}
}


export default EditProfile