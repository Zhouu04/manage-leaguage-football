package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.Info.TeamPageInfo;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.model.Season;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.SeasonRepository;
import com.manageleaguefootball.demo.repository.TeamRepository;
import com.manageleaguefootball.demo.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
  private final TeamRepository teamRepository;
  private final SeasonRepository seasonRepository;

  public static ModelMapper mapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  }

  public static TeamDTO mapToView(Team team) {
    if (team == null) {
      return null;
    }

    return mapper().map(team, TeamDTO.class);
  }

  public static List<TeamDTO> mapToView(List<Team> teams) {
    return teams.stream().map(d -> mapper().map(d, TeamDTO.class))
      .collect(Collectors.toList());
  }

  @Override
  public List<TeamDTO> findAllTeam() {
    return mapToView(teamRepository.findAll());
  }

  @Override
  public TeamDTO createTeam(TeamDTO model) {
    Season season = seasonRepository.findById(model.getIdSeason()).orElse(null);
    if(season == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Season id not found");
    }
    Team team = mapper().map(model, Team.class);

    return mapToView(teamRepository.save(team));
  }

  @Override
  public TeamDTO updateTeam(TeamDTO model) {
    Team team = teamRepository.findById(model.getId()).orElse(null);
    if(team == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team id not found");
    }
    mapper().map(model, team);
    return mapToView(teamRepository.save(team));
  }

  @Override
  public List<TeamDTO> findTeamByIdSeason(String id) {
    List<Team> teams = teamRepository.findAllByIdSeason(id);
    return mapToView(teams);
  }

  @Override
  public TeamDTO deleteTeam(String id) {
    Team team = teamRepository.findById(id).orElse(null);
    if(team == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Team id not found");
    }
    teamRepository.delete(team);
    return mapToView(team);
  }

  @Override
  public List<TeamDTO> findTeamByOrderScore(String idSeason) {
    List<Team> teams = teamRepository.findAllByIdSeason(idSeason);
    teams.sort(Comparator.comparingInt(Team::getScore)
      .thenComparingInt(team -> team.getGoalWin() - team.getGoalLoss())
      .reversed());

    return mapToView(teams);
  }

  @Override
  public List<TeamDTO> search(String id,TeamPageInfo model) {
    return  mapToView(teamRepository.search(id,model));
  }

  @Override
  public Long count(String id,TeamPageInfo model) {
    return teamRepository.count(id,model);
  }

  @Override
  public List<TeamDTO> searchTeam(TeamPageInfo model) {
    return  mapToView(teamRepository.searchT(model));
  }

  @Override
  public Long countTeam(TeamPageInfo model) {
    return teamRepository.countT(model);
  }
}
