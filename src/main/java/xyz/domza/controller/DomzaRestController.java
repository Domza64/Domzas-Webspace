package xyz.domza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/diary-articles")
    public List<String> getDiaryArticles() {
        List<String> articles = new ArrayList<>();
        diaryService.fetchAll().forEach(article -> articles.add(article.getText()));
        return articles;
    }

//    @GetMapping(value = "/images/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
//    Resource downloadImage(@PathVariable Long imageId) {
//        byte[] image = imageRepository.findById(imageId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
//                .getImageData();
//
//        return new ByteArrayResource(image);
//    }
    // for html - <img th:src="@{/images/${image.id}}" alt="Image">
}
