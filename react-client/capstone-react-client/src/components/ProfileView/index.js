import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';
import './index.css';

const ProfileView = (props) =>{

	const currentUser = JSON.parse(localStorage.getItem('session'));
	const currentUserId = currentUser.userId;
	console.log("Current User Id: ", currentUserId);
	
	const viewProfileId = localStorage.getItem('viewProfile');
	console.log('View Profile Id: ', viewProfileId);

	const currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
	console.log('Current User Details: ', currentUserDetails);

	const searchUsers = () =>{
		console.log("Props: ", props);
		props.history.push('/find');
	}

	const editProfile = () =>{
		props.history.push('/editProfile');
	}

	const deleteProfile = async () =>{
		console.log("Delete profile clicked!");
		console.log("User to be deleted: ", currentUser);
		const response = await fetch('http://localhost:9000/api/v1/user/'+ currentUserId, {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
			credentials: 'include'
		});
		console.log('Response from deleteProfile: ', response);

		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response from deleteProfile: ', parsedResponse);

			// Delete front end cookies
		    localStorage.removeItem('session');
		    localStorage.removeItem('queryString');
		    localStorage.removeItem('viewProfile');
		    localStorage.removeItem('currentUserDetails');
		    localStorage.removeItem('navbar');

		    // Deleting data for entertainment category
			localStorage.removeItem('youTubeVideos');
			localStorage.removeItem('youTubeVideosCount');
			localStorage.removeItem('tumblrData')
			localStorage.removeItem('tumblrDataCount');

			// Delete data for news category
			localStorage.removeItem('nytArticles');
			localStorage.removeItem('nytArticlesCount');
			localStorage.removeItem('newsAPIArticles');
			localStorage.removeItem('newsAPIArticlesCount');
			localStorage.removeItem('techCrunchArticles');
			localStorage.removeItem('techCrunchArticlesCount');

			// Delete data for music category
			localStorage.removeItem('youTubeMusicVideos');
			localStorage.removeItem('youTubeMusicVideosCount');
			localStorage.removeItem('lastFmResults');
			localStorage.removeItem('lastFmResultsCount');

			props.history.push('/');
		}
	}


	return(
		<div>
			<div className='buttonGroup'>
				<Button.Group widths='3'>
					<Button primary onClick={searchUsers}> Search Users </Button>
					{ currentUserId === viewProfileId ? <Button primary onClick={editProfile}> Edit Profile </Button> : null}
					{ currentUserId === viewProfileId ? <Button primary onClick={deleteProfile}> Delete Profile </Button> : null} 
				</Button.Group>
			</div>

			<div className='column column-2'>
			</div>
			{
				(props.user.length !== 0 && currentUserId!==viewProfileId ) ?
				<div className='userProfileMargin'>
					<div className='column column-8'>
						<div className='column column-3'>
							<Image src='/user.png'/>
						</div>
						<div className='column column-9'>
							<div className='centerText lineHeight fontTumblr'> <strong> Username: </strong> {props.user.username} </div>
							<div className='centerText lineHeight fontTumblr'> <strong> Email: </strong> {props.user.email} </div>
							<div className='centerText lineHeight fontTumblr'> <strong> User ID: </strong> {props.user._id} </div>
						</div>
					</div>
				</div> : 

				<div className='userProfileMargin'>
					<div className='column column-8'>
						<div className='column column-3'>
							<Image src='/user.png'/>
						</div>
						<div className='column column-9'>
							<div className='centerText lineHeight fontTumblr'> <strong> Username:</strong>  {currentUserDetails.username} </div>
							<div className='centerText lineHeight fontTumblr'> <strong> Email: </strong> {currentUserDetails.email} </div>
							<div className='centerText lineHeight fontTumblr'> <strong> User ID: </strong> {currentUserDetails._id} </div>
						</div>
					</div>
				</div>
			}

			<div className='column column-2'>
			</div>
		</div>
	);
}

export default withRouter(ProfileView);