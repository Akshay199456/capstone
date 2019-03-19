import React from 'react';

import YouTubeMusic from '../YouTubeMusic';
import LastFm from '../LastFm';


const MusicComponent = (props) =>{
	return(
			<div> 
				{ props.youTubeMusicVideosLength === 0 ? null : <YouTubeMusic youTubeMusicVideos={props.youTubeMusicVideos}/>}
				{ props.lastFmResultsLength === 0 ? null : <LastFm lastFmResults={props.lastFmResults}/>}
			</div> 
	);
}

export default MusicComponent;