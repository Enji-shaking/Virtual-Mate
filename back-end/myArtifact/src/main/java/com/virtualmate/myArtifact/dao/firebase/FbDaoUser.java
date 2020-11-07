package com.virtualmate.myArtifact.dao.firebase;

import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.virtualmate.myArtifact.dao.FirebaseInitializer;
import com.virtualmate.myArtifact.dao.UserDao;
import com.virtualmate.myArtifact.model.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

@Repository("fbDaoUser") //let sb to know to inject this later
public class FbDaoUser implements UserDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;

	@Override
	public int setUser(User user) {
		Firestore db = dbInitializer.getFirebase();
		
		User precedence = null;
		precedence = getUserByEmail(user.getEmail());
		if(precedence!=null) {
			user.setUserId(precedence.getUserId());
		}
		
		ApiFuture<WriteResult> future = db.collection("Users").document(user.getUserId()).set(user);
		
		try {
			System.out.println("Update time : " + future.get().getUpdateTime() + user.toString() + " created!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		return 1;
	}

	@Override
	public User getUserById(String userId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Users").document(userId).get();
		User myUser = null;
		try {
			myUser = future.get().toObject(User.class);
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
		if (myUser!=null) {
			System.out.println(myUser.toString());
		}
		return myUser;
	}
	
	@Override
	public User getUserByEmail(String email) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<QuerySnapshot> future = db.collection("Users").whereEqualTo("email",email).get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		if (documents.size()==0) {
			return null;
		}
		else if (documents.size()>1) {
			System.out.println("Oh fk, your database is Jammed!");
		}
		
		User myUser = documents.get(0).toObject(User.class);
		System.out.println(myUser.toString());
		return myUser;
	}

	@Override
	public List<User> getUserList() {
		Firestore db = dbInitializer.getFirebase();
		List<User> userList = new ArrayList<User>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Users").get();
		List<QueryDocumentSnapshot> documents = null;
		try {
			documents = future.get().getDocuments();
		} catch (InterruptedException | ExecutionException e1) {
			e1.printStackTrace();
		}
		
		if (documents==null) {
			System.out.println("get userList failed!");
			return userList;
		}
		
		for (DocumentSnapshot document : documents) {
			userList.add(document.toObject(User.class));
		}
		
		try {
			System.out.println("Update time : " + future.get().getReadTime() + " userList " + "returned!");
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}

		return userList;
	}	
	

}
