package xyz.domza.model;

import jakarta.persistence.*;

@Entity
@Table(name = "diary_articles")
public class DiaryArticleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String title;
    private String text;
    private String imageIds;

    public DiaryArticleModel(String title, String text, String imageIds) {
        this.title = title;
        this.text = text;
        this.imageIds = imageIds;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getImageIds() {
        return imageIds.split(",");
    }

    public void setImageIds(String imageIds) {
        this.imageIds = imageIds;
    }
}
