package com.virtualmate.myArtifact.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class uuidgenerator {
    public static void main(String[] args) {
        // System.out.println(UUID.randomUUID());
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/yyyy");
		// SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
        String dateString = format.format(date);
        System.out.println(dateString);
    }
}
