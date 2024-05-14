package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.PlayerDTO;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.model.Player;
import com.manageleaguefootball.demo.model.Season;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.PlayerRepository;
import com.manageleaguefootball.demo.repository.TeamRepository;
import com.manageleaguefootball.demo.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {
  private final TeamRepository teamRepository;
  private final PlayerRepository playerRepository;

  public static ModelMapper mapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  }

  public static PlayerDTO mapToViews(Player player) {
    if (player == null) {
      return null;
    }

    return mapper().map(player, PlayerDTO.class);
  }

  public static List<PlayerDTO> mapToView(List<Player> players) {
    return players.stream().map(d -> mapper().map(d, PlayerDTO.class))
      .collect(Collectors.toList());
  }

  @Override
  public List<PlayerDTO> findAllPlayer() {
    return mapToView(playerRepository.findAll());
  }

  @Override
  public PlayerDTO createPlayer(PlayerDTO model) {
    Team team = teamRepository.findById(model.getIdTeam()).orElse(null);
    if(team == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team id not found");
    }
    Player players = mapper().map(model, Player.class);

    return mapToViews(playerRepository.save(players));
  }

  @Override
  public List<PlayerDTO> findPlayerByIdTeam(String id) {
    List<Player> player = playerRepository.findAllByIdTeam(id);
    return mapToView(player);
  }

  @Override
  public PlayerDTO updatePlayer(PlayerDTO model) {
    Player player = playerRepository.findById(model.getId()).orElse(null);
    if(player == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player id not found");
    }
    mapper().map(model, player);
    return mapToViews(playerRepository.save(player));
  }

  @Override
  public PlayerDTO deletePlayer(String id) {
    Player player = playerRepository.findById(id).orElse(null);
    if(player == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Player id not found");
    }
    playerRepository.delete(player);
    return mapToViews(player);
  }

  @Override
  public List<PlayerDTO> getPlayerByOrderGoal(String idTeam) {
    List<Player> players = playerRepository.findAllByIdTeam(idTeam);


    players.sort(Comparator.comparingInt(Player::getGoal).reversed());


    List<Player> top5Players = players.stream().limit(5).collect(Collectors.toList());

    return mapToView(top5Players);
  }




}
