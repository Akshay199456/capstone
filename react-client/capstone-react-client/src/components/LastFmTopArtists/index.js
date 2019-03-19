import React from 'react';
import { Image } from 'semantic-ui-react';

const LastFmTopArtists = (props) =>{

	const articles = props.topArtists.map((item, index) =>{
		return(
			<div key={item._id}>
				<div className='column column-5 border'>
					<div> <Image className='centerImage' src={((item.image)[4])['#text']}/></div>
					<div className='fontTumblr centerText'> <strong> Artist Name:</strong>  {item.name} </div>
					<div className='fontTumblr centerText'> <strong> Listeners: </strong> {item.listeners}</div>
					<div className='fontTumblr centerText'> <strong> PlayCount: </strong> {item.playcount}</div>
					<div className='fontTumblr centerText'> <strong> Artist Profile: </strong> <a href={item.url} target="_blank" rel="noopener noreferrer"> {item.name} </a> </div>
				</div>
			</div>
		);
	});

	return(
			<div> 
				<h1 className='centerText'> Top Artists </h1>
				<div className="row">
					{articles}
				</div>
			</div> 
	);
}

export default LastFmTopArtists;