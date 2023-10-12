package xyz.domza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.domza.model.UserCommentModel;
import xyz.domza.repository.GuestBookRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GuestBookService implements RepositoryService<UserCommentModel> {

    @Autowired
    private GuestBookRepository guestBookRepository;

    @Override
    public List<UserCommentModel> fetchAll() {
        List<UserCommentModel> list = new ArrayList<>();
        guestBookRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Optional<UserCommentModel> fetch(String id) {
        // TODO
        return Optional.empty();
    }

    @Override
    public boolean insert(UserCommentModel item) {
        guestBookRepository.save(item);
        return true;
    }

    @Override
    public boolean delete(String id) {
        // TODO
        return false;
    }
}
