import { put, delay } from 'redux-saga/effects';

import axios from 'axios';

//helper function - from redux saga 
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions';

export function* logoutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
   
    yield put(actions.logoutSucceed());
    //for action creator that return action type like logoutSucceed need to be invoked
}


export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());//this refer to ACTION CREATOR so need to execute
}

export function* authUserSaga(action){
    yield put(actions.authStart()); //put is similiar to dispatch lol.
    //authenticate user
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCwRj0JSU4Q3-4aw5R1hVakvk_O54f67p8';
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCwRj0JSU4Q3-4aw5R1hVakvk_O54f67p8'
    }

    try {
        const response = yield axios.post(url, authData);
        //execution kind of Syncrhonously, because it will paused here until promise resolved or rejected

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        // you might not need yield? but for consistency
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));

    } catch (error){
        yield put(actions.authFail(error.response.data.error));
    }
 
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            //if not yet expired
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)); //setting timeout background timer running, if expired it will reject user session, need to re-login
        }

    }
}
