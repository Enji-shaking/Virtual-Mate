package com.virtualmate.myArtifact.api;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.TodoService;
import com.virtualmate.myArtifact.submodel.UserCredentials;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/user/todo")
@RestController
public class TodoController {
	private final TodoService todoService;
    
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    
    @GetMapping("list")
    public List<Card> getTodoList(@RequestBody UserCredentials userCredentials){
        return todoService.getTodoList(userCredentials.getUserId(), userCredentials.getPassword());
    }

    public static class TargetItemWrapper{
        public String cardId;
        public UserCredentials userCredentials;

        public TargetItemWrapper(@JsonProperty("userCred") UserCredentials userCredentials, @JsonProperty("cardId") String cardId) {
            this.userCredentials = userCredentials;
            this.cardId = cardId;
        }
    }
    @PostMapping("add")
    public @ResponseBody boolean addTodoItem(@RequestBody TargetItemWrapper wrapper){
        //may need to use @RequestParam("CardId") UUID cardId
        return todoService.addTodoItem( wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.cardId);
    }

    @PostMapping("mark")
    public boolean markTodoItem(@RequestBody TargetItemWrapper wrapper){
        return todoService.markTodoItem( wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.cardId);
        //if completed, set to incompleted. If incompleted, set to completed
        
    }

    @DeleteMapping("remove")
    public boolean removeTodoItem(@RequestBody TargetItemWrapper wrapper){
        return todoService.removeTodoItem(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.cardId);
    }
    
    

}