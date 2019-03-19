import React from 'react';
import { Route, Switch } from 'react-router-dom';


// Base Containers/ Components
import AuthContainer from '../../containers/AuthContainer';
import HomeContainer from '../../containers/HomeContainer';
import ResultContainer from '../../containers/ResultContainer';
import SearchUserContainer from '../../containers/SearchUserContainer';
import ViewProfileContainer from '../../containers/ViewProfileContainer';
import EditProfileContainer from '../../containers/EditProfileContainer';

// Categories Container
import EntertainmentContainer from '../../containers/EntertainmentContainer';
import NewsContainer from '../../containers/NewsContainer';
import MusicContainer from '../../containers/MusicContainer';


// Platform Container

// A. News Containers
import NYTContainer from '../../containers/NYTContainer';
import NewsAPIContainer from '../../containers/NewsAPIContainer';
import TechCrunchContainer from '../../containers/TechCrunchContainer';

// B. Music Containers
import LastFmContainer from '../../containers/LastFmContainer';
import YouTubeMusicContainer from '../../containers/YouTubeMusicContainer';

// C. Entertainment Containers
import YouTubeContainer from '../../containers/YouTubeContainer';


import My404 from '../404';

const AllRoutes = () => {
	return (
		<Switch>

      		<Route exact path = '/' component= {AuthContainer} />
      		<Route exact path = '/home' component = {HomeContainer}/>
      		<Route exact path = '/result' component = {ResultContainer}/>
                  <Route exact path = '/find' component = {SearchUserContainer}/>
                  <Route exact path = '/viewProfile' component = {ViewProfileContainer}/>
                  <Route exact path = '/editProfile' component = {EditProfileContainer}/>

                  <Route exact path = '/news' component = {NewsContainer}/>
      		<Route exact path = '/music' component = {MusicContainer}/>
                  <Route exact path = '/entertainment' component = {EntertainmentContainer}/>

                  <Route exact path = '/entertainment/youtube' component = {YouTubeContainer}/>                  

                  <Route exact path = '/news/newsapi' component = {NewsAPIContainer}/>
                  <Route exact path = '/news/techcrunch' component = {TechCrunchContainer}/>
                  <Route exact path = '/news/nyt' component = {NYTContainer}/>

                  <Route exact path = '/music/lastfm' component = {LastFmContainer}/>
                  <Route exact path = '/music/youtubemusic' component = {YouTubeMusicContainer}/>


      		<Route component={My404} />
      	</Switch>
		)
}

export default AllRoutes;