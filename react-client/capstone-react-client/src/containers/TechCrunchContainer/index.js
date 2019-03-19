import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TrendingNewsAPI from '../../components/TrendingNewsAPI';
import TechCrunch from '../../components/TechCrunch';

class TechCrunchContainer extends Component{
	constructor(){
		super();

		this.state ={
			queryString: localStorage.getItem('queryString'),


			techCrunchArticles: JSON.parse(localStorage.getItem('techCrunchArticles')),
			topHeadlines: [],
			popularHeadlines: []
		}
	}

	componentDidMount = async () => {
		await this.fetchTopHeadlines();
		await this.fetchPopularHeadlines();

	}

	fetchTopHeadlines = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/trending/techcrunch', {
			credentials: 'include'
		});
		console.log("Response from TechCrunch Top Headlines Container", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed Response from TechCrunch Top Headlines Container", parsedResponse);

			const articles = [];
			const data = parsedResponse.data.articles;

			for(let i=0; i<data.length; i++){
				articles.push(data[i]);
			}

			this.setState({
				topHeadlines: articles
			});
		}
	}

	fetchPopularHeadlines = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/popular/techcrunch', {
			credentials: 'include'
		});
		console.log("Popular Headlines Response from TechCrunch Container", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Popular Headlines Response Parsed Response from TechCrunch Container", parsedResponse);

			const articles = [];
			const data = parsedResponse.data.articles;

			for(let i=0; i<data.length; i++){
				articles.push(data[i]);
			}

			this.setState({
				popularHeadlines: articles
			});
		}
	}

	render(){
		console.log("State from TechCrunchContainer: ", this.state);
		return(
			<div>
				<Navbar/>
				{ this.state.techCrunchArticles.length === 0 ? null : <TechCrunch techCrunchArticles={this.state.techCrunchArticles}/>}
				{ this.state.topHeadlines.length === 0 ? null : <TrendingNewsAPI headlines={this.state.topHeadlines} name={'Trending TechCrunch Articles'}/>}
				{ this.state.popularHeadlines.length === 0 ? null : <TrendingNewsAPI headlines={this.state.popularHeadlines} name={'Popular TechCrunch Articles'}/>}
			</div>
		);
	}
}

export default TechCrunchContainer;