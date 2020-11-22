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

	public int checkConnectionWith(String UUID, String password, String userId_other)
	{
		User A = userDao.getUserById(UUID);
		User B = userDao.getUserById(userId_other);
		if (A == null || B == null)
			return 0;
		//validate user credential		
		if (!validate(UUID, password)) 
			return 0;
		//check user's connection with the other user
		A.getFriendStatus().putIfAbsent(B.getUserId(), 0);
		return A.getFriendStatus().get(B.getUserId());

	}
	
	public boolean requestChat(String UUID, String password, String userId_other)
	{
		User A = userDao.getUserById(UUID);
		User B = userDao.getUserById(userId_other);
		if (A == null || B == null)
			return false;
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		//A request B
		A.getFriendStatus().put(B.getUserId(), 1);
		//B receives request from A
		B.getFriendStatus().put(A.getUserId(), 2);
		//succeed
		userDao.setUser(A);
		userDao.setUser(B);
		return true;
	}
	
	public List<Chat> getChatList(String UUID, String password)
	{
		if (userDao.getUserById(UUID) == null)
			return null;
		//validate user credential		
		if (!validate(UUID, password)) 
			return null;
		return chatDao.getChatList();		
	}
	
	//return a list of requests that user has received
	public List<User> getChatRequest(String UUID, String password)
	{
		User user = userDao.getUserById(UUID);
		if (user == null)
			return null;
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
		if (A == null || B == null)
			return false;
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		if (!accepted){
			A.getFriendStatus().put(B.getUserId(), 3);
			B.getFriendStatus().put(A.getUserId(), 4);
		}else{
			//A accept B's request
			A.getFriendStatus().replace(B.getUserId(), 5);
			B.getFriendStatus().replace(A.getUserId(), 5);
			Chat c = new Chat(UUID, userId_other);
			chatDao.setChat(c);
			String chatId = c.getChatId();
			A.getChats().add(chatId);
			B.getChats().add(chatId);
			userDao.setUser(A);
			userDao.setUser(B);
		}
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

	public Chat getChatInfo(String chatId_other) {
		return chatDao.getChatById(chatId_other);
	}
}
