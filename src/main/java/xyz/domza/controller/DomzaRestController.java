package xyz.domza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.domza.model.UserCommentModel;
import xyz.domza.service.DiaryService;
import xyz.domza.service.GuestBookService;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DomzaRestController {

    @Autowired
    private GuestBookService guestBookService;
    @Autowired
    private DiaryService diaryService;

    @GetMapping("/comments")
    public List<UserCommentModel> getComments() {
        return guestBookService.fetchAll();
    }

    // TODO - Return Article object, that contains images and text from database
    @GetMapping("/diary-articles")
    public List<String> getDiaryArticles() {
        List<String> articles = new ArrayList<>();
        diaryService.fetchAll().forEach(article -> articles.add(article.getText()));
        return articles;
    }
}
