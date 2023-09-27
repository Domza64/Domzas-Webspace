package xyz.domza.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DomzaController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
