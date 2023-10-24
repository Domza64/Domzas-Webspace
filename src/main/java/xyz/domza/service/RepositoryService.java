package xyz.domza.service;

import java.util.List;
import java.util.Optional;

public interface RepositoryService<T> {
    List<T> fetchAll();
    Optional<T> fetch(Integer id);
    boolean insert(T item);
    boolean delete(String id);
}
