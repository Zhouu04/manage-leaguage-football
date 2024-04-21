package com.manageleaguefootball.demo.service.impl;

import com.manageleaguefootball.demo.dto.ScheduleDTO;
import com.manageleaguefootball.demo.dto.SeasonDTO;
import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.model.Schedule;
import com.manageleaguefootball.demo.model.Season;
import com.manageleaguefootball.demo.model.Team;
import com.manageleaguefootball.demo.repository.ScheduleRepository;
import com.manageleaguefootball.demo.repository.TeamRepository;
import com.manageleaguefootball.demo.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
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
  public List<ScheduleDTO> generateRound(String id) {
    List<Team> teams = teamRepository.findAllByIdSeason(id);
    List<Schedule> schedules = new ArrayList<>();
    for (int i = 0; i < teams.size() - 1; i++) {
      for (int j = i + 1; j < teams.size(); j++) {
        // Tạo lịch thi đấu cho mỗi cặp đấu
        Schedule schedule1 = new Schedule();
        schedule1.setId(id);
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
        schedule.setId(idSeason);
        schedule.setTeamHome(teams.get(i).getName());
        schedule.setTeamAway(teams.get(i + 1).getName());
        schedules.add(schedule);
        Collections.shuffle(schedules);
      }
    }

    // Tạo các vòng đấu tiếp theo (tùy vào số lượng đội)
//    while (teams.size() > 1) {
//      List<Team> winners = new ArrayList<>();
//      for (int i = 0; i < teams.size() - 1; i += 2) {
//        // Tạo lịch thi đấu cho trận đấu tiếp theo
//        Schedule schedule = new Schedule();
//        schedule.setId(idSeason);
//        schedule.setTeamHome(teams.get(i).getName());
//        schedule.setTeamAway(teams.get(i + 1).getName());
//        schedules.add(schedule);
//
//        // Lưu đội chiến thắng để tham gia vòng đấu tiếp theo
//        winners.add(teams.get(i));
//      }
//
//      // Cập nhật danh sách các đội tham gia vòng đấu tiếp theo
//      teams = winners;
//    }
    scheduleRepository.saveAll(schedules);
    return mapToView(schedules);
  }

}
