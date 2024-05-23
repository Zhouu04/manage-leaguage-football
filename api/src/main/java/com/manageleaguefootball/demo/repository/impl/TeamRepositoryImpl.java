package com.manageleaguefootball.demo.repository.impl;

import com.manageleaguefootball.demo.dto.Info.TeamPageInfo;
import com.manageleaguefootball.demo.helper.QueryUtils;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.TeamRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;


@RequiredArgsConstructor
public class TeamRepositoryImpl implements TeamRepositoryCustom {
  private final MongoTemplate mongoTemplate;
  private Query buildSearchQuery(String idSeason, TeamPageInfo model, boolean count) {
    Query query = new Query(Criteria.where("idSeason").is(idSeason));
    if (!count) {
      QueryUtils.getQuerySortAndPageable(query, model);
    }
    return query;
  }

  private Query buildSearchQuery2(TeamPageInfo model, boolean count) {
    Query query = new Query();
    if (!count) {
      QueryUtils.getQuerySortAndPageable(query, model);}
    return query;
  }


  @Override
  public List<Team> search(String idSeason,TeamPageInfo model) {
    return mongoTemplate.find(buildSearchQuery(idSeason ,model, false), Team.class);
  }

  @Override
  public Long count( String idSeason, TeamPageInfo model) {
    return mongoTemplate.count(buildSearchQuery(idSeason ,model, true), Team.class);
  }

  @Override
  public List<Team> searchT(TeamPageInfo model) {
    return mongoTemplate.find(buildSearchQuery2(model, false), Team.class);
  }

  @Override
  public Long countT( TeamPageInfo model) {
    return mongoTemplate.count(buildSearchQuery2(model, true), Team.class);
  }
}
