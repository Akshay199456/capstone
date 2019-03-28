# One Stop Search

# Hi everyone! Welcome to my Capstone Project!!!

This project is called 'One Stop Search'. For this project, I wanted to build an application that was actually relevant given the ton of information that our digital footprints leave us with today. With **One Stop Search**, you can get the relevant information you need depending on the query entered by the user. For example, if you wanted to search for *cats*, you would get results from different platforms for cats.

Currently, the applications supports 6 different platforms divided across 3 different categories:

1. Entertainment
	- YouTube
	- Tumblr

2. News
	- News API
	- New York Times
	- Tech Crunch

3. Music
	- YouTube Music (part of YouTube API)
	- Last.fm

Based on the results obtained, you can analyze the results across different platforms and categories. Each platform also has other additional results that can be viewed which is unique to that plaform. 


## Technologies used:

React was used to design the front end of the application while the backend was designed using Express. In order to store the results, mongoDB was used. 

In addition, React-Vis was used to analyze the results across different categories and platforms in the form of a pie graph. Semantic UI was used to add responsive feautes to the website. Google Font was used to add font styles to the text shown. FontAwesome was used to add icons. 


## UserStories:

Given below is the userStories used for this project:

![UserStories Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144816.jpg)
![UserStories Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144821.jpg)
![UserStories Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144828.jpg) 

## Wireframes, ERD and Milestones:

Given below is the wireFrame, ERD and Milestones used for this project:

![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144712.jpg)
![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144721.jpg)
![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144724.jpg)
![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144729.jpg)
![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144733.jpg)
![wireFrame Screenshot](https://github.com/Akshay199456/capstone/blob/master/images/IMG_20190328_144750.jpg)


## Unsolved problems and future additions:

Currently, the site is not fully responsive. While certain aspects of it [results from different platforms are], the site itself isn't. For best experience, it is currently advised to view it on a laptop. OF a high priority is modifying the code to make the site completely responsive.

From project planning to project completion, this project took me about 8 days to build it. In my free time, I would love to add add a few more features to the site to make the experience more interactive.

	1. Users should be able to bookmark any search query they entered to their profile.
	2. Make the YouTube platform more interactive so that when the user is viewing a video, they can see tweets, posts ... related to the video.
	3. Users should be able to follow/ unfollow other users to see their activity [**bookmarked queries, posted comments about a topic etc..**].
	4. Paginated results from the different platforms.
	5. Users should be able to view most frequent searches by all users as well as followed users.
	6. Use sentiment analysis [**Watson API**] to analyze the mood of the topic.
	7. Filter out results to include results from only certain platforms.
	8. Users should be able to chat with other users[**Socket IO or Firebase**].
	9. For music category, the user should be able to listen to the music on the application itself instead of redirecting to the application.
	10. Incorporate results from more platforms [Twitter, Spotify, Facebook etc..]