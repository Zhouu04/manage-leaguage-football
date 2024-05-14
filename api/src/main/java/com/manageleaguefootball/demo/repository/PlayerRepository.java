package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.model.Player;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PlayerRepository  extends MongoRepository<Player, String> {
  List<Player> findAllByIdTeam(String idTeam);
  void deleteById ( String idPlayer);

}
