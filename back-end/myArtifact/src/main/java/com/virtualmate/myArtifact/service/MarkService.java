package com.virtualmate.myArtifact.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.*;



//Created by Mark for Dao Test only, Do not modify
@Service
public class MarkService {
	
	private final UserDao userDao;
	
	@Autowired
	public MarkService(@Qualifier("firebaseDao") UserDao userDao) {
		this.userDao = userDao;
	}
	
//	public int userRegister(User user) {
//		return userDao.userRegister(user);
//	}
//	
//	public User userRetrive(UUID userId,String password) {
//		return userDao.userRetrive(userId);
//	}
//	
//	public List<User> userList(){
//		try {
//			return userDao.getAllUsers();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return null;
//	}
}
