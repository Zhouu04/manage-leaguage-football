package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.TeamDTO;

import java.util.List;

public interface TeamService {
  List<TeamDTO> findAllTeam();
  TeamDTO createTeam(TeamDTO team);
  TeamDTO updateTeam(TeamDTO team);
  List<TeamDTO> findTeamByIdSeason(String id);
  TeamDTO deleteTeam(String id);
}
