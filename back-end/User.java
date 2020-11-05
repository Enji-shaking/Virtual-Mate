import java.util.*;

public class User {

	private String userName;
	private String userID;
	private String email;
	private String password;
	private String userHashedPass; //generated in User constructor
	private boolean isOnline;
	private List<UserCard> cardsPlanned;
	private List<UserCard> cardsAccomplished;
	private Image avatar;
	private List<Image> album;
	private List<Chat> chats;

	public User() {
		
	}
	
	public boolean validate(String userId, String userHashedPass)
	{
		if (this.userID.equals(userId) && this.userHashedPass.equals(userHashedPass))
			return true;
		else
			return false;
	}
	
	public User GetUserProfile(String userId, String userHashedPass, String otherUserId)
	{
		if (!validate(userId, userHashedPass))
			return null;
//		return:
//		userName: string
//		userImages: [URL]
//		userAvatar: URL
//		Cardlist: return the intersection between the two user's footprints
//			[
//			cardId:int
//			cardName:string
//			cardImage:URL
//			cardTags:[string]
//			]

	}
	
	public boolean AvatarSetting(String userId, Image image, String userHashedPass)
	{
		if (!validate(userId, userHashedPass))
			return false;
		
		// Success
		return true;
	}
	
	public boolean AddToAlbum(String userId, Image image, String userHashedPass)
	{
		if (!validate(userId, userHashedPass))
			return false;
		
		// Success
		return true;
	}
	
	public boolean DeleteImageFromAlbum(String userId, int idx, String userHashedPass)//idx: between 0,5, inclusive
	{
		if (!validate(userId, userHashedPass))
			return false;
		
		// Success
		return true;
	}
	
	public void set_Online()
	{
		this.isOnline = true;
	}
	
	public boolean RemoveCard(UserCard to_remove, String userId, String userHashedPass)
	{
		//first confirm userHashedPass
		if (!validate(userId, userHashedPass))
			return false;
		
		// Search the list Cards_Planned
		
		// Remove this card from Cards_Planned
		
		//success
		return true;
	}
	
	public boolean MarkComplete(UserCard to_complete, String userId, String userHashedPass)
	{
		//first confirm userHashedPass
		if (!validate(userId, userHashedPass))
			return false;
		
		to_complete.setComplete();
		RemoveCard(to_complete, userId, userHashedPass);
		cardsAccomplished.add(to_complete);
		Card completed_card = to_complete.toCard();
		completed_card.addAccomplishedUsers(this);
		
		//success
		return true;
	}
	
	public List<Chat> GetChatList(String userId, String userHashedPass)
	{	
		if (!validate(userId, userHashedPass))
			return null;
//		return Chats:
//			[
//			Username:String
//			UserId:int
//			ChatId:String
//			UserAvatar: URL
//			]
//
//		Default Ranking by alphabet 

		return chats;
	}
	
	public List<String> GetChatRequest(String userId, String userHashedPass)
	{	
		if (!validate(userId, userHashedPass))
			return null;
//		return users: 
//		[
//		Userid:id
//		]
//		Call GetUserProfile on Front end in a loop

	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isOnline() {
		return isOnline;
	}

	public void setOnline(boolean isOnline) {
		this.isOnline = isOnline;
	}

	public List<UserCard> getCardsPlanned(String userId, String userHashedPass) {
		if (!validate(userId, userHashedPass))
			return null;		
		return cardsPlanned;
	}

	public void setCardsPlanned(List<UserCard> cardsPlanned) {
		this.cardsPlanned = cardsPlanned;
	}

	public List<UserCard> getCardsAccomplished(String userId, String userHashedPass) {
		if (!validate(userId, userHashedPass))
			return null;		
		return cardsAccomplished;
	}

	public void setCardsAccomplished(List<UserCard> cardsAccomplished) {
		this.cardsAccomplished = cardsAccomplished;
	}

	public void setChats(List<Chat> chats) {
		this.chats = chats;
	}

	public String getUserHashedPass() {
		return userHashedPass;
	}

	public void setUserHashedPass(String userHashedPass) {
		this.userHashedPass = userHashedPass;
	}

	public Image getAvatar() {
		return avatar;
	}

	public void setAvatar(Image avatar) {
		this.avatar = avatar;
	}

	public List<Image> getAlbum() {
		return album;
	}

	public void setAlbum(List<Image> album) {
		this.album = album;
	}


	

}
