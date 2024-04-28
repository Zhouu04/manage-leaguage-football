package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, String> {
  List<Schedule> findAllByIdSeason(String idSeason);
  void deleteAllByIdSeason(String idSeason);
}
