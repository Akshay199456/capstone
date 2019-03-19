import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import YouTube from '../../components/YouTube';
import YouTubeTrending from '../../components/YouTubeTrending';


class YouTubeContainer extends Component{
	constructor(){
		super();

		this.state ={
			queryString: localStorage.getItem('queryString'),


			youTubeVideos: JSON.parse(localStorage.getItem('youTubeVideos')),
			trendingVideos: [],
		}
	}

	componentDidMount = async () => {
		await this.fetchYouTubeTrending();
	}

	fetchYouTubeTrending = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/trending/youtube', {
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
				trendingVideos: articles
			});
		}
	}

	render(){
		console.log("State from YouTube Container: ", this.state);
		return(
			<div>
				<Navbar/>
				{ this.state.youTubeVideos.length === 0 ? null : <YouTube youTubeVideos={this.state.youTubeVideos}/>}
				{ this.state.trendingVideos.length === 0 ? null : <YouTubeTrending name={'YouTube'} trendingVideos={this.state.trendingVideos}/>}
			</div>
		);
	}
}

export default YouTubeContainer;