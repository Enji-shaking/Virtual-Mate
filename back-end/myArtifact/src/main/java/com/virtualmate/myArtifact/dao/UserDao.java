package com.virtualmate.myArtifact.dao;

import java.util.List;
import com.virtualmate.myArtifact.model.User;
public interface UserDao {
	
	int setUser(User user);

	User getUserById(String userId);
	
	User getUserByEmail(String email);
	
	List<User> getUserList();
}
