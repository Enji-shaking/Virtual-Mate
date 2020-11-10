import java.util.*;

public class Tag {
	
	private String tagName;
	private int tagID;
	private Set<Card> relatedCards;
	
	public Tag() {
		
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public int getTagID() {
		return tagID;
	}

	public void setTagID(int tagID) {
		this.tagID = tagID;
	}

	public Set<Card> getRelatedCards() {
		return relatedCards;
	}

	public void setRelatedCards(Set<Card> relatedCards) {
		this.relatedCards = relatedCards;
	}

}
