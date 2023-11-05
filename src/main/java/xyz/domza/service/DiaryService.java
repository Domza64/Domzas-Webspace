package xyz.domza.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import xyz.domza.model.DiaryArticleModel;
import xyz.domza.repository.DiaryRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    public List<DiaryArticleModel> fetchAll() {
        List<DiaryArticleModel> list = new ArrayList<>();
        diaryRepository.findAll().forEach(list::add);
        Collections.reverse(list);
        return list;
    }
}
