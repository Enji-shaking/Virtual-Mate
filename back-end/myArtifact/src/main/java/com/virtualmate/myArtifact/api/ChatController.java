package com.virtualmate.myArtifact.api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Chat;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.ChatService;
import com.virtualmate.myArtifact.service.UserService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/chat")
@RestController
public class ChatController {
    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    public static class withOtherWrapper{
        public UserCredentials userCredentials;
        public String userId_other;
        public withOtherWrapper(@JsonProperty("userCred") UserCredentials userCredentials, @JsonProperty("userId_other") String userId_other) {
            this.userCredentials = userCredentials;
            this.userId_other = userId_other;
        }
    }
    /*
		{
			"userCred":{
				"userId": "fe96f7ec-7e8a-431f-9a3c-3298cd55238b",
				"password": "xxx"
			},
			"userId_other": "5"
		}
	*/
    @GetMapping("canchat")
	public int CheckConnectionWith(@RequestBody withOtherWrapper wrapper) {
		// return null;
        return chatService.getInfoUserOther(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(),
        wrapper.userId_other);
    }
    
    @PostMapping("request")
    public boolean requestChat(@RequestBody withOtherWrapper wrapper){
        return chatService.requestChat(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(),
        wrapper.userId_other);
    }
    
    @GetMapping("list")
	public List<Chat> getChatList(@RequestBody UserCredentials userCredentials) {
        return chatService.getChatList(userCredentials.getUserId(), userCredentials.getPassword());
    }

    @GetMapping("request")
	public List<User> getChatRequest(@RequestBody UserCredentials userCredentials) {
        return chatService.getChatRequest(userCredentials.getUserId(), userCredentials.getPassword());
    }

    //api/chat/acceptance?accepted=1&&requestId=2
    @PostMapping("acceptance")
    public boolean acceptRequest(@RequestBody withOtherWrapper wrapper, @RequestParam("accepted") boolean accepted, @RequestParam("requestId") String requestId){
        return chatService.acceptRequest(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), accepted, requestId);
    }

}

    
