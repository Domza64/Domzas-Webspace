package xyz.domza.model;

import jakarta.persistence.*;

@Entity
@Table
public class DiaryArticleModel {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String text;
    private String imageIds;

    public DiaryArticleModel(String text, String imageIds) {
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

    public String[] getImageIds() {
        return imageIds.split(",");
    }

    public void setImageIds(String imageIds) {
        this.imageIds = imageIds;
    }
}
