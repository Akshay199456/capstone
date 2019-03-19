import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import MusicComponent from '../../components/MusicComponent';
import DisplayPieChart from '../../components/DisplayPieChart';
import { Button } from 'semantic-ui-react';

class MusicContainer extends Component{
	constructor(){
		super();

		this.state = {
			youTubeMusicVideos: JSON.parse(localStorage.getItem('youTubeMusicVideos')),
			youTubeMusicVideosCount: JSON.parse(localStorage.getItem('youTubeMusicVideosCount')),
			youTubeMusicVideosPercentage: 0,
			lastFmResults: JSON.parse(localStorage.getItem('lastFmResults')),
			lastFmResultsCount: JSON.parse(localStorage.getItem('lastFmResultsCount')),
			lastFmResultsPercentage: 0,

			dataReadyToDisplay: false
		}
	}

	componentDidMount = async () => {
		await this.generateStatsMusic();
	}


	generateDegreeEquivalent = (category1Data, category2Data, category3Data) =>{
		const total = category1Data + category2Data + category3Data;
		const degree1 = Math.round((category1Data/total)*360);
		const degree2 = Math.round((category2Data/total)*360);
		const degree3 = Math.round((category3Data/total)*360);

		console.log("YouTube Music Percentage: ", degree1);
		console.log("Last Fm Percentage: ", degree2);
		
		this.setState({
			youTubeMusicVideosPercentage: degree1,
			lastFmResultsPercentage: degree2
		});
	}

	generateStatsMusic = () =>{
		console.log("We have triggered generateStatsMusic");

		this.generateDegreeEquivalent(this.state.youTubeMusicVideosCount, this.state.lastFmResultsCount, 0);
		console.log("State from generateStatsNews: ", this.state);
	}

	setDataReady = () =>{
		const value = this.state.dataReadyToDisplay;
		this.setState({
			dataReadyToDisplay: !value
		});
	}

	travelYouTubeMusic = () =>{
		this.props.history.push('/music/youtubemusic');
	}

	travelLastFm = () =>{
		this.props.history.push('/music/lastfm');
	}

	render(){
		console.log("State from MusicContainer: ", this.state);
		return(
			<div>
				<Navbar/>
				<div className='buttonGroup'>
					<Button.Group widths='3'>
						<Button primary onClick={this.travelYouTubeMusic}> Explore YouTube Music </Button>
						<Button primary onClick={this.travelLastFm}> Explore Last.Fm </Button>
						{  this.state.dataReadyToDisplay ? 
							<Button primary onClick={this.setDataReady}> 
								Hide Results 
							</Button>
							:
							<Button primary onClick={this.setDataReady}> 
								Analyze Results 
							</Button>
						}
					</Button.Group>
				</div>

				<DisplayPieChart 
					angle1 = {this.state.youTubeMusicVideosPercentage} label1={'YouTube Music'}
					angle2 = {this.state.lastFmResultsPercentage} label2={'Last Fm'}
					angle3 = {0} label3={''}
					setDataReady = {this.setDataReady}
					dataReadyToDisplay = {this.state.dataReadyToDisplay}
				/>

				<MusicComponent 
					youTubeMusicVideos={this.state.youTubeMusicVideos} youTubeMusicVideosLength = {this.state.youTubeMusicVideos.length} travelYouTubeMusic={this.travelYouTubeMusic}
					lastFmResults={this.state.lastFmResults} lastFmResultsLength = {this.state.lastFmResults.length} travelLastFm={this.travelLastFm}
				/>
			</div>
		);
	}
}

export default MusicContainer;