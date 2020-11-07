package com.virtualmate.myArtifact.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.virtualmate.myArtifact.model.User;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.SetOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

@Repository("firebaseDao") //let sb to know to inject this later
public class FirebaseDataAccessService implements UserDao {
	
	@Autowired
	FirebaseInitializer dbInitializer;
	
	@Override
	public int addUser(User user) {
		//get firestore object
		Firestore db = dbInitializer.getFirebase();

		ApiFuture<WriteResult> future = db.collection("Users")
											.document(user.getEmail())
											.set(user);

		//display progress on server terminal
		try {
			System.out.println("Update time : " 
								+ future.get().getUpdateTime() 
								+ " User " + user.getUserName() 
								+ " created!");
		} catch (InterruptedException | ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<User> getAllUsers() throws Exception {
		Firestore db = dbInitializer.getFirebase();
		List<User> userList = new ArrayList<User>();
		
		ApiFuture<QuerySnapshot> future = db.collection("Users").get();
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (DocumentSnapshot document : documents) {
			userList.add(document.toObject(User.class));
		}
		
		//display progress on server terminal
		try {
			System.out.println("Update time : " 
								+ future.get().getReadTime() 
								+ " Userlist " 
								+ "returned!");
		} catch (InterruptedException | ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return userList;
	}

	@Override
	public int userRegister(User user) {
		Firestore db = dbInitializer.getFirebase();
		
		ApiFuture<WriteResult> future = db.collection("Users")
				.document(user.getUserId().toString())
				.set(user);
		
		//display progress on server terminal
		try {
			System.out.println("Update time : " 
								+ future.get().getUpdateTime() 
								+ " User " + user.getUserName() 
								+ " created!");
		} catch (InterruptedException | ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean userPwdCheck(UUID userId, String password) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int userLogout(UUID userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int userLogin(UUID userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int userAvatarSet(UUID userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int userAlbumAdd(UUID userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int userAlbumDel(UUID userId, int idx) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public User userRetrive(UUID userId) {
		Firestore db = dbInitializer.getFirebase();
		ApiFuture<DocumentSnapshot> future = db.collection("Users").document(userId.toString()).get();
		System.out.println(future);
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

}
