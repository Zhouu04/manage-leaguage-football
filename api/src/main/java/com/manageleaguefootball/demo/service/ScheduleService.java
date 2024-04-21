package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.ScheduleDTO;

import java.util.List;

public interface ScheduleService {
  List<ScheduleDTO> generateRound(String idSeason);
  List<ScheduleDTO> generateKnockOut(String idSeason);
}
