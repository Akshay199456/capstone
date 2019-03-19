import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TrendingNewsAPI from '../../components/TrendingNewsAPI';
import NYTNews from '../../components/NYTNews';

class NYTContainer extends Component{
	constructor(){
		super();

		this.state ={
			queryString: localStorage.getItem('queryString'),


			nytArticles: JSON.parse(localStorage.getItem('nytArticles')),
			topHeadlines: [],
			popularHeadlines: []
		}
	}

	componentDidMount = async () => {
		await this.fetchTopHeadlines();
		await this.fetchPopularHeadlines();

	}

	fetchTopHeadlines = async () =>{
		const response = await fetch('http://localhost:9000/api/v1/result/trending/nyt', {
			credentials: 'include'
		});
		console.log("Response from NYT Top Headlines Container", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Parsed Response from NYT Top Headlines Container", parsedResponse);

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
		const response = await fetch('http://localhost:9000/api/v1/result/popular/nyt', {
			credentials: 'include'
		});
		console.log("Popular Headlines Response from NYT Container", response);
		if(response.ok){
			const parsedResponse = await response.json();
			console.log("Popular Headlines Response Parsed Response from NYT Container", parsedResponse);

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
		console.log("State from NYTContainer: ", this.state);
		return(
			<div>
				<Navbar/>
				{ this.state.nytArticles.length === 0 ? null : <NYTNews nytArticles={this.state.nytArticles}/>}
				{ this.state.topHeadlines.length === 0 ? null : <TrendingNewsAPI headlines={this.state.topHeadlines} name={'Trending NYT Articles'}/>}
				{ this.state.popularHeadlines.length === 0 ? null : <TrendingNewsAPI headlines={this.state.popularHeadlines} name={'Popular NYT Articles'}/>}
			</div>
		);
	}
}

export default NYTContainer;