import React from 'react';

import YouTube from '../YouTube';
import Tumblr from '../Tumblr';

import { Button } from 'semantic-ui-react'
import './index.css';

const EntertainmentComponent = (props) =>{
	return(
			<div> 
				{ props.youTubeVideosLength === 0 ? null : <YouTube youTubeVideos={props.youTubeVideos}/>}
				{ props.tumblrDataLength === 0 ? null : <Tumblr tumblrData={props.tumblrData}/>}
				
			</div> 
	);
}

export default EntertainmentComponent;