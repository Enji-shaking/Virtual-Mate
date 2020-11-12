package com.virtualmate.myArtifact.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;

import com.virtualmate.myArtifact.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

	private final UserDao userDao;
	private final CardDao cardDao;
	@Autowired
    public TodoService(@Qualifier("dummyDaoUser") UserDao userDao, @Qualifier("dummyDaoCard") CardDao cardDao) {
    	this.userDao = userDao;
    	this.cardDao = cardDao;
    }

	public List<Card> getTodoList(UUID userId, String password) {
		User user = userDao.getUserById(userId.toString());
		//validate user
		if(user==null){
			return null;
		}
		//return list of cards
		List<Card> list = new ArrayList<Card>();
		Map<String,Integer> map = user.getCardsTodo();
		//iterate over users' card map
		for (Map.Entry<String, Integer> entry : map.entrySet()) {
			//check the card's status, if it is to do card, add to the list
			if(entry.getValue()==1){
				list.add(cardDao.getCardByName(entry.getKey()));
			}
		}
		return list;
	}

	public boolean addTodoItem(UUID userId, String password,String cardId) {
		User user = userDao.getUserById(userId.toString());
		//check if user/cardId is valid
		if(user==null || cardId==null || cardId.isEmpty()){
			return false;
		}
		//add the To do item
		user.getCardsTodo().put(cardId,1);
		//userDao has checked the previous user
		userDao.setUser(user);
		return true;
	}

	public boolean markTodoItem(UUID userId, String password,String cardId) {
		//check if user/cardId is valid
		User user = userDao.getUserById(userId.toString());
		if(user==null || cardId==null || cardId.isEmpty()){
			return false;
		}
		//update the card's status
		user.getCardsTodo().replace(cardId,2);
		//update the user
		userDao.setUser(user);
		return true;
	}

	public boolean removeTodoItem(UUID userId, String password,String cardId) {
		User user = userDao.getUserById(userId.toString());
		//check if user/cardId is valid
		if(user==null || cardId==null || cardId.isEmpty()){
			return false;
		}
		//update the card's status
		user.getCardsTodo().remove(cardId);
		//update the user
		userDao.setUser(user);
		return true;
	}
    
}
