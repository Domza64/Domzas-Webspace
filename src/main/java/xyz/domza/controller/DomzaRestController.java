package xyz.domza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import xyz.domza.model.UserCommentModel;
import xyz.domza.service.DiaryService;
import xyz.domza.service.GuestBookService;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/diary-articles")
    public List<String> getDiaryArticles() {
        List<String> articles = new ArrayList<>();
        diaryService.fetchAll().forEach(article -> articles.add(article.getText()));
        return articles;
    }

    @DeleteMapping("/remove-comment/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id, Principal principal) {
        // TODO: 11/5/23 - Replace hardcoded github user ID, or add user roles like ADMIN or something
        if (principal == null || !principal.getName().equals("91377780")) ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");

        Optional<UserCommentModel> userCommentOptional = guestBookService.fetchById(id);
        if (userCommentOptional.isPresent()) {
            guestBookService.delete(id);
            return ResponseEntity.ok("Comment deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found");
        }
    }
}
