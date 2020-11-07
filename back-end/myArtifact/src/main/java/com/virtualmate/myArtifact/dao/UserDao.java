package com.virtualmate.myArtifact.dao;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

import com.virtualmate.myArtifact.model.User;
public interface UserDao {
	
	int userRegister(User user);
	
	//helper
	User userRetrive(UUID userId);
	
	
	boolean userPwdCheck(UUID userId, String password);
	
	int userLogout(UUID userId);
	
	int userLogin(UUID userId);
	
	int userAvatarSet(UUID userId);
	
	int userAlbumAdd(UUID userId);
	
	// delete the xth item from Album
	int userAlbumDel(UUID userId, int idx);
	
	
	
	
	
	/*					----archived----					*/
	int addUser(User user);
		
	List<User> getAllUsers() throws Exception;
	
	
}
