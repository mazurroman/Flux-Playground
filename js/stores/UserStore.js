var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _users = undefined;
var _visibleUsers = undefined;

var UserStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _users;
    },

    getVisibleUsers: function() {
        return _visibleUsers;
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

var userLoadPromise;

// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var userName;

    switch (action.actionType) {
        case UserConstants.USER_LOAD:
            console.log('user load action');
            userLoadPromise = action.promise;

            userLoadPromise.then(function(data) {
                _visibleUsers = _users = data;
                // profiltruju, kdyz tam je ulozeny nejaky filtr z minula
                UserStore.emitChange();
            });

            break;

        case UserConstants.USER_FILTER:
            console.log('user filter action');
            userLoadPromise.then(function () {
                _visibleUsers = _.filter(_users, action.filterFunction);

                UserStore.emitChange();
            });

            break;

        default:
            // Do nothing
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = UserStore;
