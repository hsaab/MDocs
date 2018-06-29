# MAGIC DOCS

App can be viewed by using [electron](https://electronjs.org/). To start the app, please do the following:

1) `git clone` the repository
2) `npm install`
3) Create .env file and set URI of MongoDB database equal to environmental variable `mongodb_uri`
4) `npm run dev`

# Sign Up & Login

When users first start the app, they are directed to the home screen with optionality to sign up or log in. Upon hitting "Sign Up", new user can enter desired username and password. Then, the user is redirected to login on the login page. Using Passport authentication, the user can login!

<img height=200 src="/screenshots/Welcome.png"/>
<img height=200 src="/screenshots/Login.png"/>
