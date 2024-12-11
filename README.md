## [Mashed]

By Winta Ghirmai and Elva Osorio
### about
Our web application would first prompt the user for their Spotify login details. Then the user would have to agree to our terms and conditions. Once all is settled, the user would be given a list of users that have favorite artists with a percentage depicting how many artists they have in common.   

view our website [here](https://wghirmai.github.io/cs701-mashed/)

### building
Run the following commands in your terminal:  
% git clone https://github.com/wghirmai/cs701-mashed.git mashed  
cd mashed  
cd server   
npm install  
cd ..  
cd client   
npm install  
cd ..  
npm install  
npm start  

### usage
The user first has to click on "Login to Spotify" at the bottom of the page. That will redirect the user to the a page that asks them to login to Spotify using their Spotify, Facebook, Apple, or Google account. 
When it is a user's first time logging into Spotify through our web-application, they will be asked for their permission to use their information.  
In the next page, the user will get a screen that has two input sections, one for adding their zip code and another for deleting their profile. In order for users to add themselves, the user has to put their desired zip code.  
A list of different users with their zip code, percentage in common with the current user, and top ten artists will show up along with the current user's.  
The current user can then click on a username and that would redirect them to that user's Spotify profile. On that page, the user can follow the user, look at that user's playlists, and play their music.   

### limitations
In order for this application to work for the user must have an active account. We tested our program with a user that had not used their account in three years, and it did not work for them since they did not have sufficient data.
To the right of the add button, there is an input with a number, that number is user's identification number within our SQLite database. The user should not delete that number if they wish to delete themselves in the future. If a user deletes their account or change their zip code, they'll have to log in once again.  

### references
https://www.zipcodeapi.com/  
https://developer.spotify.com/documentation/web-api/
