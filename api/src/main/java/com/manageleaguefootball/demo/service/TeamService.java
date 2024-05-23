package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.Info.TeamPageInfo;
import com.manageleaguefootball.demo.dto.TeamDTO;

import java.util.List;

public interface TeamService {
  List<TeamDTO> findAllTeam();
  TeamDTO createTeam(TeamDTO team);
  TeamDTO updateTeam(TeamDTO team);
  List<TeamDTO> findTeamByIdSeason(String id);
  TeamDTO deleteTeam(String id);
  List<TeamDTO> findTeamByOrderScore(String idSeason);
  List<TeamDTO> search(String idSeason,TeamPageInfo model);
  Long count(String idSeason,TeamPageInfo model);

  List<TeamDTO> searchTeam(TeamPageInfo model);
  Long countTeam(TeamPageInfo model);
}
