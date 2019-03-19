import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import ProfileView from '../../components/ProfileView';
import { Segment } from 'semantic-ui-react';

class ViewProfileContainer extends Component{
	constructor(){
		super();

		this.state ={
			userId: localStorage.getItem('viewProfile'),
			user: []
		}

	}

	componentDidMount(){
		this.fetchProfileDetails();
	}

	fetchProfileDetails = async () =>{
		console.log("Fetch Profile Details!");
		const response = await fetch('http://localhost:9000/api/v1/user/show/'+ this.state.userId, {
			credentials: 'include'
		});

		console.log('Response form ViewProfileContainer: ', response);

		const parsedResponse = await response.json();
		console.log('Parsed Response from ViewProfileContainer: ', parsedResponse);

		this.setState({
			user: parsedResponse.user
		});
	}

	render(){
		return(
			<div>
				<Navbar/> 
				<ProfileView user={this.state.user}/>
			</div> 
		);
	}
}

export default ViewProfileContainer;