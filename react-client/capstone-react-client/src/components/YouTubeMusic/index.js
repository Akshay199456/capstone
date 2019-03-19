import React from 'react';
import './index.css';

const YouTubeMusic = (props) =>{
	console.log("Props from YouTube Music:", props);
	const videos = props.youTubeMusicVideos.map((item, index) =>{
		console.log("Video ID: https://www.youtube.com/embed/"+item.id.videoId);
		return(
			<div key={index}>
				<div className='column column-5 border'>
					<div>
						<iframe
							title="This is a unique title"
							width="532" 
							height="315" 
							src={'https://www.youtube.com/embed/'+item.id.videoId} 
							frameBorder="0" 
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen>
						</iframe>
					</div>
					<div className='fontTumblr centerText'> <strong> Title: </strong> {item.snippet.title}</div>
					<div className='fontTumblr centerText'> <strong> Published At: </strong> {item.snippet.publishedAt}</div>
					<div className='fontTumblr centerText'> <strong> Channel Title: </strong> {item.snippet.channelTitle} </div> 
					<div className='fontTumblr centerText'> <strong> Description: </strong> {item.snippet.description} </div> 
				</div>
			</div>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> YouTube Music Videos </h1>
				<div className="row">
					{videos}
				</div>
			</div> 
	);
}

export default YouTubeMusic;