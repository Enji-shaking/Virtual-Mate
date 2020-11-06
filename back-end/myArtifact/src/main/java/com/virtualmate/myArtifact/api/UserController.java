package com.virtualmate.myArtifact.api;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.UserService;

@RequestMapping("api/user")
@RestController
public class UserController {
	
	public final UserService userService;
	public static class UserCredentials{
		public UUID userId;
		public String password;
		public UserCredentials(@JsonProperty("userId") String userIdTemp, @JsonProperty("password") String password) {
			this.userId = java.util.UUID.fromString(userIdTemp);
            this.password = password;
        }
	}
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("album/add")
	public boolean addAlbumUser(@RequestBody UserCredentials userCredentials) {
		return userService.addAlbumUser(userCredentials.userId, userCredentials.password);
	}

	@PostMapping("login")
	public boolean loginUser(@RequestBody UserCredentials userCredentials) {
		return userService.loginUser(userCredentials.userId, userCredentials.password);

	}

	@PostMapping("logout")
	public boolean logoutUser(@RequestBody UserCredentials userCredentials) {
		return userService.logoutUser(userCredentials.userId, userCredentials.password);
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
	@DeleteMapping("album/delete")
	public boolean deleteAlbumUser(@RequestBody deleteingWrapper wrapper) {
		// return true;
		return userService.deleteAlbumUser(wrapper.userCredentials.userId, wrapper.userCredentials.password, wrapper.idx);
	}
	
	@GetMapping("{userId_other}")
	public List<Card> getInfoUserOther(@RequestBody UserCredentials userCredentials, @PathVariable String userId_other) {
		// return null;
		return userService.getInfoUserOther(userCredentials.userId, java.util.UUID.fromString(userId_other));
	}
	
	@GetMapping("testing")
	public List<User> getAllUsers() throws Exception{
		return userService.getAllUsers();
	}


}
