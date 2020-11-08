package com.virtualmate.myArtifact.dao;

import java.util.*;
import com.virtualmate.myArtifact.model.User;

import org.springframework.stereotype.Repository;

import com.virtualmate.myArtifact.model.User;

@Repository("dummyDao") //let sb to know to inject this later
public class DummyDataAccessService implements UserDao {
	
	private static List<User> DB = new ArrayList<>();
	
	@Override
	public int addUser(User user) {
		// TODO Auto-generated method stub
//		DB.add(new User(user))
		System.out.printf("user %s successfully added\n",user.getUserName());
		DB.add(user);
		return 0;
	}

	@Override
	public List<User> getAllUsers() {
		return DB;
	}

	@Override
	public int setUser(User user) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public User getUser(UUID userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getUserList() {
		// TODO Auto-generated method stub
		return null;
	}


}
