package com.virtualmate.myArtifact.api;

import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.ChatService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/chat")
@RestController
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("album/add")
	public boolean addAlbumUser(@RequestBody User user) {
		return chatService.addAlbumUser(user);
	}
}

    
