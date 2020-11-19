package com.virtualmate.myArtifact.api;

import com.virtualmate.myArtifact.dao.ChatDao;
import com.virtualmate.myArtifact.model.Chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("enji/test")
@RestController
public class EnjiController {
    private final ChatDao chatDaoMark;
    private final ChatDao chatDaoEnji;
    @Autowired
    public EnjiController(@Qualifier("fbDaoChat") ChatDao chatDaoMark, @Qualifier("fbEnjiChat") ChatDao chatDaoEnji){
        this.chatDaoEnji = chatDaoEnji;
        this.chatDaoMark = chatDaoMark;
    }

    @PostMapping("createChats")
    public void createChats(){
        Chat c1 = new Chat("0f1f08d3-8d63-4148-81e4-1d6e1c267f90", "8b3fd872-5b1c-4d6d-8853-8b943d925d7e"); //12
        Chat c2 = new Chat("0f1f08d3-8d63-4148-81e4-1d6e1c267f90", "8be7c3a2-efb1-4bd1-8076-58bc28b1ce99"); //13
        Chat c3 = new Chat("0f1f08d3-8d63-4148-81e4-1d6e1c267f90", "f3e2a8b4-e95e-45f2-a94e-f88833f07383"); //14
        Chat c4 = new Chat("8be7c3a2-efb1-4bd1-8076-58bc28b1ce99", "f3e2a8b4-e95e-45f2-a94e-f88833f07383"); //34
        chatDaoEnji.setChat(c1);
        chatDaoEnji.setChat(c2);
        chatDaoEnji.setChat(c3);
        chatDaoEnji.setChat(c4);
    }

    
    
}
