package xyz.domza.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import xyz.domza.model.UserCommentModel;
import xyz.domza.service.GuestBookService;
import java.text.DateFormat;
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
}
