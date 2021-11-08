import {createAction} from '@reduxjs/toolkit';
export const logout = createAction('LOGOUT');
export const login = createAction('LOGIN');
export const flipFlag = createAction('FLIP_FLAG');