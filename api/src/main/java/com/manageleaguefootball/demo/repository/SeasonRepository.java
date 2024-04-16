package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.Season;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeasonRepository extends MongoRepository<Season, String> {
  List<Season> findAllByIdLeague(String id);
  void deleteByIdLeague(String id);
}
