package com.virtualmate.myArtifact.api;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.virtualmate.myArtifact.dao.CardDao;
import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.dao.ImageDao;
import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.*;
import com.virtualmate.myArtifact.dao.firebase.*;
import com.virtualmate.myArtifact.submodel.UserCredentials;

//Created by Mark for Dao Test only, Do not modify

@RequestMapping("test")
@RestController
public class MarkController {
	private final TagDao tagDao;
	private final UserDao userDao;
	private final CardDao cardDao;
	private final ImageDao imageDao;
	private final ChatDao chatDao;
	
	@Autowired
	public MarkController(@Qualifier("fbDaoUser") UserDao userDao, 
						  @Qualifier("fbDaoTag") TagDao tagDao,
						  @Qualifier("fbDaoCard") CardDao cardDao,
						  @Qualifier("fbDaoChat") ChatDao chatDao,
						  @Qualifier("fbDaoImage") ImageDao imageDao) {
		this.tagDao = tagDao;
		this.userDao = userDao;
		this.cardDao = cardDao;
		this.chatDao = chatDao;
		this.imageDao = imageDao;
	}
	
	@PostMapping("getRequestBody")
	public void process(@RequestBody UserCredentials userCredential) {
		System.out.println(userCredential.toString());
	}

	/*	------------------------------ User Dao Test Start ------------------------------	*/
	
	@PostMapping("setUser")
	public int setUser1(@RequestBody User user) {
		return userDao.setUser(user);
	}
    
    @PostMapping("getUserById")
    public User getUserById1(@RequestBody User user) {
    	return userDao.getUserById(user.getUserId());
    }
    
    @PostMapping("getUserByEmail")
    public User getTagByName1(@RequestBody User user) {
    	return userDao.getUserByEmail(user.getEmail());
    }
    
    @GetMapping("getUserList")
    public List<User> getUserList1(){
    	return userDao.getUserList();
    }	
	
	/*	------------------------------ Tag Dao Test Start ------------------------------	*/
    
    @PostMapping("setTag")
    public int setTag1(@RequestBody Tag tag) {
    	return tagDao.setTag(tag);
    }
    
    @PostMapping("getTagById")
    public Tag getTagById1(@RequestBody Tag tag) {
    	return tagDao.getTagById(tag.getTagId());
    }
    
    @PostMapping("getTagByName")
    public Tag getTagByName1(@RequestBody Tag tag) {
    	return tagDao.getTagByName(tag.getTagName());
    }
    
    @GetMapping("getTagList")
    public List<Tag> getTagList1(){
    	return tagDao.getTagList();
    }
    
    
	/*	------------------------------ Card Dao Test Start ------------------------------	*/
    
    @PostMapping("setCard")
    public int setTag1(@RequestBody Card card) {
    	return cardDao.setCard(card);
    }
    
    @PostMapping("getCardById")
    public Card getCardById1(@RequestBody Card card) {
    	return cardDao.getCardById(card.getCardId());
    }
    
    @PostMapping("getCardByName")
    public Card getCardByName1(@RequestBody Card card) {
    	return cardDao.getCardByName(card.getActivityName());
    }
    
    @GetMapping("getCardList")
    public List<Card> getCardList1(){
    	return cardDao.getCardList();
    }
    
    
	/*	------------------------------ Chat Dao Test Start ------------------------------	*/
    
    @PostMapping("setChat")
    public int setChat1(@RequestBody Chat chat) {
    	return chatDao.setChat(chat);
    }
    
    @PostMapping("getChatById")
    public Chat getChatById1(@RequestBody Chat chat) {
    	return chatDao.getChatById(chat.getChatId());
    }
    
//    @PostMapping("getChatByUsers")
//    public Chat getChatByUsers1(@RequestBody Chat chat) {
//    	List<String> tmp = chat.getUsers();
//    	return chatDao.getChatByUsers(tmp.get(0),tmp.get(1));
//    }
    
    @GetMapping("getChatList")
    public List<Chat> getChatList1(){
    	return chatDao.getChatList();	
    }
    
    
	/*	------------------------------ Image Dao Test Start ------------------------------	*/
    
    @PostMapping("setImage")
    public int setImage1(@RequestBody Image Image) {
//    	System.out.println(Image);
//    	return 1;
    	return imageDao.setImage(Image);
    }
    
    @PostMapping("getImageById")
    public Image getImageById1(@RequestBody Image image) {
    	return imageDao.getImageById(image.getImageId());
    }
    
    @PostMapping("getImageByUrl")
    public Image getImageByUsers1(@RequestBody Image image) {
    	return imageDao.getImageByUrl(image.getImageUrl());
    }
    
    @GetMapping("getImageList")
    public List<Image> getImageList1(){
    	return imageDao.getImageList();	
    }
    
}
