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

import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.*;
import com.virtualmate.myArtifact.service.MarkService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

//Created by Mark for Dao Test only, Do not modify

@RequestMapping("test")
@RestController
public class MarkController {
	private final MarkService markService;
	private final UserDao userDao;
	
	@Autowired
	public MarkController(MarkService markService,@Qualifier("firebaseDao") UserDao userDao) {
		this.markService = markService;
		this.userDao = userDao;
	}
	
	@PostMapping("registerUser")
	public int registerUser(@RequestBody User user) {
		System.out.println(user.toString());
		return markService.userRegister(user);
	}

	@PostMapping("getUserByUUID")
	public User getUserByUUID(@RequestBody UserCredentials userCredential) {
		UUID idstr = userCredential.getUserId();
		String password = userCredential.getPassword();
		return markService.userRetrive(idstr, password);
	}
	
	
    @PostMapping("getRequestBody")
    public void process(@RequestBody UserCredentials userCredential) {
        System.out.println(userCredential.toString());
    }
    
    @GetMapping("getUserList")
    public List<User> getUserList() {
//    	return markService.userList();
    	try {
			return userDao.getAllUsers();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return null;
    }
}
