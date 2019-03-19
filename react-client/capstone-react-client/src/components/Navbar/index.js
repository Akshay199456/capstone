import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

class Navbar extends Component{
  constructor(){
    super();

    this.state = {
      activeItem: localStorage.getItem("navbar")
    }
  }

  // function to logout the user 
	logout = async () => {
	// console.log('Click');
	  try{
	      //Make request to server in backend to delete the user cookie
	       const response = await fetch("http://localhost:9000/api/v1/auth/logout", {
	        credentials: 'include'
	      });

	       if (!response.ok){
	          throw Error(response.error);
	        }

	        else{
	        	const responseParsed = await response.json(); 
	            console.log("logout parsed response: ", responseParsed);


	            // Delete front end cookies
	            localStorage.removeItem('session');
	            localStorage.removeItem('queryString');
	            localStorage.removeItem('viewProfile');
	            localStorage.removeItem('currentUserDetails');

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
				localStorage.removeItem('navbar');


	            // Redirect to sign in page
	            this.props.history.push('/');
	        }
	}

	  catch(err){
	    console.log(err);
	}
}

	home = () =>{
		this.props.history.push('/home');
	}

	profile = () =>{
		const currentUser = JSON.parse(localStorage.getItem('session'));
		console.log('Current User: ', currentUser);
		localStorage.setItem('viewProfile', currentUser.userId);
		this.props.history.push('/viewProfile');
	}


  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if(name === 'home'){
      localStorage.setItem('navbar', 'home');
      this.home();
    }

    else if(name === 'profile'){
      localStorage.setItem('navbar', 'profile');
      this.profile();
    }

    else if(name === 'logout'){
      localStorage.setItem('navbar', 'logout');
      this.logout();

    }
  }

  render(){
    const { activeItem } = this.state
    return (
    	<Segment inverted>
          <Menu fluid widths={3} inverted pointing secondary>
              <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
              />
              <Menu.Item 
                name='home' 
                active={activeItem === 'home'} 
                onClick={this.handleItemClick} 
              />
              <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
              />
          </Menu>
        </Segment>
      )
    }
}


// need to wrap navbar with withRouter to make it get the child properties from BrowserRouter. By default 
// BrowserRouter will only apply its child properties to its children which have been 
// specified in App.js since <App> is enclosed within <BrowserRouter> in index.js
export default withRouter(Navbar);