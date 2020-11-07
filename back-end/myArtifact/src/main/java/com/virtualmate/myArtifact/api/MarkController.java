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

import com.virtualmate.myArtifact.dao.TagDao;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.*;
import com.virtualmate.myArtifact.service.MarkService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

//Created by Mark for Dao Test only, Do not modify

@RequestMapping("test")
@RestController
public class MarkController {
	private final TagDao tagDao;
	
	@Autowired
	public MarkController(@Qualifier("fbDaoTag") TagDao tagDao) {
		this.tagDao = tagDao;
	}
	
//	@PostMapping("registerUser")
//	public int registerUser(@RequestBody User user) {
//		System.out.println(user.toString());
//		return userDao.setUser(user);
//	}
//
//	@PostMapping("getUserByUUID")
//	public User getUserByUUID(@RequestBody UserCredentials userCredential) {
//		UUID userId = userCredential.getUserId();
//		String password = userCredential.getPassword();
//		return userDao.getUser(userId);
//	}
//	
//	@GetMapping("getUserList")
//	public List<User> getUserListCall(){
//		return userDao.getUserList();
//	}
	
	
	
    @PostMapping("getRequestBody")
    public void process(@RequestBody UserCredentials userCredential) {
        System.out.println(userCredential.toString());
    }
    
    @GetMapping("getUserList")
    public List<Tag> getUserList() {
//    	return markService.userList();
    	try {
			return tagDao.getTagList();
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return null;
    }
    
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
}
