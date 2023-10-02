package xyz.domza;

public class Message {
    private String name;
    private String message;
    private String date;

    public Message(String name, String message, String date) {
        this.name = name;
        this.message = message;
        this.date = date;
    }

    public Message() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
