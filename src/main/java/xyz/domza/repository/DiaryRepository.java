package xyz.domza.repository;

import org.springframework.data.repository.CrudRepository;
import xyz.domza.model.DiaryArticleModel;

public interface DiaryRepository extends CrudRepository<DiaryArticleModel, Integer> {

}
