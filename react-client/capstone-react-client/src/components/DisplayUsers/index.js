import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const DisplayUsers = (props) =>{

	const users = props.users.map((item, index) =>{
		return(
			<Segment raised key={index} className='centerText'>
				<div className='fontTumblr'> <strong> Email: </strong>{item.email}</div>
				<div className='fontTumblr'> <strong> Username: </strong> {item.username}</div>
				<div className='fontTumblr'> <strong> User id: </strong> {item._id}</div>
				<Button color='green' onClick={props.viewProfile.bind(null, item._id)}> View Profile </Button>
			</Segment>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> Matching Users </h1>
				{users}
			</div> 
	);
}

export default DisplayUsers;