package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.League;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeagueRepository extends MongoRepository<League, String> {
  League findByName(String name);
}
