package com.virtualmate.myArtifact.dao;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.virtualmate.myArtifact.model.User;
public interface UserDao {
	
	int addUser(User user);
	
	List<User> getAllUsers() throws Exception;
	
	
}
