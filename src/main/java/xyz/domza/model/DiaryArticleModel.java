package xyz.domza.model;

import jakarta.persistence.*;

@Entity
@Table
public class DiaryArticleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String text;

    public DiaryArticleModel(String text) {
        this.text = text;
    }

    public DiaryArticleModel() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
