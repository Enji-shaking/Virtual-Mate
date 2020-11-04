package com.virtualmate.myArtifact.dao;

import java.util.List;

import com.virtualmate.myArtifact.model.User;
public interface UserDao {
	
	int addUser(User user);
	
	List<User> getAllUsers();
}
