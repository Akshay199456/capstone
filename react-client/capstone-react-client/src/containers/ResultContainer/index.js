import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import APIComponent from '../../components/APIComponent';
import DisplayPieChart from '../../components/DisplayPieChart';
import { Button } from 'semantic-ui-react'
import './index.css';


class ResultContainer extends Component{
	constructor(){
		super();
		
		this.state ={
			// Data from different platforms
			queryString: localStorage.getItem('queryString'),


			youTubeVideos: [],
			youTubeVideosCount: 0,
			tumblrData: [],
			tumblrDataCount: 0,


			nytArticles: [],
			nytArticlesCount: 0,
			newsAPIArticles: [],
			newsAPIArticlesCount: 0,
			techCrunchArticles: [],
			techCrunchArticlesCount: 0,


			youTubeMusicVideos: [],
			youTubeMusicVideosCount: 0,
			lastFmResults: [],
			lastFmResultsCount: 0,

			// Data to display radial chart
			dataReadyToDisplay: false,
			resultsReady: false,
			entertainmentCount: 0,
			musicCount: 0,
			newsCount: 0,
			entertainmentPercentage: 0,
			musicPercentage: 0,
			newsPercentage: 0 

		}
	}

	componentDidMount = async () => {
		// Fetching results for entertainment category
		await this.fetchYouTubeResults();
		await this.fetchTumblrResults();

		//  Fetching results for news category
		await this.fetchNYTNewsResults();
		await this.fetchNewsAPIResults();
		await this.fetchTechCrunchResults();

		// Fetching results for music category
		await this.fetchYouTubeMusicResults();
		await this.fetchLastFmResults();

		// Generates pie graph for overall stats
		await this.generateStatsOverall();

		// Transfers all data to local Storage
		await this.transferData();
	}

	fetchYouTubeResults = async () => {
		console.log("Query String from fetchYouTubeResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/youtube/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from youtube: ", response);

		if(response.ok){
			const parsedResponse = await response.json();
			console.log("ParsedResponse from Youtube: ", parsedResponse);

			const videoIdArray = [];

			// All the data associated with the search is stored in parsedResponse.data
			const videos = parsedResponse.data.items;
			for (let i=0; i<videos.length; i++){
				if(videos[i].id.videoId !== undefined){
					console.log("Video ID: ", videos[i].id.videoId);
					const embedString = 'https://www.youtube.com/embed/'+videos[i].id.videoId;
					videoIdArray.push(embedString);
				}
			}

			this.setState({
				youTubeVideos: videoIdArray,
				youTubeVideosCount: parsedResponse.data.pageInfo.totalResults
			});
		}
	}

	fetchNYTNewsResults = async () =>{
		console.log("Query String from fetchNYTNewsResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/nytNews/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from NYT News: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse.data.response
			const articles = parsedResponse.data.response.docs;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			this.setState({
				nytArticles: data,
				nytArticlesCount: parsedResponse.data.response.meta.hits
			});
		}
	}


	fetchNewsAPIResults = async () =>{
		console.log("Query String from fetchNewsAPIResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/newsApi/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from Tech Crunch News: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse.data
			const articles = parsedResponse.data.articles;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			this.setState({
				newsAPIArticles: data,
				newsAPIArticlesCount: parsedResponse.data.totalResults
			});
		}
	}



	fetchTechCrunchResults = async () =>{
		console.log("Query String from fetchTechCrunchResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/techcrunch/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from Tech Crunch News: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse.data
			const articles = parsedResponse.data.articles;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			this.setState({
				techCrunchArticles: data,
				techCrunchArticlesCount: parsedResponse.data.totalResults
			});
		}
	}



