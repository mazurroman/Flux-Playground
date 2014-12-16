var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _users = {};

/**
 * Create a User item.
 * @param  {string} text The content of the TODO
 */
function create(userName) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _users[id] = {
    id: id,
    userName: userName,
    phoneNumber: '777 999 888'
  };
}

var UserStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _users;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {
    case UserConstants.USER_CREATE:
        text = action.text.trim();
        if (text !== '') {
          create(text);
        }

        UserStore.emitChange();
        break;

    case UserConstants.USER_LOAD:
    	UserStore.emitChange();
    	break;

    case UserConstants.USER_LOAD_SUCCEEDED:
    	_users = action.data;
    	UserStore.emitChange();
    	break;

    default:
      // Do nothing
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = UserStore;
