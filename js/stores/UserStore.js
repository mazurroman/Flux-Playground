var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var UserConstants = require('../constants/UserConstants');
var assign = require('object-assign');
var _ = require('underscore');

var CHANGE_EVENT = 'change';
var DEFAULT_FILTER_DATA = {
    drinksCoffee: false,
    userName: ''
};

var _users = undefined;
var _isLoaded = false;
var _isFilterApplied = false;
var _filterConfig = DEFAULT_FILTER_DATA;

var UserStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _users;
    },

    getVisibleUsers: function() {
        if (_isFilterApplied) {
            return _.filter(_users, function (u) {
                return (u.drinksCoffee === _filterConfig.drinksCoffee) &&
                        u.userName.toLowerCase().indexOf(_filterConfig.userName) > -1;
            });
        }

        return _users;
    },

    getFilterConfig: function () {
        return _filterConfig;
    },

    isFilterApplied: function () {
        return _isFilterApplied;
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
    var userName;

    switch (action.actionType) {
        case UserConstants.USER_LOAD:
            var userLoadPromise;
            userLoadPromise = action.promise;

            userLoadPromise.then(function(data) {
                _users = data;
                // profiltruju, kdyz tam je ulozeny nejaky filtr z minula
                UserStore.emitChange();
            });

            break;

        case UserConstants.USER_FILTER:
            _isFilterApplied = true;
            _filterConfig = action.filterData;

            UserStore.emitChange();

            break;

        case UserConstants.USER_FILTER_RESET:
            _isFilterApplied = false;
            _filterConfig = DEFAULT_FILTER_DATA;
            UserStore.emitChange();

            break;

        default:
            // Do nothing
    }

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = UserStore;
