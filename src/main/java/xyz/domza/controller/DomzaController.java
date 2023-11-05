package xyz.domza.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import xyz.domza.model.UserCommentModel;
import xyz.domza.service.DiaryService;
import xyz.domza.service.GuestBookService;
import java.security.Principal;
import java.text.DateFormat;
import java.util.Date;


@Controller
public class DomzaController {

    @Autowired
    private GuestBookService guestBookService;
    @Autowired
    private DiaryService diaryService;

    @GetMapping("/")
    public ModelAndView index(Model model) {
        return new ModelAndView("index", "message_form", new UserCommentModel());
    }

    @GetMapping("/admin")
    public String admin(Model model, Principal principal) {
        // TODO: 11/5/23 - Replace hardcoded github user ID, or add user roles like ADMIN or something
        if (principal == null || !principal.getName().equals("91377780")) ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden");

        model.addAttribute("user_comments", guestBookService.fetchAll());
        model.addAttribute("diary_articles", diaryService.fetchAll());
        return "admin";
    }

    @GetMapping("/diary")
    public String diary() {
        return "diary";
    }

    @GetMapping("/mtb")
    public String mtb() {
        return "mtb";
    }

    @PostMapping("/submit-message")
    public String submitMessage(@Valid @ModelAttribute("message_form") UserCommentModel userComment, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            String date = DateFormat.getDateInstance().format(new Date());
            guestBookService.insert(new UserCommentModel(userComment.getUsername(), userComment.getMessage(), date));
            return "redirect:/#guest-book";
        }
        return "index";
    }

    @PostMapping("/test")
    public String test() {
        return "mtb";
    }
}
