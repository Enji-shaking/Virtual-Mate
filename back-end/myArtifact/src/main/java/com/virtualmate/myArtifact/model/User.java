package com.virtualmate.myArtifact.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class User {

	private String userName;
	private int userId;
	private String email;
	private String password;
	private boolean isOnline;
	
	public User(@JsonProperty("userName") String userName, 
				@JsonProperty("userId") int userId,
				@JsonProperty("email") String email,
				@JsonProperty("password") String password) {
		super();
		this.userName = userName;
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.isOnline = true;
	}
	public User() {
		
	}
	
	public User(String userName, 
			String email,
			String password) {
	super();
	this.userName = userName;
	this.userId = 0;
	this.email = email;
	this.password = password;
	this.isOnline = true;
	}
	
	
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public boolean isOnline() {
		return isOnline;
	}
	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}
}
