package com.virtualmate.myArtifact.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.virtualmate.myArtifact.model.User;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.SetOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

@Repository("firebaseDao") //let sb to know to inject this later
@Service
public class FirebaseDataAccessService implements UserDao {
	
	private Firestore db;
	private DocumentReference usersRef;
	private int i;

	public FirebaseDataAccessService() throws IOException {

		// Use a service account
		InputStream serviceAccount = new FileInputStream("./markFirebasePassport.json");
		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
		@SuppressWarnings("deprecation")
		FirebaseOptions options = new FirebaseOptions.Builder()
		    .setCredentials(credentials)
		    .build();
		FirebaseApp.initializeApp(options);

		Firestore db = FirestoreClient.getFirestore();
		DocumentReference usersRef = db.collection("VirtualMate").document("User");
		i = 999;
	}
	
	@Override
	public int addUser(User user) {
		
		// TODO Auto-generated method stub
//		DB.add(new User(user))
//		Map<String,Object> update = new HashMap<>();
//		update.put("Userlist", user);
//		
//		usersRef.set(update,SetOptions.merge());
		System.out.printf("user %s successfully added From NEW DATABASE\n",user.getUserName());
		System.out.println(db);
		System.out.println(usersRef);
		System.out.println(i);
		return 0;
	}

	@Override
	public List<User> getAllUsers() {
		ApiFuture<DocumentSnapshot> future = usersRef.get();
		DocumentSnapshot document = null;
		try {
			document = future.get();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return (List<User>) document.getData().get("Userlist");
	}

}
