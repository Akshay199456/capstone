import React from 'react';
import { Image } from 'semantic-ui-react';

const TrendingNewsAPI = (props) =>{

	const articles = props.headlines.map((item, index) =>{
		return(
			<div key={index}>
				<div className='column column-5 border'>
					<div> <Image src={item.urlToImage}/></div>
					<div className='fontTumblr centerText'> <strong> Source: </strong> {item.source.name}</div>
					<div className='fontTumblr centerText'> <strong> Published Date: </strong> {item.publishedAt} </div>
					<div className='fontTumblr centerText'> <strong> Author: </strong> {item.author}</div>
					<div className='fontTumblr centerText'> <strong> Title: </strong> {item.title}</div>
					<div className='fontTumblr centerText'> <strong> Content: </strong> {item.content} </div>
					<div className='fontTumblr centerText'> <strong> Description: </strong> {item.description}</div>
					<div className='fontTumblr centerText'> <strong> Article Link: </strong> <a href={item.url} target="_blank" alt="Article Image" rel="noopener noreferrer"> {item.source.name} </a> </div>
				</div>
			</div>
		);
	});

	return(
			<div>
				
				<h1 className='centerText'> {props.name}</h1>
				<div className="row">
					{articles}
				</div>
			</div> 
	);
}

export default TrendingNewsAPI;