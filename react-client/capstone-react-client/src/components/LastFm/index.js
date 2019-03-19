import React from 'react';
import { Segment, Image } from 'semantic-ui-react';
import './index.css';

const LastFm = (props) =>{

	const articles = props.lastFmResults.map((item, index) =>{
		return(
			<div key={index}>
				<div className='column column-5 border'>
					<div> <Image className='centerImage' src={((item.image)[3])['#text']}/></div>
					<div className='fontTumblr centerText'> <strong> Artist: </strong> {item.artist}  </div>
					<div className='fontTumblr centerText'> <strong> Name: </strong> {item.name}  </div>
					<div className='fontTumblr centerText'> <strong> Listeners: </strong> {item.listeners}</div>
					<div className='fontTumblr centerText'> <a href={item.url} target="_blank" rel="noopener noreferrer"> {item.name} </a> </div>
				</div>
			</div>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> Last Fm Results </h1>
				<div className="row">
					{articles}
				</div>
			</div> 
	);
}

export default LastFm;