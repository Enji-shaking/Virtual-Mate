package com.virtualmate.myArtifact.model;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Date;

public class Chat {
	
	private String chatId;
	private Date lastActive;
	private List<String> users;
	
	public Chat(@JsonProperty("userA") String userA, 
				@JsonProperty("userB") String userB) {
		this.chatId = UUID.randomUUID().toString();
		this.lastActive = new Date();
		this.users = new ArrayList<String>() ;
		users.add(userA);
		users.add(userB);
	}
	
	public Chat() {
		
	}

	@Override
	public String toString() {
		return "Chat [chatId=" + chatId + ", lastActive=" + lastActive + ", users=" + users + "]";
	}

	public String getChatId() {
		return chatId;
	}

	public void setChatId(String chatId) {
		this.chatId = chatId;
	}

	public Date getLastActive() {
		return lastActive;
	}

	public void setLastActive(Date lastActive) {
		this.lastActive = lastActive;
	}

	public List<String> getUsers() {
		return users;
	}

	public void setUsers(List<String> users) {
		this.users = users;
	}
}
