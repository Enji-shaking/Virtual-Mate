package com.virtualmate.myArtifact;

import java.nio.charset.StandardCharsets;

import com.google.common.hash.Hashing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyArtifactApplication {

	public static void main(String[] args) {
		// String text = "ABC";
		// String sha256hex = Hashing.sha256()
		// 	.hashString(text, StandardCharsets.UTF_8)
		// 	.toString();
		// System.out.println(sha256hex);
		SpringApplication.run(MyArtifactApplication.class, args);
	}

}
