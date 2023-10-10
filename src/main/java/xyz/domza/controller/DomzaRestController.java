package xyz.domza.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.domza.dto.Message;

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

    // TODO - Return Article object, that contains images and text from database
    @GetMapping("/diary-articles")
    public List<String> getDiaryArticles() {
        List<String> list = new ArrayList<>();
        list.add("""
                ## Fire, Stickers and Spring Boot
                #### (10. Sep 2023.)
                ### What I've been doing...
                                
                I haven't been posting much, but I've been doing a lot.
                Currently, I'm working on a secret project in Spring Boot; I can't talk about it yet, but potentially it
                could be a website with a lot of users that actually earns me some passive money. Anyway, besides that,
                I am learning Spring Boot since I am quite comfy with Java now. Also, I'd say I have a decent knowledge of
                HTML and CSS now and am starting to get familiar with Java Script. I still don't know much about databases,
                but that is something I am looking to learn in the future. Basically, I'll be familiar with Java and Spring
                Boot, as well as HTML, CSS, Java Script, SQL, and MongoDB, which is pretty cool.
                Also, I started a project in Angular: Cook It Up Though I am not currently planning to learn Angular,
                I used this chance to get familiar with it and work on my Angular project together with my friend who has
                to make an Angular project for college. Basically, it's just a basic, not useful website. Its only purpose
                is for me to get familiar with Angular. Currently, the project is just an initialized github repo, but hopefully
                It will be something at the point that you are reading this.
                ### Forest fire
                                
                This happened on September 7, but I'm writing it now.
                So basically, I was just riding my bike, like I usually do, and all of a sudden I entered a just-burned-down forest...
                I have no fucking idea how I didn't see it earlier but it was just like.. everything normal, and then just a straight
                line separating normal from burned down. The ground was still soo hot to touch but very wet, and I saw firefighters
                around 30 meters from me. It was just a feeling you can't describe—I dunno, the smell, the wet but hot ground and
                the super straight line separating burned-down from not-burned-down.
                                
                This article is a mess lol. I was just randomly writing what came to my mind...
                
                <br><br>
                
                ![Cool sticker](/assets/media/images/diary/domza-sticker-2.webp)
                ![Burned down forest](/assets/media/images/diary/forest-fire.webp)
                
                Images of custom sticker I made for my new bike...
                They just look amazing espettially in real life.
                
                Also a part of burned down forest I saw.
                """);
        list.add("""
                ## Senj
                #### (16. Aug 2023.)
                                
                Hmhm.. Yesterday I returned from my 3 day trip to Senj, I visited my grandma, who lives there.
                Though short, the trip was amazing.
                
                I almost wasn't even using my phone. I went to the beach with a book instead of my phone,
                I only took it when I was on my bike just in case I fail a bunny hop and brake my leg or sm
                like that, so I can call for help :(... Didn't end up using it tho. Yeah, it was just so relaxing
                and chill. I realized that it's really not that hard to be outside without a phone. Yeah, sometimes
                you are like, ahh.. if only I had my phone to take a picture of this or look at a clock or sm
                like that, but I realized that it is really not that important to know exacly what time it
                is.. I'm on vacation after all and don't need to be connected with everyone all the time.
                Also, it makes you think; you see something interesting, enjoy it and remember it so you
                can talk about it later and not just take a picture and leave. It makes you rely on your
                memory and instincts instead of GPS and much more. It wasn't boring at all, I will definitely
                go out without my phone more often from now on. I dunno, it just makes you feel free..
                It's literally more fun when you have nothing with you.. no need to worry about anything,
                just enjoing the moment. This sounds so generic and kind of stupid, I know... everyone is
                saying like "No phone = happy = enjoy moment'n shit like that" BUT it really is TRUE.
                
                <br><br>
                
                ![Senj picture](/assets/media/images/diary/Senj-bike.webp)
                ![Vratink](/assets/media/images/diary/Senj-vratnik.webp)
                
                Images from Senj... Actually image of my bike is from Senj and other one is from Vratnik, a place next to senj.
                """);
        return list;
    }
}
