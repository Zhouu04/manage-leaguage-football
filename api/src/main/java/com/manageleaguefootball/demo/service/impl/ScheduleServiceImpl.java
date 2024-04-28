package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.ScheduleDTO;
import com.manageleaguefootball.demo.model.Schedule;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.ScheduleRepository;
import com.manageleaguefootball.demo.repository.TeamRepository;
import com.manageleaguefootball.demo.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {
  private final ScheduleRepository scheduleRepository;
  private final TeamRepository teamRepository;

  public static ModelMapper mapper() {
    ModelMapper modelMapper = new ModelMapper();
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

    return modelMapper;
  }

  public static ScheduleDTO mapToView(Schedule schedule) {
    if (schedule == null) {
      return null;
    }

    return mapper().map(schedule, ScheduleDTO.class);
  }

  public static List<ScheduleDTO> mapToView(List<Schedule> scheduleList) {
    return scheduleList.stream().map(d -> mapper().map(d, ScheduleDTO.class))
      .collect(Collectors.toList());
  }

  @Override
  public List<ScheduleDTO> getSchedules() {
    return mapToView(scheduleRepository.findAll());
  }

  @Override
  public List<ScheduleDTO> getSchedulesByIdSeason(String idSeason) {
    List<Schedule> schedules = scheduleRepository.findAllByIdSeason(idSeason);
    if(schedules == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found");
    }
    return mapToView(schedules);
  }

  @Override
  public ScheduleDTO updateScore(ScheduleDTO model) {
    Schedule schedule = scheduleRepository.findById(model.getId()).orElse(null);
    if(schedule == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule not found");
    }
    schedule.setHomeScore(model.getHomeScore());
    schedule.setAwayScore(model.getAwayScore());
    schedule.setStatus(true);
    scheduleRepository.save(schedule);
    this.updatePoint(schedule, model.getHomeScore(), model.getAwayScore());
    return mapToView(schedule);
  }

  private void updatePoint(Schedule model, int homeScore, int awayScore) {
    int win = 3;
    int lose = 0;
    int draw = 1;
    Team teamHome = teamRepository.findByName(model.getTeamHome());
    Team teamAway = teamRepository.findByName(model.getTeamAway());

    if(homeScore > awayScore) {
      teamHome.setScore(teamHome.getScore() + win);
      teamHome.setGoalWin(teamHome.getGoalWin() + homeScore);
      teamHome.setGoalLoss(teamHome.getGoalLoss() + awayScore);
      teamHome.setWin(teamHome.getWin() + 1);
      teamHome.setDifference(teamHome.getGoalWin() - teamHome.getGoalLoss());

      teamAway.setScore(teamAway.getScore() + lose);
      teamAway.setGoalWin(teamAway.getGoalWin() + awayScore);
      teamAway.setGoalLoss(teamAway.getGoalLoss() + homeScore);
      teamAway.setLoss(teamAway.getLoss() + 1);
      teamAway.setDifference(teamAway.getGoalWin() - teamAway.getGoalLoss());

    } else if (homeScore < awayScore) {
      teamHome.setScore(teamHome.getScore() + lose);
      teamHome.setGoalWin(teamHome.getGoalWin() + homeScore);
      teamHome.setGoalLoss(teamHome.getGoalLoss() + awayScore);
      teamHome.setLoss(teamHome.getLoss() + 1);
      teamHome.setDifference(teamHome.getGoalWin() - teamHome.getGoalLoss());

      teamAway.setScore(teamAway.getScore() + win);
      teamAway.setGoalWin(teamAway.getGoalWin() + awayScore);
      teamAway.setGoalLoss(teamAway.getGoalLoss() + homeScore);
      teamAway.setWin(teamAway.getWin() + 1);
      teamAway.setDifference(teamAway.getGoalWin() - teamAway.getGoalLoss());
    } else {
      teamHome.setScore(teamHome.getScore() + draw);
      teamHome.setGoalWin(teamHome.getGoalWin() + homeScore);
      teamHome.setGoalLoss(teamHome.getGoalLoss() + awayScore);
      teamHome.setDraw(teamHome.getDraw() + 1);

      teamAway.setScore(teamAway.getScore() + draw);
      teamAway.setGoalWin(teamAway.getGoalWin() + awayScore);
      teamAway.setGoalLoss(teamAway.getGoalLoss() + homeScore);
      teamAway.setDraw(teamAway.getDraw() + 1);

    }
    teamRepository.save(teamHome);
    teamRepository.save(teamAway);
  }

  @Override
  public List<ScheduleDTO> generateRound(String id) {
    List<Team> teams = teamRepository.findAllByIdSeason(id);
    List<Schedule> schedules = new ArrayList<>();
    for (int i = 0; i < teams.size() - 1; i++) {
      for (int j = i + 1; j < teams.size(); j++) {
        // Tạo lịch thi đấu cho mỗi cặp đấu
        Schedule schedule1 = new Schedule();
        schedule1.setIdSeason(id);
        schedule1.setTeamHome(teams.get(i).getName());
        schedule1.setTeamAway(teams.get(j).getName());
        schedules.add(schedule1);
        Collections.shuffle(schedules);

      }
    }
    scheduleRepository.saveAll(schedules);

    return mapToView(schedules);
  }

  @Override
  public List<ScheduleDTO> generateKnockOut(String idSeason) {
    List<Team> teams = teamRepository.findAllByIdSeason(idSeason);
    List<Schedule> schedules = new ArrayList<>();

    // Tạo lịch thi đấu cho vòng 1 (vòng 1/8)
    for (int i = 0; i < teams.size(); i += 2) {
      if (i + 1 < teams.size()) {
        Schedule schedule = new Schedule();
        schedule.setIdSeason(idSeason);
        schedule.setTeamHome(teams.get(i).getName());
        schedule.setTeamAway(teams.get(i + 1).getName());
        schedules.add(schedule);
        Collections.shuffle(schedules);

      }
    }
    scheduleRepository.saveAll(schedules);

    return mapToView(schedules);
  }

}
