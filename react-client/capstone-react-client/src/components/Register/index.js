import React from 'react';
import './style.css';
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react';

const Register = (props) => {
  return (
  	<div className='register-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form className="opacity" size='large' onSubmit={props.handleRegisterSubmit}>
                <Segment stacked>
                  <Form.Input 
                  	fluid 
                  	icon="user" 
                  	iconPosition='left' 
                  	placeholder='Username' 
                  	type='text' 
                  	name="username" 
                  	onChange={props.handleRegisterChange} 
                  	autoComplete= 'on'
                  />
                  <Form.Input 
                    fluid 
                    icon="mail" 
                    iconPosition='left' 
                    placeholder='Email' 
                    type='email' 
                    name="email" 
                    onChange={props.handleRegisterChange} 
                    autoComplete= 'on'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='password'
                    placeholder='Password'
                    type='password'
                    onChange={props.handleRegisterChange}
                    autoComplete = 'current-password'
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='verify_password'
                    placeholder='Verify Password'
                    type='password'
                    onChange={props.handleRegisterChange}
                    autoComplete = 'current-password'
                  />
                  <Button type="Submit" color='blue' fluid size='large'>
                    Register
                  </Button>
                </Segment>
              </Form>

              <Message>
                Already have an account? <button className='trigger-login-view' onClick={props.triggerLoginView}>Sign In</button>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
    );
}


export default Register;