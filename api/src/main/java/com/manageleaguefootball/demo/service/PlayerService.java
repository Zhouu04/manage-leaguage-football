package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.PlayerDTO;

import java.util.List;

public interface PlayerService {
  List<PlayerDTO> findAllPlayer();
  PlayerDTO createPlayer(PlayerDTO model);

  PlayerDTO updatePlayer(PlayerDTO model);
  PlayerDTO deletePlayer(String id);
  List<PlayerDTO> findPlayerByIdTeam(String id);
  List<PlayerDTO> getPlayerByOrderGoal(String id);
}
