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
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("album/add")
	public boolean addAlbumUser(@RequestBody User user) {
		return userService.addAlbumUser(user);
	}

	@PostMapping("login")
	public boolean loginUser(@RequestBody User user) {
		user.setUUID();
		return userService.loginUser(user);

	}

	@PostMapping("logout")
	public boolean logoutUser(@RequestBody User user) {
		return userService.logoutUser(user);
	}


	@DeleteMapping("album/delete")
	public boolean deleteAlbumUser(@RequestBody User user, @JsonProperty("idx") UUID idx) { //maybe  @RequestParam("idx") inx idx
		return true;
		// return userService.deleteAlbumUser(user, idx);
	}
	
	@GetMapping("{userId_other}")
	public List<Card> getInfoUserOther(@RequestBody User user) {
		//userId: String
		//userHashedPass: String
		return userService.getInfoUserOther(user);
	}
	
	@GetMapping("testing")
	public List<User> getAllUsers() throws Exception{
		return userService.getAllUsers();
	}


}
