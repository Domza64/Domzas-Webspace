package xyz.domza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.domza.model.UserCommentModel;
import xyz.domza.repository.GuestBookRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GuestBookService {

    @Autowired
    private GuestBookRepository guestBookRepository;

    public List<UserCommentModel> fetchAll() {
        List<UserCommentModel> list = new ArrayList<>();
        guestBookRepository.findAll().forEach(list::add);
        return list;
    }

    public Optional<UserCommentModel> fetchById(Integer id) {
        return guestBookRepository.findById(id);
    }

    public void insert(UserCommentModel userCommentModel) {
        guestBookRepository.save(userCommentModel);
    }

    public void delete(int id) {
        guestBookRepository.deleteById(id);
    }
}
