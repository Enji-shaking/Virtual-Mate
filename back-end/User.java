import java.util.*;

public class User {

	private String userName;
	private int userID;
	private String email;
	private String password;
	private boolean isOnline;
	private List<UserCard> cardsPlanned;
	private List<UserCard> cardsAccomplished;
	private List<Image> userImages;
	private List<Chat> keptChats;
	
	
	public User() {
		
	}
	
	public void set_Online()
	{
		this.isOnline = true;
	}
	
	public void Remove_Card(UserCard to_remove)
	{
		// Search the list Cards_Planned
		
		// Remove this card from Cards_Planned
	}
	
	public void Complete_Card(UserCard to_complete)
	{
		to_complete.setComplete();
		Remove_Card(to_complete);
		cardsAccomplished.add(to_complete);
		Card completed_card = to_complete.toCard();
		completed_card.getAccomplishedUsers().add(this);
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getUserID() {
		return userID;
	}

	public void setUserID(int userID) {
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

	public List<UserCard> getCardsPlanned() {
		return cardsPlanned;
	}

	public void setCardsPlanned(List<UserCard> cardsPlanned) {
		this.cardsPlanned = cardsPlanned;
	}

	public List<UserCard> getCardsAccomplished() {
		return cardsAccomplished;
	}

	public void setCardsAccomplished(List<UserCard> cardsAccomplished) {
		this.cardsAccomplished = cardsAccomplished;
	}

	public List<Image> getUserImages() {
		return userImages;
	}

	public void setUserImages(List<Image> userImages) {
		this.userImages = userImages;
	}

	public List<Chat> getKeptChats() {
		return keptChats;
	}

	public void setKeptChats(List<Chat> keptChats) {
		this.keptChats = keptChats;
	}


	

}
