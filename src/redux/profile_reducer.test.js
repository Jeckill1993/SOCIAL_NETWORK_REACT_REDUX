import profileReducer from './profile_reducer.js';
import addPostActionCreator from './profile_reducer.js';
import deletePost from './profile_reducer.js';
import React from 'react';
import { render } from '@testing-library/react';


let state = {
    posts: [
        { id: 1, name: 'Dima', message: 'Oh I hate this girls!', likesCount: 12 },
        { id: 2, name: 'Jeka', message: 'I like swimming', likesCount: 12 },
        { id: 3, name: 'Vova', message: 'I need new phone', likesCount: 12 },
        { id: 4, name: 'Oleg', message: 'I am tester', likesCount: 12 },
    ],
};

test('new post should be added', () => {
    let action = addPostActionCreator('some text');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
});


test('message of new post should be correct', () => {
    let action = addPostActionCreator('some text');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('some text');
});


test('after deleting length of messages should be decrement', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});