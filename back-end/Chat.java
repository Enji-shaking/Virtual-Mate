import java.time.LocalDateTime;

public class Chat {

	public int Chat_ID;
	private LocalDateTime last_chat_datetime;
	public int User_ID; //from
	public int User_ID_to;
	// the method to store messages depends on database's implementation
	
	public Chat() {
		
	}

	public LocalDateTime getLast_chat_datetime() {
		return last_chat_datetime;
	}

	public void setLast_chat_datetime(LocalDateTime last_chat_datetime) {
		this.last_chat_datetime = last_chat_datetime;
	}

}
//