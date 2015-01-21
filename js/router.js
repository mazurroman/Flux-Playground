'use strict';

var createRouter = require('react-router').create,
	HashLocation = require('react-router').HashLocation,
	React = require('react'),
    Route = require('react-router').Route,
    DefaultRoute = require('react-router').DefaultRoute,
    App = require('./app.js'),
    UsersPage = require('./pages/UsersPage.react.js'),
    AnotherPage = require('./pages/AnotherPage.react.js');

var routes = (
  <Route name='explore' path='/' handler={App}>
  	<Route name='users' path='/users' handler={UsersPage} />
  	<Route name='another-page' path='/another-page' handler={AnotherPage} />
  	<DefaultRoute handler={UsersPage} />
  </Route>
);

var router = createRouter({
  location: HashLocation,
  routes: routes
});

module.exports = router;