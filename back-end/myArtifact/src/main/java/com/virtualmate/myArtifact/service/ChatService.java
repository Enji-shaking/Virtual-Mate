package com.virtualmate.myArtifact.service;

import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.Image;
import com.virtualmate.myArtifact.model.User;

import java.util.List;
import java.util.UUID;

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

	public int getInfoUserOther(UUID UUID, String password, String userId_other)
	{
		User user = userDao.getUserById(UUID.toString());
		User other = userDao.getUserById(userId_other.toString());
		//validate user credential		
		if (!validate(UUID, password)) 
			return (Integer) null;
		int connection = 0;
		//todo
		
		//successful
		return connection;
	}
	
	public boolean requestChat(UUID UUID, String password, String userId_other)
	{
		User user = userDao.getUserById(UUID.toString());
		User other = userDao.getUserById(userId_other.toString());
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		//todo
		
	}
	
	public List<Chat> getChatList(UUID UUID, String password)
	{
		
	}

	public boolean validate(UUID UUID, String password)
	{
		if (password.equals(userDao.getUserById(UUID.toString()).getPassword()))
			return true;
		else
			return false;
	}
}
