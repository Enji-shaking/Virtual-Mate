package com.virtualmate.myArtifact.api;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.virtualmate.myArtifact.model.Card;
import com.virtualmate.myArtifact.model.User;
import com.virtualmate.myArtifact.service.TodoService;
import com.virtualmate.myArtifact.submodel.UserCredentials;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/user/todo")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TodoController {
	private final TodoService todoService;
    
    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }
    
    
    @GetMapping("list")
    public List<Card> getTodoList(@RequestPara("userId") String userId, @RequestPara("password") String password ){
        return todoService.getTodoList(java.util.UUID.fromString(userId),password);
    }

    public static class TargetItemWrapper{
        public String cardId;
        public UserCredentials userCredentials;

        public TargetItemWrapper(@JsonProperty("userCred") UserCredentials userCredentials, @JsonProperty("cardId") String cardId) {
            this.userCredentials = userCredentials;
            this.cardId = cardId;
        }
    }

    /*
		{
			"userCred":{
				"userId": "fe96f7ec-7e8a-431f-9a3c-3298cd55238b",
				"password": "xxx"
			},
			"cardId": "5"
		}
    */
    //I'm really not sure who added @Response body here. I believe it should not be added but if someone else did, I'm not going to touch it. But just add here as a reminder if any bugs happen in the future
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
    //Front end make it "post". Consider remake it delete in the future
    @PostMapping("remove")
    public boolean removeTodoItem(@RequestBody TargetItemWrapper wrapper){
        return todoService.removeTodoItem(wrapper.userCredentials.getUserId(), wrapper.userCredentials.getPassword(), wrapper.cardId);
    }
}