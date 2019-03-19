import React from 'react';
import { Segment, Card, Image, Embed } from 'semantic-ui-react';
import './index.css';

const Tumblr = (props) =>{

	const articles = props.tumblrData.map((item, index) =>{
		if(item.type === 'photo')
		{
			return(
					<div key={index}>
						<div className='column column-5 border'>
							<Image className='image' src={(item.photos)[0].original_size.url} alt="Something"/>
							<div className='fontTumblr centerText'> <strong> Title: </strong> {item.blog.title}</div>
							<div className='fontTumblr centerText'> <strong> Description: </strong> {item.blog.description}</div>
							<div className='fontTumblr centerText'> <strong> Blog Name: </strong>  {item.blog_name} </div>
							<div className='fontTumblr centerText'> <strong> Date: </strong> {item.date} </div>
							<div className='fontTumblr centerText'> <strong> Post Url: </strong> <a href={item.post_url} target="_blank" alt="Article Image" rel="noopener noreferrer"> {item.blog_name} </a> </div>
						</div>
					</div>
				);
		}

		else if(item.type === 'video'){
			return(
					<div key={index} className='column column-5 border'>
						{ item.video !== undefined ?
								<iframe
									title="This is a unique title"
									width="532" 
									height="315" 
									src={'https://www.youtube.com/embed/'+item.video.youtube.video_id} 
									frameBorder="0" 
									allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen>
								</iframe>		
								 : null
						}
							<div className='fontTumblr centerText'> <strong> Title: </strong> {item.blog.title}</div>
							<div className='fontTumblr centerText'> <strong> Description: </strong> {item.blog.description}</div>
							<div className='fontTumblr centerText'> <strong> Blog Name: </strong> {item.blog_name} </div>
							<div className='fontTumblr centerText'> <strong> Date: </strong> {item.date} </div>
					</div>
				);
		}

		else if(item.type === 'text' | item.type === 'quote')
		{
			return(
					<div key={index} className='column column-5 border'>
						<div className='fontTumblr centerText'> <strong> Title: </strong> {item.blog.title} </div>
						<div className='fontTumblr centerText'> <strong> Description: </strong> {item.blog.description} </div>
						{ item.summary ? <div className='fontTumblr centerText'> <strong> Summary: </strong>{item.summary} </div> : null}
						<div className='fontTumblr centerText'> <strong> Blog Name: </strong>{item.blog_name} </div>
						<div className='fontTumblr centerText'> <strong> Date: </strong> {item.date} </div>
						<div className='fontTumblr centerText'> <strong> Post Url: </strong> <a href={item.post_url} target="_blank" alt="Article Image" rel="noopener noreferrer"> {item.blog_name} </a> </div>
					</div>
				);
		}

		else if(item.type === 'link'){
			return(
				<div key={index} className='column column-5 border'>
					{ (item.photos) ? <div className='fontTumblr centerText'> <strong> Link Image:</strong> <img src={(item.photos)[0].original_size.url} alt="Something"/></div> : null}
					<div className='fontTumblr centerText'> <strong> Excerpt:</strong> {item.excerpt} </div>
					<div className='fontTumblr centerText'> <strong> Date:</strong> {item.date} </div>
					<div className='fontTumblr centerText'> <strong> Blog Name:</strong> {item.blog_name} </div>
					<div className='fontTumblr centerText'> <strong> Description: </strong>{item.blog.description}</div>
					<div className='fontTumblr centerText'> <strong> Title:</strong> {item.blog.title}</div>
					<div className='fontTumblr centerText'> <strong> Summary:</strong> {item.summary} </div>
					<div className='fontTumblr centerText'> <strong> Post Url:</strong> <a href={item.post_url} target="_blank" alt="Article Image" rel="noopener noreferrer"> {item.blog_name} </a> </div>
				</div>
			);
		}
	});

	return(
			<div> 
				<h1 className='centerText'> Tumblr Articles </h1>
				<div className="row">
					{articles}
				</div>
			</div> 
	);
}

export default Tumblr;