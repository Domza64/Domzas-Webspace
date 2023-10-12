package xyz.domza.model;

import jakarta.persistence.*;

@Entity
@Table
public class UserCommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String userName;
    private String message;
    private String date;

    public UserCommentModel(String userName, String message, String date) {
        this.userName = userName;
        this.message = message;
        this.date = date;
    }

    public UserCommentModel() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
