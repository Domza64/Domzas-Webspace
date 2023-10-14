package xyz.domza.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user_comments")
public class UserCommentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank(message = "Sorry, but username can't be empty :(")
    @Size(max=30, message = "Username can be max 30 characters :(")
    private String username;
    @NotBlank(message = "U don't need to write much but must write at least something :)")
    @Size(max=255, message = "Message can't be over 255 characters :(")
    private String message;
    private String date;

    public UserCommentModel(String username, String message, String date) {
        this.username = username;
        this.message = message;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserCommentModel() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
