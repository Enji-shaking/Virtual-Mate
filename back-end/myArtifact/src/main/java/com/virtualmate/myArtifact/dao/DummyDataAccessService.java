package com.virtualmate.myArtifact.dao;

import java.util.*;

import org.springframework.stereotype.Repository;

import com.virtualmate.myArtifact.model.User;

@Repository("dummyDao") //let sb to know to inject this later
public class DummyDataAccessService implements UserDao {
	
	private static List<User> DB = new ArrayList<>();
	
	@Override
	public int addUser(User user) {
		System.out.printf("user %s successfully added\n",user.getUserName());
		DB.add(user);
		return 0;
	}

	@Override
	public List<User> getAllUsers() {
		return DB;
	}

}
