import React from 'react';
import {RadialChart} from 'react-vis';


const DisplayPieChart = (props) =>{
	console.log("DATA READY TO DISPLAY: ", props.dataReadyToDisplay);
	return(
			<div> 
				{ props.dataReadyToDisplay ?
					<RadialChart
						data={[{angle: props.angle1, color: 0.3, label: props.label1}, {angle: props.angle2, color: 1.6, label: props.label2}, {angle: props.angle3, color: 1.9, label: props.label3}]}
						width={300}
						height={300} 
						showLabels={true}
					/>
					 : null
				}
			</div> 
	);
}

export default DisplayPieChart;