package com.virtualmate.myArtifact.dao;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class FirebaseInitializer {
	
	@PostConstruct
	private void initDB() throws IOException {
		
		InputStream serviceAccount = new FileInputStream("./markFirebasePassport2.json");
		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
		FirebaseOptions options = new FirebaseOptions.Builder()
		    .setCredentials(credentials)
		    .build();
		
		FirebaseApp.initializeApp(options);
		
		if(FirebaseApp.getApps().isEmpty()) {
			System.out.println("congratz! firebase initializing");
			System.out.println(getFirebase());
		}
		
	}
	
	public Firestore getFirebase() {
		return FirestoreClient.getFirestore();
	}
}
