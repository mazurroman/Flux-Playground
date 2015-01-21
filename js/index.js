'use strict';

var React = require('react'),
    router = require('./router.js');

router.run(function (Handler, state) {
  React.render(<Handler {...state} />, document.body);
});
