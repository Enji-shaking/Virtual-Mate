package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.Image;
import com.virtualmate.myArtifact.model.User;

import java.util.List;
import java.util.UUID;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
	
	private final ChatDao chatDao;
	private final UserDao userDao;

	@Autowired
    public ChatService(UserDao userDao, ChatDao chatDao) {
		this.chatDao = chatDao;
		this.userDao = userDao;       
    }

	public int getInfoUserOther(UUID UUID, String password, UUID otherUUID)
	{
		User A = userDao.getUserById(UUID.toString());
		User B = userDao.getUserById(otherUUID.toString());
		//validate user credential		
		if (!validate(UUID, password)) 
			return 0;
		//check user's connection with the other user
		return A.getFriendStatus().get(B.getUserId());
	}
	
	public boolean requestChat(UUID UUID, String password, UUID otherUUID)
	{
		User A = userDao.getUserById(UUID.toString());
		User B = userDao.getUserById(otherUUID.toString());
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		//A request B
		A.getFriendStatus().put(B.getUserId(), 1);
		//B receives request from A
		B.getFriendStatus().put(A.getUserId(), 2);
		//succeed
		return true;
	}
	
	public List<Chat> getChatList(UUID UUID, String password)
	{
		//validate user credential		
		if (!validate(UUID, password)) 
			return null;
		return chatDao.getChatList();		
	}
	
	public List<Chat> getChatRequest(UUID UUID, String password)
	{
		User user = userDao.getUserById(UUID.toString());
		List<Chat> request = new ArrayList<>
		//validate user credential		
		if (!validate(UUID, password)) 
			return null;
		for (Entry<String, Integer> connection : user.getFriendStatus().entrySet())
		{
			if 
		}
	}

	public boolean validate(UUID UUID, String password)
	{
		if (password.equals(userDao.getUserById(UUID.toString()).getPassword()))
			return true;
		else
			return false;
	}
}
