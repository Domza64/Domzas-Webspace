package xyz.domza.repository;

import org.springframework.data.repository.CrudRepository;
import xyz.domza.model.UserCommentModel;

public interface GuestBookRepository extends CrudRepository<UserCommentModel, Integer> {

}
