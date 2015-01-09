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
  var callback;

  // mock actions inside dispatch payloads
  var actionUserCreate = {
    source: 'VIEW_ACTION',
    action: {
      actionType: UserConstants.USER_CREATE,
      userName: 'foo'
    }
  };

  var actionUserLoadSucceeded = {
    source: 'SERVER_ACTION',
    action: {
      actionType: UserConstants.USER_LOAD_SUCCEEDED,
      data: {
        'foo': {
          userName: 'bar'
        }
      }
    }
  };

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    UserStore = require('../UserStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with no users', function() {
    var all = UserStore.getAll();
    expect(all).toEqual(undefined);
  });

  // it('loads users', function() {
  //   callback(actionUserLoadSucceeded);
  //   var all = UserStore.getAll();
  //   var keys = Object.keys(all);
  //   expect(keys.length).toBe(1);
  //   expect(all[keys[0]].userName).toEqual('bar');
  // });
});
