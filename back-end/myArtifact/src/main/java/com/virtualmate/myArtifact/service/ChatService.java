package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
	
	private final ChatDao chatDao;
	private final UserDao userDao;

	@Autowired
    public ChatService(@Qualifier("fbDaoUser") UserDao userDao, 
    					@Qualifier("fbDaoChat") ChatDao chatDao) {
		this.chatDao = chatDao;
		this.userDao = userDao;       
    }

	public int getInfoUserOther(String UUID, String password, String userId_other)
	{
		User A = userDao.getUserById(UUID);
		User B = userDao.getUserById(userId_other);
		//validate user credential		
		if (!validate(UUID, password)) 
			return 0;
		//check user's connection with the other user
		return A.getFriendStatus().get(B.getUserId());
	}
	
	public boolean requestChat(String UUID, String password, String userId_other)
	{
		User A = userDao.getUserById(UUID);
		User B = userDao.getUserById(userId_other);
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
	
	public List<Chat> getChatList(String UUID, String password)
	{
		//validate user credential		
		if (!validate(UUID, password)) 
			return null;
		return chatDao.getChatList();		
	}
	
	//return a list of requests that user has received
	public List<User> getChatRequest(String UUID, String password)
	{
		User user = userDao.getUserById(UUID);
		List<User> request = new ArrayList<User>();
		//validate user credential		
		if (!validate(UUID, password)) 
			return null;
		for (Entry<String, Integer> connection : user.getFriendStatus().entrySet())
		{
			if (connection.getValue() == 2)
				request.add(userDao.getUserById(connection.getKey()));
		}
		return request;
	}
	
	public boolean acceptRequest(String UUID, String password, boolean accepted, String userId_other)
	{
		User A = userDao.getUserById(UUID);
		User B = userDao.getUserById(userId_other);
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		if (!accepted)
			return false;
		//A accept B's request
		A.getFriendStatus().replace(B.getUserId(), 5);
		B.getFriendStatus().replace(A.getUserId(), 5);
		chatDao.getChatList().add(new Chat(UUID, userId_other));
		//success
		return true;
	}

	public boolean validate(String UUID, String password)
	{
		if (password.equals(userDao.getUserById(UUID).getPassword()))
			return true;
		else
			return false;
	}
}
