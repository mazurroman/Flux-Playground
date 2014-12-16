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
      text: 'foo'
    }
  };
  var actionUserDestroy = {
    source: 'VIEW_ACTION',
    action: {
      actionType: UserConstants.USER_DESTROY,
      id: 'replace me in test'
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

  it('should initialize with no to-do items', function() {
    var all = UserStore.getAll();
    expect(all).toEqual({});
  });

  it('creates a to-do item', function() {
    callback(actionUserCreate);
    var all = UserStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    expect(all[keys[0]].text).toEqual('foo');
  });

  it('destroys a to-do item', function() {
    callback(actionUserCreate);
    var all = UserStore.getAll();
    var keys = Object.keys(all);
    expect(keys.length).toBe(1);
    actionUserDestroy.action.id = keys[0];
    callback(actionUserDestroy);
    expect(all[keys[0]]).toBeUndefined();
  });

  it('can determine whether all to-do items are complete', function() {
    var i = 0;
    for (; i < 3; i++) {
      callback(actionUserCreate);
    }
    expect(Object.keys(UserStore.getAll()).length).toBe(3);
    expect(UserStore.areAllComplete()).toBe(false);

    var all = UserStore.getAll();
    for (key in all) {
      callback({
        source: 'VIEW_ACTION',
        action: {
          actionType: UserConstants.USER_COMPLETE,
          id: key
        }
      });
    }
    expect(UserStore.areAllComplete()).toBe(true);

    callback({
      source: 'VIEW_ACTION',
      action: {
        actionType: UserConstants.USER_UNDO_COMPLETE,
        id: key
      }
    });
    expect(UserStore.areAllComplete()).toBe(false);
  });

});
