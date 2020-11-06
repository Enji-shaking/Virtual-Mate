package com.virtualmate.myArtifact.model;

import java.util.List;
import java.util.UUID;
import java.util.ArrayList;
import java.util.Date;

public class Chat {
	
	private UUID chatId;
	private Date lastActive;
	private List<UUID> users;
	
	public Chat(UUID userA, UUID userB) {
		this.chatId = UUID.randomUUID();
		this.lastActive = new Date();
		this.users = new ArrayList<UUID>() ;
		users.add(userA);
		users.add(userB);
	}
	
	public Chat() {

	}
	
	public UUID getChatId() {
		return chatId;
	}
	public void setChatId(UUID chatId) {
		this.chatId = chatId;
	}
	public Date getLastActive() {
		return lastActive;
	}
	public void setLastActive(Date lastActive) {
		this.lastActive = lastActive;
	}
	public List<UUID> getUsers() {
		return users;
	}
	public void setUsers(List<UUID> users) {
		this.users = users;
	}
	
}
