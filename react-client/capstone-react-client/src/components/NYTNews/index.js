import React from 'react';
import { Image } from 'semantic-ui-react';

const NYTNews = (props) =>{

	const articles = props.nytArticles.map((item) =>{
		console.log("Multimedia: ", item.multimedia);
		return(
			<div key={item._id}>
				<div className='column column-5 border'>
					<div>{ item.multimedia.length !== 0 ? <Image src={"https://static01.nyt.com/"+(item.multimedia)[0].url}/> : null} </div>
					<div className='fontTumblr centerText'> <strong> Published date: </strong> {item.pub_date} </div>
					<div className='fontTumblr centerText'> <strong> Section Name: </strong> {item.section_name} </div>
					<div className='fontTumblr centerText'> <strong> Headline: </strong> {item.headline.main}</div>
					<div className='fontTumblr centerText'> <strong> Lead Paragraph: </strong> {item.lead_paragraph}</div>
					<div className='fontTumblr centerText'> <a href={item.web_url} target="_blank" rel="noopener noreferrer"> <strong> Article Link </strong> </a> </div>
				</div>
			</div>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> NYT Articles </h1>
				<div className="row">
					{articles}
				</div>
			</div> 
	);
}

export default NYTNews;