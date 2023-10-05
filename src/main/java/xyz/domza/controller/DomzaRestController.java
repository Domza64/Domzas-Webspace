package xyz.domza.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.domza.Message;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DomzaRestController {

    public static List<Message> messages = new ArrayList<>(List.of(
            new Message("Domza64", "Yo this is epic", "1.2.2200"),
            new Message("Jovo", "Sta je ovo", "1.5.2020"),
            new Message("Stipko", "Najbolja strana na internetu ei!", "15.5.1700")
    ));

    @GetMapping("/comments")
    public List<Message> getComments() {
        return messages;
    }

    @GetMapping("/diary-articles")
    public List<String> getDiaryArticles() {
        List<String> list = new ArrayList<>(List.of("""
                ## Title
                ### Smaller title
                text waosd jfl dsl ek fjvoie sldf
                - list item
                - list item 2
                """,
                "## Article 2"));
        list.add("## Article 3");
        return list;
    }
}
