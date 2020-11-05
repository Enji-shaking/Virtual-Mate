import java.util.*;

public class Card {

	private int cardID;
	private String activityName;
	private Image activityImage;
	private Set<Tag> relatedTags;
	private List<User> accomplishedUsers;
	
	public Card() {
		
	}
	
	public int getCardID() {
		return cardID;
	}

	public void setCardID(int cardID) {
		this.cardID = cardID;
	}

	public String getActivityName() {
		return activityName;
	}

	public void setActivityName(String activityName) {
		this.activityName = activityName;
	}

	public Image getActivityImage() {
		return activityImage;
	}

	public void setActivityImage(Image activityImage) {
		this.activityImage = activityImage;
	}

	public Set<Tag> getRelatedTags() {
		return relatedTags;
	}

	public void setRelatedTags(Set<Tag> relatedTags) {
		this.relatedTags = relatedTags;
	}

	public void addAccomplishedUsers(User accomplishedUser) {
		accomplishedUsers.add(accomplishedUser);
	}

}
