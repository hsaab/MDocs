# Magic Docs

App can be viewed by using [electron](https://electronjs.org/). To start the app, please do the following:

1) `git clone` the repository
2) `npm install --save`
3) Create .env file and set URI of MongoDB database equal to environmental variable `mongodb_uri`
4) `npm run dev`

# Sign Up & Login

When users first start the app, they are directed to the home screen with optionality to sign up or log in. Upon hitting "Sign Up", new user can enter desired username and password. Then, the user is redirected to login on the login page. Using Passport authentication, the user can login and access the main portal!

<img height=300 src="/screenshots/Welcome.png"/>
<img height=300 src="/screenshots/Login.png"/>
<img height=300 src="/screenshots/DocMain.png"/>

# Creating New Docs

Upon logging in, the user has the ability to create new documents which persist in MongoDB. Upon creating a document, we can edit the document, as well as add custom styling courtesy of [Draft.js](https://draftjs.org/).

<img height=300 src="/screenshots/DocMain2.png"/>
<img height=300 src="/screenshots/DocEach1.png"/>

# Sharing Docs

In order to share docs, one user needs to send the other user the unique document ID, which is located in the top left corner.

<img height=300 src="/screenshots/Share1.png"/>

The second user will input the document ID on the main portal page and press submit.

<img height=300 src="/screenshots/Share2.png"/>

Now, the second user can update the document in real-time thanks to [socket.io](https://socket.io/)!

<img height=300 src="/screenshots/Share3.png"/>
