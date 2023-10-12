package xyz.domza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.domza.model.DiaryArticleModel;
import xyz.domza.repository.DiaryRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryService implements RepositoryService<DiaryArticleModel> {

    @Autowired
    private DiaryRepository diaryRepository;

    @Override
    public List<DiaryArticleModel> fetchAll() {
        List<DiaryArticleModel> list = new ArrayList<>();
        diaryRepository.findAll().forEach(list::add);
        return list;
    }

    @Override
    public Optional<DiaryArticleModel> fetch(String id) {
        // TODO
        return Optional.empty();
    }

    @Override
    public boolean insert(DiaryArticleModel item) {
        // TODO
        return false;
    }

    @Override
    public boolean delete(String id) {
        // TODO
        return false;
    }
}
