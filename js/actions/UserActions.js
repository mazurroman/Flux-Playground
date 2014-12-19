/*
 * UserActions
 */

var Promise = require('es6-promise').Promise;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');


var UserActions = {

    /**
     * @param  {string} userName
     */
    create: function(userName) {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_CREATE,
            userName: userName
        });
    },

    loadUsers: function() {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    AppDispatcher.handleServerAction({
                        actionType: UserConstants.USER_LOAD_SUCCEEDED,
                        data: JSON.parse(xmlhttp.responseText)
                    });
                } else if (xmlhttp.status == 400) {
                    alert('There was an error 400');
                } else {
                    alert('something else other than 200 was returned');
                }
            }
        }

        xmlhttp.open("GET", "http://private-4582-kentico1.apiary-mock.com/users", true);
        xmlhttp.send();

        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_LOAD
        });
    }

};

module.exports = UserActions;
