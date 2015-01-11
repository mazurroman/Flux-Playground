/*
 * UserActions
 */

var Promise = require('es6-promise').Promise;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserConstants = require('../constants/UserConstants');


var UserActions = {

    loadUsers: function() {
        var promise = new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        resolve(JSON.parse(xmlhttp.responseText));
                    } else if (xmlhttp.status == 400) {
                        reject('There was an error 400');
                    } else {
                        reject('something else other than 200 was returned');
                    }
                }
            }

            xmlhttp.open("GET", "http://private-4582-kentico1.apiary-mock.com/users", true);
            xmlhttp.send();
        });

        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_LOAD,
            promise: promise
        });
    },

    filterUsers: function(filterData) {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_FILTER,
            filterData: filterData
        });
    },

    filterReset: function () {
        AppDispatcher.handleViewAction({
            actionType: UserConstants.USER_FILTER_RESET
        })
    }

};

module.exports = UserActions;
