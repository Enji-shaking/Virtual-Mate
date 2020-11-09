package com.virtualmate.myArtifact.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;

@Service
public class UserService {
	
	private final UserDao userDao;
	
	@Autowired
	public UserService(@Qualifier("dummyDaoUser") UserDao userDao) {
		this.userDao = userDao;
	}
	
	public int addUser(User user) {
		return userDao.addUser(user);
	}
	
	public List<User> getAllUsers() throws Exception {
		return userDao.getAllUsers();
	}
	public boolean registerUser(User user){
		//validate the user
		if(user==null){
			return false;
		}
		//set the user
		return userDao.setUser(user) == 1;
	}
	public boolean loginUser(UUID uuid, String password){
		User user = userDao.getUserById(uuid.toString());
		//validate user: 1. if null 2. if online
		if(user==null || user.isOnline()){
			return false;
		}
		//login if password is true
		if(user.getPassword().equals(password)){
			user.setOnline(true);
			userDao.setUser(user);
			return true;
		}
	}
	public boolean logoutUser(UUID UUID, String password){
		//TODO does loginout requires password?
		//validate user: 1. if null 2. if online
		User user = userDao.getUserById(UUID.toString());
		if(user==null || !user.isOnline()){
			return false;
		}
		//update the user, firebaseDao has checked prev user
		user.setOnline(false);
		userDao.setUser(user);
		return true;
	}


}
