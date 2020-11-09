package com.virtualmate.myArtifact.api;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.TodoService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/todo")
@RestController
public class TodoController {
	private final TodoService todoService;
    
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    
    @GetMapping("list")
    public List<Card> getTodoList(@RequestBody User user){
        return todoService.getTodoList(user);
    }

    public static class AddTodoItemWrapper{
        public String cardId;
        public User user;

        public AddTodoItemWrapper(@JsonProperty("user") User user, @JsonProperty("cardId") String cardId) {
            this.user = user;
            this.cardId = cardId;
        }
    }
    @PostMapping("add")
    public @ResponseBody boolean addTodoItem(@RequestBody AddTodoItemWrapper wrapper){
        //may need to use @RequestParam("CardId") UUID cardId
        return todoService.addTodoItem( wrapper.user, wrapper.cardId);
    }

    @PostMapping("mark")
    public boolean markTodoItem(@RequestBody User user, @JsonProperty("cardId") String cardId){
        return todoService.markTodoItem(user, cardId);
    }

    @PostMapping("remove")
    public boolean removeTodoItem(@RequestBody User user, @JsonProperty("cardId") String cardId){
        return todoService.removeTodoItem(user, cardId);
    }
    
    

}