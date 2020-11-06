package com.virtualmate.myArtifact.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


public class User {

	private String userName;
	private UUID userId;
	private String email;
	private String password;
	private String userHashedPass; //generated in User constructor
	private boolean isOnline;
	private Map<UUID,Integer> cardsTodo; 
	private UUID avatar;
	private List<UUID> album;
	private List<UUID> chats;
	
	/* 	we use integer to represent an card's state in a user's to-do list
		1,2,3 means to-do, done, done and would like to do again
	*/


	public User(@JsonProperty("userName") String userName, 
			@JsonProperty("email") String email,
			@JsonProperty("password") String password,
			@JsonProperty("userId") String userIdTemp) {
		super();
		this.userName = userName;
		if(userIdTemp != null)
			this.userId = java.util.UUID.fromString(userIdTemp);
		this.email = email;
		this.password = password;
		this.userHashedPass = password;
		this.isOnline = true;
		this.cardsTodo = new HashMap<UUID,Integer>();
		this.avatar = null;
		this.album = new ArrayList<UUID>();
		this.chats = new ArrayList<UUID>();
	}
	
	//empty constructor required by firebase serializing-deserializing
	public User() {
		
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
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

	public String getUserHashedPass() {
		return userHashedPass;
	}

	public void setUserHashedPass(String userHashedPass) {
		this.userHashedPass = userHashedPass;
	}

	public boolean isOnline() {
		return isOnline;
	}

	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}

	public Map<UUID, Integer> getCardsTodo() {
		return cardsTodo;
	}

	public void setCardsTodo(Map<UUID, Integer> cardsTodo) {
		this.cardsTodo = cardsTodo;
	}

	public UUID getAvatar() {
		return avatar;
	}

	public void setAvatar(UUID avatar) {
		this.avatar = avatar;
	}

	public List<UUID> getAlbum() {
		return album;
	}

	public void setAlbum(List<UUID> album) {
		this.album = album;
	}

	public List<UUID> getChats() {
		return chats;
	}

	public void setChats(List<UUID> chats) {
		this.chats = chats;
	}
	
	public void setUUID(){
		this.userId = UUID.randomUUID();
	}

}
