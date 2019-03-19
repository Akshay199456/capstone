import React from 'react';
import './style.css';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';


const Login = (props) => {
  return (
  	<div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form className="opacity" size='large' onSubmit={props.handleLoginSubmit}>
                <Segment stacked>
                  <Form.Input 
                  	fluid 
                  	icon="mail" 
                  	iconPosition='left' 
                  	placeholder='Email' 
                  	type='email' 
                  	name="email" 
                  	onChange={props.handleLoginChange} 
                  	autoComplete= 'on'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={props.handleLoginChange}
                    autoComplete = 'current-password'
                  />
                  <Button type="Submit" color='blue' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>

              <Message>
          			New to us? <button className="trigger-register-view" onClick={props.triggerRegisterView}>Sign Up</button>
        	  </Message>
            </Grid.Column>
          </Grid>
        </div>
    );
}


export default Login;