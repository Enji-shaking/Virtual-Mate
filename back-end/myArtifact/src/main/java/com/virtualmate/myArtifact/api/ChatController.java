package com.virtualmate.myArtifact.api;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    
    public static class CheckConnectionWithWrapper{
        private int cardId;
        public User userSelf;
        public User userOther;

        public CheckConnectionWithWrapper(@JsonProperty("userSelf") User userSelf,  @JsonProperty("userOther") User userOther, @JsonProperty("cardId") int cardId) {
            this.userSelf = userSelf;
            this.userOther = userOther;
            this.cardId = cardId;
        }
        public CheckConnectionWithWrapper(){
            
        }
    }
}

    
