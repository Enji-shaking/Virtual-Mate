package com.virtualmate.myArtifact.submodel;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
public class UserCredentials {
	
	private String userId;
	private String password;
	
//	public UserCredentials(UUID userId, String password) {
//		super();
//		this.userId = userId;
//		this.password = password;
//	}
	
	public UserCredentials(@JsonProperty("userId") String userIdTemp, 
						   @JsonProperty("password") String password) {
		this.userId = userIdTemp;
        this.password = password;
    }
	
	public UserCredentials() {
		super();
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "UserCredentials [userId=" + userId + ", password=" + password + "]";
	}
	
}
