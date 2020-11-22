package com.virtualmate.myArtifact.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;

import com.virtualmate.myArtifact.model.Image;
import com.virtualmate.myArtifact.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
@Service
public class TodoService {

	private final UserDao userDao;
	private final CardDao cardDao;
	private final ImageDao imageDao;
	@Autowired
    public TodoService(@Qualifier("fbDaoImage") ImageDao imageDao,@Qualifier("fbDaoUser") UserDao userDao, @Qualifier("fbDaoCard") CardDao cardDao) {
    	this.userDao = userDao;
    	this.cardDao = cardDao;
    	this.imageDao = imageDao;
    }

	public List<Card> getTodoList(String userId, String password) {
		User user = userDao.getUserById(userId);
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
				list.add(cardDao.getCardById(entry.getKey()));
			}
		}
		return list;
	}

	public boolean addTodoItem(String userId, String password,String cardId) {
		User user = userDao.getUserById(userId);
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

	public boolean markTodoItem(String userId, String password,String cardId) {
		//check if user/cardId is valid
		User user = userDao.getUserById(userId);
		if(user==null || cardId==null || cardId.isEmpty()){
			return false;
		}
		//update the card's status
		user.getCardsTodo().replace(cardId,2);
		//update the user's finished cards
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String dateString = format.format(date);
		List<Map<String,String>> cardsTime = user.getCardsTime();
		Map<String,String> map = new HashMap<String,String>();
		map.put("pic",imageDao.getImageById(cardDao.getCardById(cardId).getActivityImageId()).getImageUrl());
		map.put("date",dateString);
		map.put("id",cardDao.getCardById(cardId).getActivityName());
		cardsTime.add(map);
		if(cardsTime.size()>3){//add
			//sort the top three, pop the last one, reset the cardTime
			cardsTime.sort(new Comparator<Map<String, String>>() {
				@Override
				public int compare(Map<String, String> first, Map<String, String> second) {
					try {
						Date date1 = format.parse(first.get("date"));
						Date date2 = format.parse(second.get("date"));
						return date1.compareTo(date2);
					} catch (ParseException e) {
						return 0;
					}
				}
			});
			cardsTime.remove(cardsTime.size()-1);
		}
		user.setCardsTime(cardsTime);
		//update the user
		userDao.setUser(user);
		//add the card's finished users
		Card card = cardDao.getCardById(cardId);
		List<String> finishedUserInCard = card.getFinishedUsersId();
		//check if the user has finished before, just one in the users list
		if(!finishedUserInCard.contains(user.getUserId())){
			finishedUserInCard.add(userId);
			card.setFinishedUsersId(finishedUserInCard);
		}
		cardDao.setCard(card);
		return true;
	}

	public boolean removeTodoItem(String userId, String password,String cardId) {
		User user = userDao.getUserById(userId);
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
