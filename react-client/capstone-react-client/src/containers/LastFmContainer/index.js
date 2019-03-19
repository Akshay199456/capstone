import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import LastFm from '../../components/LastFm';
import LastFmTopTracks from '../../components/LastFmTopTracks';
import LastFmTopArtists from '../../components/LastFmTopArtists';

class LastFmContainer extends Component{
	constructor(){
		super();

		this.state ={
			queryString: localStorage.getItem('queryString'),


			lastFmResults: JSON.parse(localStorage.getItem('lastFmResults')),
			topTracks: [],
			topArtists: []
		}
	}

	componentDidMount = async () => {
		await this.fetchTopTracks();
		await this.fetchTopArtists();

	}

	fetchTopTracks = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/toptracks/lastfm', {
			credentials: 'include'
		});
		console.log("Response from Top Tracks Last Fm", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed Response from Top Tracks Last Fm", parsedResponse);

			const articles = [];
			const data = parsedResponse.data.tracks.track;

			for(let i=0; i<data.length; i++){
				articles.push(data[i]);
			}

			this.setState({
				topTracks: articles
			});
		}
	}

	fetchTopArtists = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/topartists/lastfm', {
			credentials: 'include'
		});
		console.log("Top Artists from Last Fm Response: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Top Artists from Last Fm parsed response: ", parsedResponse);

			const articles = [];
			const data = parsedResponse.data.artists.artist;

			for(let i=0; i<data.length; i++){
				articles.push(data[i]);
			}

			this.setState({
				topArtists: articles
			});
		}
	}

	render(){
		console.log("State from Last Fm Container: ", this.state);
		return(
			<div>
				<Navbar/>
				{ this.state.lastFmResults.length === 0 ? null : <LastFm lastFmResults={this.state.lastFmResults}/>}
				{ this.state.topTracks.length === 0 ? null : <LastFmTopTracks topTracks={this.state.topTracks}/>}
				{ this.state.topArtists.length === 0 ? null : <LastFmTopArtists topArtists={this.state.topArtists}/>}
			</div>
		);
	}
}

export default LastFmContainer;