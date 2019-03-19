import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import YouTubeMusic from '../../components/YouTubeMusic';
import YouTubeTrending from '../../components/YouTubeTrending';


class YouTubeMusicContainer extends Component{
	constructor(){
		super();

		this.state ={
			queryString: localStorage.getItem('queryString'),


			youTubeMusicVideos: JSON.parse(localStorage.getItem('youTubeMusicVideos')),
			trendingMusicVideos: [],
		}
	}

	componentDidMount = async () => {
		await this.fetchYouTubeMusicTrending();
	}

	fetchYouTubeMusicTrending = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/trending/youtubemusic', {
			credentials: 'include'
		});
		console.log("Response from YouTube Trending", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed Response from YouTube Trending", parsedResponse);

			const articles = [];
			const data = parsedResponse.data.items;

			for(let i=0; i<data.length; i++){
				articles.push(data[i]);
			}

			this.setState({
				trendingMusicVideos: articles
			});
		}
	}

	render(){
		console.log("State from YouTube Music Container: ", this.state);
		return(
			<div>
				<Navbar/>
				{ this.state.youTubeMusicVideos.length === 0 ? null : <YouTubeMusic youTubeMusicVideos={this.state.youTubeMusicVideos}/>}
				{ this.state.trendingMusicVideos.length === 0 ? null : <YouTubeTrending name={'YouTube Music'} trendingVideos={this.state.trendingMusicVideos}/>}
			</div>
		);
	}
}

export default YouTubeMusicContainer;