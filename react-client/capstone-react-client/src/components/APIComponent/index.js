import React from 'react';

import YouTube from '../YouTube';
import Tumblr from '../Tumblr';

import NYTNews from '../NYTNews';
import NewsAPI from '../NewsAPI';
import TechCrunch from '../TechCrunch';

import YouTubeMusic from '../YouTubeMusic';
import LastFm from '../LastFm';

const APIComponent = (props) =>{
	return(
			<div> 
				{ props.youTubeVideosLength === 0 ? null : <YouTube youTubeVideos={props.youTubeVideos}/>}
				{ props.tumblrDataLength === 0 ? null : <Tumblr tumblrData={props.tumblrData}/>}

				{ props.nytArticlesLength === 0 ? null : <NYTNews nytArticles={props.nytArticles}/>}
				{ props.newsAPIArticlesLength === 0 ? null : <NewsAPI newsAPIArticles={props.newsAPIArticles}/>}
				{ props.techCrunchArticlesLength === 0 ? null : <TechCrunch techCrunchArticles={props.techCrunchArticles}/>}
				
				{ props.youTubeMusicVideosLength === 0 ? null : <YouTubeMusic youTubeMusicVideos={props.youTubeMusicVideos}/>}
				{ props.lastFmResultsLength === 0 ? null : <LastFm lastFmResults={props.lastFmResults}/>}
			</div> 
	);
}

export default APIComponent;