package com.skilldistillery.doggyTinder.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Message {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	@ManyToOne
	@JoinColumn(name="sender_id")
	private Dog thisDog;
	@ManyToOne
	@JoinColumn(name="reciever_id")
	private Dog thatDog;
	private String text;
	@Column(name="time_sent")
	@CreationTimestamp
	private Date date;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Dog getThisDog() {
		return thisDog;
	}
	public void setThisDog(Dog thisDog) {
		this.thisDog = thisDog;
	}
	public Dog getThatDog() {
		return thatDog;
	}
	public void setThatDog(Dog thatDog) {
		this.thatDog = thatDog;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((date == null) ? 0 : date.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((text == null) ? 0 : text.hashCode());
		result = prime * result + ((thatDog == null) ? 0 : thatDog.hashCode());
		result = prime * result + ((thisDog == null) ? 0 : thisDog.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Message other = (Message) obj;
		if (date == null) {
			if (other.date != null)
				return false;
		} else if (!date.equals(other.date))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (text == null) {
			if (other.text != null)
				return false;
		} else if (!text.equals(other.text))
			return false;
		if (thatDog == null) {
			if (other.thatDog != null)
				return false;
		} else if (!thatDog.equals(other.thatDog))
			return false;
		if (thisDog == null) {
			if (other.thisDog != null)
				return false;
		} else if (!thisDog.equals(other.thisDog))
			return false;
		return true;
	}
	@Override
	public String toString() {
		return "Message [id=" + id + ", thisDog=" + thisDog + ", thatDog=" + thatDog + ", text=" + text + ", date="
				+ date + "]";
	}
	public Message(Integer id, Dog thisDog, Dog thatDog, String text, Date date) {
		super();
		this.id = id;
		this.thisDog = thisDog;
		this.thatDog = thatDog;
		this.text = text;
		this.date = date;
	}
	public Message() {
		super();
	}
	
	
}
