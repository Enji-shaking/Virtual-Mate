package com.virtualmate.myArtifact.submodel;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
public class UserCredentials {
	
	private UUID userId;
	private String password;
	
//	public UserCredentials(UUID userId, String password) {
//		super();
//		this.userId = userId;
//		this.password = password;
//	}
	
	public UserCredentials(@JsonProperty("userId") String userIdTemp, 
						   @JsonProperty("password") String password) {
		this.userId = java.util.UUID.fromString(userIdTemp);
        this.password = password;
    }
	
	public UserCredentials() {
		super();
	}

	public UUID getUserId() {
		return userId;
	}
	public void setUserId(UUID userId) {
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
