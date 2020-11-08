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
	public UserService(@Qualifier("dummyDao") UserDao userDao) {
		this.userDao = userDao;
	}
	
	public int addUser(User user) {
		return userDao.addUser(user);
	}
	
	public List<User> getAllUsers() throws Exception {
		return userDao.getAllUsers();
	}
	public boolean loginUser(UUID UUID, String password){
		User user = userDao.getUserById(UUID.toString());
		if(user==null){
			return false;
		}
		if(user.getPassword().equals(password)){
			return true;
		}
	}


}
