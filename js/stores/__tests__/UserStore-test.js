/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * UserStore-test
 */

jest.dontMock('../../constants/UserConstants');
jest.dontMock('../UserStore');
jest.dontMock('object-assign');

describe('UserStore', function() {

  var UserConstants = require('../../constants/UserConstants');
  var AppDispatcher;
  var UserStore;
  var userStoreRegisteredCallbackInAppDispatcher;

  // mock actions inside dispatch payloads
  var actionUserCreate = {
    source: 'VIEW_ACTION',
    action: {
      actionType: UserConstants.USER_CREATE,
      userName: 'foo'
    }
  };

  var actionUserFilter = {
    source: 'VIEW_ACTION',
    action: {
        actionType: UserConstants.USER_FILTER,
        filterData: {
            drinksCoffee: true,
            userName: ''
        }
    }
  };

  var actionUserLoadSucceeded = {
    source: 'SERVER_ACTION',
    action: {
      actionType: UserConstants.USER_LOAD_SUCCEEDED,
      data: {
        '00': {
            userName: 'Honza',
            drinksCoffee: true
        },
        '01': {
            userName: 'Ales',
            drinksCoffee: false
        },
        '02': {
            userName: 'Roman',
            drinksCoffee: true
        }
      }
    }
  };

  var actionUserLoadSucceededWithNoData = {
    source: 'SERVER_ACTION',
    action: {
      actionType: UserConstants.USER_LOAD_SUCCEEDED,
      data: {}
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    UserStore = require('../UserStore');
    userStoreRegisteredCallbackInAppDispatcher = AppDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no users', function() {
    var all = UserStore.getAll();
    expect(all).toEqual(undefined);
  });

  it('should contain no users when server returns no data', function () {
      // Fake load action with no users (server returned nothing)
      userStoreRegisteredCallbackInAppDispatcher(actionUserLoadSucceededWithNoData);

      var users = UserStore.getAll();
      expect(Object.keys(users).length).toBe(0);
  });

  it('should contain users that server returned', function () {
      // Insert some users into store
      userStoreRegisteredCallbackInAppDispatcher(actionUserLoadSucceeded);

      var users = UserStore.getAll();
      var keys = Object.keys(users);

      expect(keys.length).toBe(3);
      expect(users[keys[0]].userName).toEqual('Honza');
  });

  it('should contain only users that drinks coffee', function() {
    // Insert some users into store
    userStoreRegisteredCallbackInAppDispatcher(actionUserLoadSucceeded);

    // Fake filter action
    userStoreRegisteredCallbackInAppDispatcher(actionUserFilter);

    var users = UserStore.getVisibleUsers();
    var keys = Object.keys(users);

    expect(keys.length).toBe(2);
    expect(users[keys[0]].userName).toEqual('Honza');
  });

  it('should throw an exception when filtering before users are loaded', function () {

  });

  it('should contain no users when filtering on empty users collection', function () {

  });

});
