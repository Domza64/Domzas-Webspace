package xyz.domza.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import xyz.domza.model.UserCommentModel;
import xyz.domza.service.GuestBookService;

import java.util.Date;

@Controller
public class DomzaController {

    @Autowired
    private GuestBookService guestBookService;

    @GetMapping("/")
    public ModelAndView index(Model model) {
        return new ModelAndView("index", "message_form", new UserCommentModel());
    }

    @GetMapping("/diary")
    public String diary() {
        return "diary";
    }

    @PostMapping("/submit-message")
    public String submitMessage(@ModelAttribute("message_form") UserCommentModel userComment) {
        // TODO - data validation
        guestBookService.insert(new UserCommentModel(userComment.getUserName(), userComment.getMessage(), new Date().toString()));
        return "redirect:/#guest-book";
    }
}
