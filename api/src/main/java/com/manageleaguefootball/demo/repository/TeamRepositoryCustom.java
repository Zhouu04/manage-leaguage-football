package com.manageleaguefootball.demo.repository;

import com.manageleaguefootball.demo.dto.Info.TeamPageInfo;
import com.manageleaguefootball.demo.model.Team;

import java.util.List;

public interface TeamRepositoryCustom {
  List<Team> search(String idSeason,TeamPageInfo model);

  Long count(String idSeason, TeamPageInfo model);

  List<Team> searchT(TeamPageInfo model);
  Long countT( TeamPageInfo model);
}
