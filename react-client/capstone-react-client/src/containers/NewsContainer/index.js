import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import NewsComponent from '../../components/NewsComponent';
import DisplayPieChart from '../../components/DisplayPieChart';
import { Button } from 'semantic-ui-react';

class NewsContainer extends Component{
	constructor(){
		super();

		this.state = {
			nytArticles: JSON.parse(localStorage.getItem('nytArticles')),
			nytArticlesCount: JSON.parse(localStorage.getItem('nytArticlesCount')),
			nytArticlesPercentage: 0,
			newsAPIArticles: JSON.parse(localStorage.getItem('newsAPIArticles')),
			newsAPIArticlesCount: JSON.parse(localStorage.getItem('newsAPIArticlesCount')),
			newsAPIArticlesPercentage: 0,
			techCrunchArticles: JSON.parse(localStorage.getItem('techCrunchArticles')),
			techCrunchArticlesCount: JSON.parse(localStorage.getItem('techCrunchArticlesCount')),
			techCrunchArticlesPercentage: 0,

			dataReadyToDisplay: false
		}
	}

	componentDidMount = async () => {
		await this.generateStatsNews();
	}


	generateDegreeEquivalent = (category1Data, category2Data, category3Data) =>{
		const total = category1Data + category2Data + category3Data;
		const degree1 = Math.round((category1Data/total)*360);
		const degree2 = Math.round((category2Data/total)*360);
		const degree3 = Math.round((category3Data/total)*360);

		console.log("NYT Articles Percentage: ", degree1);
		console.log("News API Percentage: ", degree2);
		console.log("Tech Crunch Percentage: ", degree3);

		this.setState({
			nytArticlesPercentage: degree1,
			newsAPIArticlesPercentage: degree2,
			techCrunchArticlesPercentage: degree3
		});
	}

	generateStatsNews = () =>{
		console.log("We have triggered generateStatsNews");

		this.generateDegreeEquivalent(this.state.nytArticlesCount, this.state.newsAPIArticlesCount, this.state.techCrunchArticlesCount);
		console.log("State from generateStatsNews: ", this.state);
	}

	setDataReady = () =>{
		const value = this.state.dataReadyToDisplay;
		this.setState({
			dataReadyToDisplay: !value
		});
	}

	travelNYT = () =>{
		console.log("Traveling to NYT");
		this.props.history.push('/news/nyt');
	}

	travelNewsAPI = () =>{
		console.log("Traveling to News API");
		this.props.history.push('/news/newsapi');
	}

	travelTechCrunch = () =>{
		console.log("Traveling to TechCrunch");
		this.props.history.push('/news/techcrunch');
	}

	render(){
		console.log("State from NewsContainer: ", this.state);
		return(
			<div>
				<Navbar/>
				<div className='buttonGroup'>
					<Button.Group widths='4'>
						<Button primary onClick={this.travelNYT}> Explorer New York Times </Button>
						<Button primary onClick={this.travelNewsAPI}> Explore News API </Button>
						<Button primary onClick={this.travelTechCrunch}> Explore TechCrunch </Button> 
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
					angle1 = {this.state.nytArticlesPercentage} label1={'New York Times'}
					angle2 = {this.state.newsAPIArticlesPercentage} label2={'News API'}
					angle3 = {this.state.techCrunchArticlesPercentage} label3={'TechCrunch'}
					setDataReady = {this.setDataReady}
					dataReadyToDisplay = {this.state.dataReadyToDisplay}
				/>
				
				<NewsComponent 
					nytArticles={this.state.nytArticles} nytArticlesLength = {this.state.nytArticles.length} travelNYT={this.travelNYT}
					newsAPIArticles={this.state.newsAPIArticles} newsAPIArticlesLength = {this.state.newsAPIArticles.length} travelNewsAPI={this.travelNewsAPI}
					techCrunchArticles={this.state.techCrunchArticles} techCrunchArticlesLength = {this.state.techCrunchArticles.length} travelTechCrunch={this.travelTechCrunch}
				/>
			</div>
		);
	}
}

export default NewsContainer;