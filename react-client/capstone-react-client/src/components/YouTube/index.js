import React from 'react';
import './index.css';

const YouTube = (props) =>{

	const videos = props.youTubeVideos.map((item, index) =>{
		return(
			<div key={index}>
				<div className='column column-5 marginVideos'>
					<iframe
						title="This is a unique title"
						width="560" 
						height="315" 
						src={item} 
						frameBorder="0" 
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen>
					</iframe>
				</div>
			</div>
		);
	});

	return(
			<div className='row'> 
				<h1 className='centerText'> YouTube Videos </h1>
				<div className="row">
				{videos}
				</div>
			</div> 
	);
}

export default YouTube;