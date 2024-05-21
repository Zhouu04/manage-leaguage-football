package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.Team;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends MongoRepository<Team, String>, TeamRepositoryCustom {
  List<Team> findAllByIdSeason(String idSeason);
  void deleteAllByIdSeason(String idSeason);
  Team findByName(String name);
}
