package com.virtualmate.myArtifact.dao;

import java.util.List;
import com.virtualmate.myArtifact.model.Chat;
public interface ChatDao {
	
	int setChat(Chat chat);

	Chat getChatById(String charId);
	
	List<Chat> getChatList();
	
}
