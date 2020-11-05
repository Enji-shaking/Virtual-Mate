import java.time.LocalDateTime;

public class Chat {

	private int chatID;
	private LocalDateTime lastChatDatetime;
	private int userID; //from
	private int userIDTo;
	// the method to store messages depends on database's implementation
	
	public Chat() {
		
	}

	public int getChatID() {
		return chatID;
	}

	public void setChatID(int chatID) {
		this.chatID = chatID;
	}

	public LocalDateTime getLastChatDatetime() {
		return lastChatDatetime;
	}

	public void setLastChatDatetime(LocalDateTime lastChatDatetime) {
		this.lastChatDatetime = lastChatDatetime;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
		this.userID = userID;
	}

	public int getUserIDTo() {
		return userIDTo;
	}

	public void setUserIDTo(int userIDTo) {
		this.userIDTo = userIDTo;
	}



}
