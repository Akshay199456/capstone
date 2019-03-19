import React from 'react';
import { Button, Form, Header, Segment,  Grid } from 'semantic-ui-react';

const EditProfileComponent = (props) =>{
	return(
		<div className='edit-profile-form'>
			<style>{`
		      body > div,
		      body > div > div,
		      body > div > div > div.login-form {
		        height: 100%;
		      }
		    `}
		    </style>

		    <Grid textAlign='center' style={{ height: '100%', marginTop: '80px' }} verticalAlign='middle'>	
		    	<Grid.Column style={{ maxWidth: 450 }}>
		    		<Header as='h2' color='black' textAlign='center'>
	          			<span> Edit Profile </span>
	       			</Header>
					<Form onSubmit={props.handleSubmit} size='large'>
						<Segment stacked>
							<Form.Input fluid icon="user circle" iconPosition='left' type="text" name="username" onChange={props.handleChange} placeholder="New Username"/> 
							  	
							<Form.Input fluid icon="lock" iconPosition='left' type="password" name="password" onChange={props.handleChange} placeholder="New Password"/>
						
							<Form.Input fluid icon="expeditedssl" iconPosition='left' type="password" name="confirmPassword" onChange={props.handleChange} placeholder="Verify Password"/>
						</Segment>	  	
							
							<Button className="containerWidth"  color='blue' fluid size='large' type='submit'> Confirm Changes </Button>		  	
						
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
}

export default EditProfileComponent;