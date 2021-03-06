package com.virtualmate.myArtifact.api;

import java.util.List;
// import java.util.UUID;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.UserService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
	
	public final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("register")
	public boolean registerUser(@RequestBody User user) {
		return userService.registerUser(user);
	}
	@PostMapping("login")
	public String loginUser(@RequestBody UserCredentials userCredentials) {
		return userService.loginUser(userCredentials.getUserId(), userCredentials.getPassword());
	}
	@PostMapping("logout")
	public boolean logoutUser(@RequestBody UserCredentials userCredentials) {
		return userService.logoutUser(userCredentials.getUserId(), userCredentials.getPassword());
	}

	public static class deleteingWrapper{
		public UserCredentials userCredentials;
		public int idx;
		public deleteingWrapper(@JsonProperty("userCred") UserCredentials userCredentials,@JsonProperty("idx") int idx) {
			this.userCredentials = userCredentials;
			this.idx = idx;
		}
	}
	/*
		{
			"userCred":{
				"userId": "fe96f7ec-7e8a-431f-9a3c-3298cd55238b",
				"password": "xxx"
			},
			"idx": "5"
		}
	*/
	@DeleteMapping("album")
	public boolean deleteAlbumAt(@RequestBody deleteingWrapper wrapper) {
		return userService.deleteAlbumAt(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.idx);
	}
	/*
		{
			"userCred":{
				"userId": "fe96f7ec-7e8a-431f-9a3c-3298cd55238b",
				"password": "xxx"
			},
			"imageURL": "5"
		}
	*/
	public static class addingWrapper{
		public UserCredentials userCredentials;
		public String imageURL;
		public addingWrapper(@JsonProperty("userCred") UserCredentials userCredentials,@JsonProperty("imageURL") String imageURL) {
			this.userCredentials = userCredentials;
			this.imageURL = imageURL;
		}
	}
	
	@PostMapping("album")
	public boolean addAlbum(@RequestBody addingWrapper wrapper) {
		return userService.addAlbum(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.imageURL);
	}
	
	//the front end call both the functions below and process the info himself
	@GetMapping("cards")
	public  List<Map<String, String>> getSharedCardsOther(@RequestParam("userId") String userId, @RequestParam("userId_other") String userId_other) {
		return userService.getSharedCardsOther(userId, userId_other);
	}

	@GetMapping("{userId_other}")
	public User getInfoUserOther(@PathVariable String userId_other) {
		return userService.getInfoUserOther(userId_other);
	}
	
	
	@GetMapping("testing")
	public List<User> getAllUsers() throws Exception{
		return userService.getAllUsers();
	}



}
