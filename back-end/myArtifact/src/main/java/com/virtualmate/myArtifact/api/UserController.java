package com.virtualmate.myArtifact.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.UserService;

@RequestMapping("api/virtualmate/user")
@RestController
public class UserController {
	
	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
	
	@GetMapping
	public List<User> getAllUsers() throws Exception{
		return userService.getAllUsers();
	}
}
