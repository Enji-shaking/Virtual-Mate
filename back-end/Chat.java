import java.time.LocalDateTime;

public class Chat {

	private int chatID;
	private LocalDateTime lastChatDatetime;
	private String userID; //from
	private String userIDTo;
	private User user;
	private int canChat; //connection:enum(“isFriend”,”pending”, "notRequested", "refused")
	
	public Chat() {
		//construct the user: fetch the user with corresponding userID from database
	}
	
	public int CheckMutualConnection(String userId, String userHashedPass)
	{
		if (!user.validate(userId, userHashedPass))
			return 3; //or throw an exception?
		return canChat;
	}
	
	public boolean RequestChat(String userId, String userHashedPass)
	{	
		if (!user.validate(userId, userHashedPass))
			return false;
		//success
		return true;
	}
	
	public void ProcessChatRequest(String userId, String userHashedPass, boolean isAccepted)
	{
		if (!user.validate(userId, userHashedPass))
			//throw an exception?
			
		if (isAccepted)
			canChat = 1;
		else
			canChat = 4;
		//Delete request on front end
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

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getUserIDTo() {
		return userIDTo;
	}

	public void setUserIDTo(String userIDTo) {
		this.userIDTo = userIDTo;
	}

	public void setCanChat(int canChat) {
		this.canChat = canChat;
	}



}
