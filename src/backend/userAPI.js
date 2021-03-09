import { useLayoutEffect } from "react";
import { getFavoriteGame } from './gameAPI';
import { users } from './tempdata';

export function getUser(id) {
  return users.filter( u => u.id === id)[0]
}

export function login(uname, password) {
  return users.filter(u => (u.name === uname) && (u.password === password)).length > 0;
}

export function getUserByName(name) {
  return users.filter(u => (u.name === name))[0]
}
