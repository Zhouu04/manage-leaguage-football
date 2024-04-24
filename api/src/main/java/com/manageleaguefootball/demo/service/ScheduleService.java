package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.ScheduleDTO;

import java.util.List;

public interface ScheduleService {
  List<ScheduleDTO> getSchedules();
  List<ScheduleDTO> getSchedulesByIdSeason(String idSeason);
  ScheduleDTO updateScore(String idSchedule, int homeScore, int awayScore);
  List<ScheduleDTO> generateRound(String idSeason);
  List<ScheduleDTO> generateKnockOut(String idSeason);
}
