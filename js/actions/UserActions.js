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

  loadUsers: function () {
    setTimeout(function () {
      AppDispatcher.handleServerAction({
        actionType: UserConstants.USER_LOAD_SUCCEEDED,
        data: {
          '0x1q': {
            id: 0,
            userName: 'Roman',
            phone: '+420 725 033 478'
          },
          '190j': {
            id: 1,
            userName: 'Ales',
            phone: '+420 xxx xxx xxx'
          },
          '28u1': {
            id: 2,
            userName: 'Honza',
            phone: '+420 xxx xxx xxx'
          }
        }
      });

      // AppDispatcher.handleServerAction({
      //   actionType: UserConstants.USER_LOAD_FAILED,
      //   data: {}
      // })
    }, 1000);

    AppDispatcher.handleViewAction({
      actionType: UserConstants.USER_LOAD
    });
  }

};

module.exports = UserActions;
