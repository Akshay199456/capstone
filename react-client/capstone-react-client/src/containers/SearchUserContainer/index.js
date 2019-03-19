import React, { Component } from 'react';
import { Button, Form} from 'semantic-ui-react';
import Navbar from '../../components/Navbar';
import DisplayUsers from '../../components/DisplayUsers';
import './index.css';

class SearchUserContainer extends Component{
	constructor(){
		super();

		this.state ={
			findUser: '',
			count: 0,
			users: [],
			found: undefined,
			errorMessage: ''
		}
	}

	handleChange = (e) =>{	
		this.setState({
			[e.target.name]: e.target.value
		});

		// console.log("State from handleChange: ", this.state);
	}

	handleSubmit = async (e) =>{	
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});

		const response = await fetch('http://localhost:9000/api/v1/user/findUser/'+ this.state.findUser, {
			credentials: 'include'
		});

		console.log('Response from handleSubmit: ', response);

		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			this.setState({
				count: parsedResponse.user.length,
				users: parsedResponse.user
			});

			if(this.state.count === 0){
				this.setState({
					found: false
				});
			}

			else{
				this.setState({
					found: true
				});
			}
		}
		// console.log("State from handleSubmit: ", this.state);
	}

	viewProfile = (id) =>{
		console.log("Viewing Profile");
		console.log("User id: ", id);

		localStorage.setItem('viewProfile', id);
		this.props.history.push('/viewProfile');
	}

	render(){
		console.log("State from render: ", this.state);
		return(
			<div>
				<Navbar/>
				<div className= 'row marginTopSearch'>
					<div className='column column-3'>
					</div>

					<div className='column column-6'>
						<Form onSubmit={this.handleSubmit}>
							<Form.Input type='text' name='findUser' placeholder='Enter username to find user' onChange={this.handleChange}/>
							<Button type='submit' color='blue' fluid> Search </Button>
						</Form>
						<div className='marginMatch'> { this.state.count !== 0 ? <DisplayUsers users={this.state.users} viewProfile={this.viewProfile}/> : null} </div>
						{ this.state.found === false ? <div> <img className='marginComponent' src='/giphy.gif'/> </div> : null}
					</div>

					<div className='column column-3'>
					</div>
				</div>
			</div>
		);
	}
}

export default SearchUserContainer;