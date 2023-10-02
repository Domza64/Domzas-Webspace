package xyz.domza.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import xyz.domza.Message;

import java.util.Date;

@Controller
public class DomzaController {
    @GetMapping("/")
    public ModelAndView index(Model model) {
        return new ModelAndView("index", "message_form", new Message());
    }

    @PostMapping("/submit-message")
    public String submitMessage(@ModelAttribute("message_form") Message message) {
        System.out.println(message.getName() + ", " + message.getMessage());
        DomzaRestController.messages.add(new Message(message.getName(), message.getMessage(), new Date().toString()));
        return "redirect:/#guest-book";
    }
}
