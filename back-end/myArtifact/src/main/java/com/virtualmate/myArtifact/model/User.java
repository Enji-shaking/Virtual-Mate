package com.virtualmate.myArtifact.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.api.UserController;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class User {

	private String userName;
	private String userId;
	// private String email;
	private String userHashedPass;
	private boolean isOnline;
	// private ArrayList<Card> cards;
	
	public User(@JsonProperty("userName") String userName, 
				@JsonProperty("userId") String userId,
				// @JsonProperty("email") String email,
				@JsonProperty("userHashedPass") String userHashedPass) {
		super();
		this.userName = userName;
		this.userId = userId;
		// this.email = email;
		this.userHashedPass = userHashedPass;
		this.isOnline = true;
	}
	public User() {
		
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	// public String getEmail() {
	// 	return email;
	// }
	// public void setEmail(String email) {
	// 	this.email = email;
	// }
	public String getPassword() {
		return userHashedPass;
	}
	public void setPassword(String password) {
		this.userHashedPass = password;
	}
	public boolean isOnline() {
		return isOnline;
	}
	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}
	@PostMapping("register")
	public void addUser(UserController userController) {
		userController.userService.addUser(this);
	}
}
