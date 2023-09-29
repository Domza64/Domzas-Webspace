package xyz.domza.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
public class DomzaRestController {
    private record Message(String name, String message, String date) {};

    @GetMapping("/comments")
    public List<Message> getComments() {
        return List.of(
                new Message("Domza64", "Yo this is epic", "1.2.2200"),
                new Message("Jovo", "Sta je ovo", "1.5.2020"),
                new Message("Stipko", "Najbolja strana na internetu ei!", "15.5.1700")
                );
    }
}
