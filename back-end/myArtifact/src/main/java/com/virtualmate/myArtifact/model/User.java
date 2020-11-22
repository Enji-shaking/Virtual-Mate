package com.virtualmate.myArtifact.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.markUtil.MarkUtil;

import java.util.*;
import java.util.stream.Collectors;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.adapters.XmlAdapter;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;


public class User {
	private String userName;
	private String userId;
	private String email;
	private String password;
	private boolean isOnline;
	/* 	
		we use integer to represent an card's state in a user's to-do list
		1,2,3 means to-do, done, done and would like to do again
	 */ 
	private Map<String,Integer> cardsTodo;

	public List<Map<String, String>> getCardsTime() {
		return cardsTime;
	}

	public void setCardsTime(List<Map<String, String>> cardsTime) {
		this.cardsTime = cardsTime;
	}

	private List<Map<String,String>> cardsTime;
	private String avatar;
	private List<String> album;
	private List<String> chats;


	/*
		use integer to represent friend's status.
		<String,Integer> = <userId, friend's status>
		Let user A be this user, user B be other user stored in map
		1 -> A request B
		2 -> A receive request from B
		3 -> A reject B
		4 -> A is rejected by B
		5 -> A and B are friends
	*/
	private Map<String,Integer> friendStatus;

	
	public User(@JsonProperty("userName") String userName, 
			@JsonProperty("email") String email,
			@JsonProperty("password") String password) {
		super();
		this.userId = UUID.randomUUID().toString();
		this.userName = userName;
		this.email = email;
		this.password = password;
		this.isOnline = true;
		this.cardsTodo = new HashMap<String,Integer>();
		this.avatar = "f9396883-8b6b-449f-97db-4ce4929b97fe";
		this.album = new ArrayList<String>();
		this.chats = new ArrayList<String>();
		this.cardsTime = new ArrayList<Map<String, String>>();
		friendStatus = new HashMap<>();
	}
	
	@Override
	public String toString() {
		return "User [userName=" + userName + ", userId=" + userId + ", email=" + email + "]";
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


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
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


	public Map<String, Integer> getCardsTodo() {
		return cardsTodo;
	}


	public void setCardsTodo(Map<String, Integer> cardsTodo) {
		this.cardsTodo = cardsTodo;
	}
	public Map<String, Integer> getFriendStatus() {
		return friendStatus;
	}


	public void setFriendStatus(Map<String, Integer> friendStatus) {
		this.friendStatus=friendStatus;
	}


	public String getAvatar() {
		return avatar;
	}


	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}


	public List<String> getAlbum() {
		return album;
	}


	public void setAlbum(List<String> album) {
		this.album = album;
	}


	public List<String> getChats() {
		return chats;
	}


	public void setChats(List<String> chats) {
		this.chats = chats;
	}
	
}
