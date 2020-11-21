package com.virtualmate.myArtifact.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.Image;
import com.virtualmate.myArtifact.model.User;

@Service
public class UserService {
	
	private final UserDao userDao;
	private final ImageDao imageDao;
	private final CardDao cardDao;
	
	@Autowired
	public UserService(@Qualifier("fbDaoUser") UserDao userDao, @Qualifier("fbDaoImage") ImageDao imageDao, @Qualifier("fbDaoCard") CardDao cardDao) {
		this.userDao = userDao;
		this.imageDao = imageDao;
		this.cardDao = cardDao;
	}
	
	public int addUser(User user) {
		return userDao.setUser(user);
	}
	
	public List<User> getAllUsers() throws Exception {
		return userDao.getUserList();
	}
	public boolean registerUser(User user){
		//validate the user 1. if null 2. if already registered
		if(user==null || userDao.getUserById(user.getUserId())!=null || userDao.getUserByEmail(user.getEmail())!=null){
			return false;
		}
		//set the user
		return userDao.setUser(user) == 1;
	}
	public String loginUser(String uuid, String password){
		User user = userDao.getUserById(uuid);
		//validate user: 1. if null
		if(user==null){
			user = userDao.getUserByEmail(uuid);
			if(user==null)
				return null;
		}
		//login if password is true
		if(user.getPassword().equals(password)){
			user.setOnline(true);
			userDao.setUser(user);
			return user.getUserId();
		}
		else
			return null;
	}
	public boolean logoutUser(String UUID, String password){
		//TODO does loginout requires password?
		//validate user: 1. if null 2. if online
		User user = userDao.getUserById(UUID);
		if(user==null || !user.isOnline()){
			return false;
		}
		//update the user, firebaseDao has checked prev user
		user.setOnline(false);
		userDao.setUser(user);
		return true;
	}
	
	//delete the indicated image (by idx) from the album of the indicated user (by UUID)
	public boolean deleteAlbumAt(String UUID, String password, int idx){
		User user = userDao.getUserById(UUID);
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		try {
			user.getAlbum().remove(idx);
		} catch (IndexOutOfBoundsException e){
			return false;}
		//successful
		return true;
	}
	
	//create an image using given imageUrl and put it into this user's album
	public boolean addAlbum(String UUID, String password, String imageUrl)
	{
		User user = userDao.getUserById(UUID);
		//validate user credential		
		if (!validate(UUID, password)) 
			return false;
		try {
			Image image = new Image(imageUrl);
			imageDao.setImage(image);
			user.getAlbum().add(imageUrl);
		} catch (IndexOutOfBoundsException e){
			return false;}
		//successful
		return true;
	}

	//return the list of cards completed by the other user and is in the list of the current user
	public List<Card> getSharedCardsOther(String user, String other){
		List<Card> cards = new ArrayList<>();
		User u = userDao.getUserById(user);
		User o = userDao.getUserById(other);
		if (u == null || o == null)
			return null;
		/* 	we use integer to represent an card's state in a user's to-do list
		1,2,3 means to-do, done, done and would like to do again
		 */
		for (Entry<String, Integer> uEntry : u.getCardsTodo().entrySet()){
			for (Entry<String, Integer> oEntry : o.getCardsTodo().entrySet()){
				if (uEntry.getKey().equals(oEntry.getKey()) && (oEntry.getValue() == 2 || oEntry.getValue() == 3)){
					cards.add(cardDao.getCardById(uEntry.getKey()));} 
			}		
		}
		return cards;
	}
	
	public User getInfoUserOther(String other){
		User o = userDao.getUserById(other);
		return o;
	}
	
	
	public boolean validate(String UUID, String password)
	{
		if (password.equals(userDao.getUserById(UUID).getPassword()))
			return true;
		else
			return false;
	}

}