	fetchMusixMatchResults = async () =>{
		console.log("Query String from fetchMusixMatchResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/musixmatch/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from Musix MAtch News: ", response);
		const parsedResponse = await response.json();
		console.log('Parsed Response: ', parsedResponse);
		// if(response.ok){
		// 	const parsedResponse = await response.json();
		// 	console.log('Parsed Response: ', parsedResponse);

		// 	const data = [];

		// 	// All the data associated with the search is stored in parsedResponse.data
		// 	const articles = parsedResponse.data.articles;
		// 	for(let i=0; i<articles.length; i++){
		// 		// console.log("Article Title: ", articles[i].headline.main);
		// 		data.push(articles[i]);
		// 	}

		// 	console.log("Data: ", data);
		// 	this.setState({
		// 		techCrunchArticles: data
		// 	});
		// }
	}

	fetchTumblrResults = async () =>{
		console.log("Query String from fetchTumblrResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/tumblr/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from Tumblr: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse
			const articles = parsedResponse.data;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			let value;
			if(parsedResponse.blogCount === -1){
				value = parsedResponse.blogInfo.blog.total_posts;
				if(value < 20){
					value = 20;
				}
			}
			else
				value = 20

			this.setState({
				tumblrData: data,
				tumblrDataCount: value
			});
		}

	}

	fetchYouTubeMusicResults = async () =>{
		console.log("Query String from fetchYouTubeMusicResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/youtubemusic/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from YouTube Music: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse
			const articles = parsedResponse.data.items;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			this.setState({
				youTubeMusicVideos: data,
				youTubeMusicVideosCount: parsedResponse.data.pageInfo.totalResults
			});
		}

	}



	fetchLastFmResults = async () =>{
		console.log("Query String from fetchLastFmResults: ", this.state.queryString);
		const response = await fetch('http://localhost:9000/api/v1/result/lastfm/' + this.state.queryString,{
			credentials: 'include'
		});

		console.log("Response from Last Fm: ", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log('Parsed Response: ', parsedResponse);

			const data = [];

			// All the data associated with the search is stored in parsedResponse.data.results
			const articles = parsedResponse.data.results.trackmatches.track;
			for(let i=0; i<articles.length; i++){
				// console.log("Article Title: ", articles[i].headline.main);
				data.push(articles[i]);
			}

			console.log("Data: ", data);
			this.setState({
				lastFmResults: data,
				lastFmResultsCount: parseInt((parsedResponse.data.results)['opensearch:totalResults'], 10)
			});
		}
	}


	generateStatsOverall = () =>{
		console.log("We have triggered generateStatsOverall");

		const entertainmentCount = this.state.youTubeVideosCount + this.state.tumblrDataCount;
		const musicCount = this.state.youTubeMusicVideosCount + this.state.lastFmResultsCount;
		const newsCount = this.state.nytArticlesCount + this.state.newsAPIArticlesCount + this.state.techCrunchArticlesCount;

		console.log("Entertainment Category Count: ", entertainmentCount);
		console.log("Music Category Count: ", musicCount);
		console.log("News Category Count: ", newsCount);

		this.setState({
			entertainmentCount: entertainmentCount,
			musicCount: musicCount,
			newsCount: newsCount
		});

		this.generateDegreeEquivalent(entertainmentCount, musicCount, newsCount);
	}

	generateDegreeEquivalent = (category1Data, category2Data, category3Data) =>{
		const total = category1Data + category2Data + category3Data;
		const degree1 = Math.round((category1Data/total)*360);
		const degree2 = Math.round((category2Data/total)*360);
		const degree3 = Math.round((category3Data/total)*360);

		console.log("Entertainment Category Percentage: ", degree1);
		console.log("Music Category Percentage: ", degree2);
		console.log("News Category Percentage: ", degree3);

		this.setState({
			entertainmentPercentage: degree1,
			musicPercentage: degree2,
			newsPercentage: degree3
		});
	}

	setDataReady = () =>{
		const value = this.state.dataReadyToDisplay;
		this.setState({
			dataReadyToDisplay: !value
		});
	}

	transferEntertainment = () =>{
		console.log("Transfer Entertainment reached!");
		
		this.props.history.push('/entertainment');
	}

