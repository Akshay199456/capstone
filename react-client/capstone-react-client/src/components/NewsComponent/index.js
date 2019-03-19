import React from 'react';

import NYTNews from '../NYTNews';
import NewsAPI from '../NewsAPI';
import TechCrunch from '../TechCrunch';

const NewsComponent = (props) =>{
	return(
			<div> 
				{ props.nytArticlesLength === 0 ? null : <NYTNews nytArticles={props.nytArticles}/>}
				{ props.newsAPIArticlesLength === 0 ? null : <NewsAPI newsAPIArticles={props.newsAPIArticles}/>}
				{ props.techCrunchArticlesLength === 0 ? null : <TechCrunch techCrunchArticles={props.techCrunchArticles}/>}
			</div> 
	);
}

export default NewsComponent;