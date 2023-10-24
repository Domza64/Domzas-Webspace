package xyz.domza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.domza.model.DiaryArticleModel;
import xyz.domza.repository.DiaryRepository;
import java.util.ArrayList;
import java.util.Collections;
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
        Collections.reverse(list);
        return list;
    }

    @Override
    public Optional<DiaryArticleModel> fetch(Integer id) {
        return diaryRepository.findById(id);
    }

    @Override
    public boolean insert(DiaryArticleModel item) {
        diaryRepository.save(item);
        return false;
    }

    public boolean update(DiaryArticleModel item, int id) {
        item.setId(id);
        diaryRepository.save(item);
        return false;
    }

    @Override
    public boolean delete(String id) {
        // TODO
        return false;
    }
}