	transferNews = () => {
		console.log("Transfer News reached!");

		this.props.history.push('/news');
	}

	transferMusic = () =>{
		console.log("Transfer Music reached!");

		this.props.history.push('/music');
	}

	transferData = () =>{
		// Transferring data for entertainment category
		localStorage.setItem('youTubeVideos', JSON.stringify(this.state.youTubeVideos));
		localStorage.setItem('youTubeVideosCount', JSON.stringify(this.state.youTubeVideosCount));
		localStorage.setItem('tumblrData', JSON.stringify(this.state.tumblrData));
		localStorage.setItem('tumblrDataCount', JSON.stringify(this.state.tumblrDataCount));

		// Transferring data for news category
		localStorage.setItem('nytArticles', JSON.stringify(this.state.nytArticles));
		localStorage.setItem('nytArticlesCount', JSON.stringify(this.state.nytArticlesCount));
		localStorage.setItem('newsAPIArticles', JSON.stringify(this.state.newsAPIArticles));
		localStorage.setItem('newsAPIArticlesCount', JSON.stringify(this.state.newsAPIArticlesCount));
		localStorage.setItem('techCrunchArticles', JSON.stringify(this.state.techCrunchArticles));
		localStorage.setItem('techCrunchArticlesCount', JSON.stringify(this.state.techCrunchArticlesCount));

		// Transferring data for music category
		localStorage.setItem('youTubeMusicVideos', JSON.stringify(this.state.youTubeMusicVideos));
		localStorage.setItem('youTubeMusicVideosCount', JSON.stringify(this.state.youTubeMusicVideosCount));
		localStorage.setItem('lastFmResults', JSON.stringify(this.state.lastFmResults));
		localStorage.setItem('lastFmResultsCount', JSON.stringify(this.state.lastFmResultsCount));

		this.setState({
			resultsReady: true
		});
	}



	/*
		<APIComponent 
							youTubeVideos={this.state.youTubeVideos} youTubeVideosLength = {this.state.youTubeVideos.length}
							nytArticles={this.state.nytArticles} nytArticlesLength = {this.state.nytArticles.length}
							newsAPIArticles={this.state.newsAPIArticles} newsAPIArticlesLength = {this.state.newsAPIArticles.length}
							techCrunchArticles={this.state.techCrunchArticles} techCrunchArticlesLength = {this.state.techCrunchArticles.length}
							tumblrData={this.state.tumblrData} tumblrDataLength = {this.state.tumblrData.length}
							youTubeMusicVideos={this.state.youTubeMusicVideos} youTubeMusicVideosLength = {this.state.youTubeMusicVideos.length}
							lastFmResults={this.state.lastFmResults} lastFmResultsLength = {this.state.lastFmResults.length}
						/>
	*/

	render(){

		console.log("State from Result Container: ", this.state);
		return(
			<div>
				<Navbar/>
				<div>
				{ this.state.resultsReady ?
					<div>
						<div className='buttonGroup'>
							<Button.Group widths='4'>
								<Button primary onClick={this.transferEntertainment}> Explore Entertainment </Button> 
								<Button primary onClick={this.transferMusic}> Explore Music </Button> 
								<Button primary onClick={this.transferNews}> Explore News </Button>
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

						<div className='pieChart'>
							<DisplayPieChart 
								angle1 = {this.state.entertainmentPercentage} label1={'Entertainment'}
								angle2 = {this.state.musicPercentage} label2={'Music'}
								angle3 = {this.state.newsPercentage} label3={'News'}
								setDataReady = {this.setDataReady}
								dataReadyToDisplay = {this.state.dataReadyToDisplay}
							/>
						</div>
					</div>
					:
						<div className='centerText waitingGif'>
							<img src='/waiting.gif'/>
							<div>
								<h1 className='textWait'> Please Wait While We Fetch Your Results! </h1>
							</div>
						</div>
				}
				</div>
			</div>
		);
	}
}

export default ResultContainer;