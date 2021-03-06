const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Logout route
router.get('/logout', (req, res) => {
	console.log("Logout req session at beginning : ",req.session);
    req.session.destroy((err) => {
    	if(err){
    	  	res.status(400).json({
      			error: 'error in logout'
      		});
    	}

	    else {
	    	res.status(200).json({
	    		success: 'Logout successful'
	    	});

	    	console.log("Req session after logout: ", req.session);
	    }
	});
});


router.get('/', async(req, res) => {
	res.status(200).json({
		message: 'sending data',
		session: req.session
	});
});


// Login route
router.post('/login', async(req, res) =>{
	console.log("Login route hit");
	console.log("Req body from login route: ", req.body);
	try{
		const foundCount = await User.countDocuments({ email: req.body.email})
		if(foundCount === 0){
			res.status(400).json({
		    	error: 'Incorrect email entered. Please enter a valid email if you have registered else register an account.',
		    	userCount: foundCount
			});
		}
		else{
			console.log("User count: ", foundCount);
			const foundUser = await User.findOne({ email: req.body.email}).select('+password');
			console.log('Found User: ', foundUser);
			if (bcrypt.compareSync(req.body.password, foundUser.password)){
				console.log('We getting inside!');

				req.session.logged = true;
			    req.session.email = foundUser.email;
			    req.session.userId = foundUser._id;

			    const sessionObject = {};
			    sessionObject.logged = req.session.logged;
			    sessionObject.email = req.session.email;
			    sessionObject.userId = req.session.userId;

				res.status(200).json({
					success: 'Successfully logged in!',
					session: sessionObject
				});
			}

			else{
				res.status(400).json({
			    	error: 'Incorrect password entered. Please enter a valid password.'
				});
			}
		}
	}

	catch(err){
		console.log(err);
		res.status(400).json({
		    error: 'Error error panic deer!'
		});
	}
});


// Register route
router.post('/register', async(req, res) =>{
	console.log('Register route hit!');
	console.log("Req body: ", req.body);

	const usernameRegex = /^[\w]{3,10}$/
    const passwordRegex = /^[\w]{3,10}$/

    const usernameTest = usernameRegex.test(req.body.username);
    const passwordTest = passwordRegex.test(req.body.password);
    const verifyPasswordTest = passwordRegex.test(req.body.verify_password);

    if(usernameTest && passwordTest && verifyPasswordTest){
		if(req.body.password === req.body.verify_password){
			const password = req.body.password;
			const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
			const userDbEntry = {};
			userDbEntry.username = req.body.username;
			userDbEntry.password = hashedPassword;
			userDbEntry.email = req.body.email;
			try {

			    const user = await User.create(userDbEntry);
			    console.log("Registered user: ", user);

			    req.session.logged = true;
			    req.session.email = req.body.email;
			    req.session.userId = user._id;

			    const sessionObject = {};
			    sessionObject.logged = req.session.logged;
			    sessionObject.email = req.session.email;
			    sessionObject.userId = req.session.userId;

			    res.status(200).json({
			      success: 'User successfully registered',
			      session: sessionObject
			    });
			  } 

			  catch(err){
			    console.log(err);
			    res.status(400).json({
			    	error: 'Email already exists. Please enter a new email to register an account'
			    });
			  }
		}

		else{
			res.status(400).json({
				error: 'Password and Verify Password don\'t match. Please make sure they are the same'
			})
		}
	}

	// If username does not meet regex standard
    else if(!usernameTest){
      res.status(400).json({
          error: "Username does not meet standard. Username must be alphanumeric with atleast 3 and atmost 10 characters" 
        });
    }

    // If password does not meet regex standard
    else if(!passwordTest){
      res.status(400).json({
          error: "Password does not meet standard. Password must be alphanumeric with atleast 3 and atmost 10 characters" 
        });
    }

    // If verify_password does not meet regex standard
    else if(!verifyPasswordTest){
      res.status(400).json({
          error: "Verify Password does not meet standard. Verify Password must be alphanumeric with atleast 3 and atmost 10 characters"
        });
    }
});


module.exports = router;