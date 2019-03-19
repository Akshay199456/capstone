import React from 'react';
import { Segment } from 'semantic-ui-react';

const YouTubeTrending = (props) =>{

	const videos = props.trendingVideos.map((item, index) =>{
		let videoEmbeddedLink = 'https://www.youtube.com/embed/'+item.id;
		return(
			<div key={index}>
				<div className='column column-5 border'>
					<iframe
						title="This is a unique title"
						width="533" 
						height="315" 
						src={videoEmbeddedLink} 
						frameBorder="0" 
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen>
					</iframe>
					<div className='fontTumblr centerText'>  <strong> Video Title:</strong> {item.snippet.title}</div>
					<div className='fontTumblr centerText'>  <strong> Published At:</strong> {item.snippet.publishedAt}</div>
					<div className='fontTumblr centerText'>  <strong> Channel Title:</strong> {item.snippet.channelTitle}</div>
					<h3 className='fontTumblr centerText'>  <strong> Statistics:</strong> </h3>
					<div className='fontTumblr centerText'>  <strong> Comment Count:</strong> {item.statistics.commentCount}</div>
					<div className='fontTumblr centerText'>  <strong> Dislike Count: </strong>{item.statistics.dislikeCount}</div>
					<div className='fontTumblr centerText'>  <strong> Like Count:</strong> {item.statistics.likeCount}</div>
					<div className='fontTumblr centerText'>  <strong> View Count:</strong> {item.statistics.viewCount}</div>
				</div>
			</div>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> {props.name} Trending Videos </h1>
				<div className="row">
					{videos}
				</div>
			</div> 
	);
}

export default YouTubeTrending;