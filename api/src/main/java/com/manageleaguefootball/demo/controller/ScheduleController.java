package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.ScheduleDTO;
import com.manageleaguefootball.demo.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/schedules")
public class ScheduleController {
  private final ScheduleService scheduleService;

  @GetMapping("/{id}")
  public ResponseEntity<List<ScheduleDTO>> getSchedules(@PathVariable("id") String id) {
    List<ScheduleDTO> schedules = scheduleService.generateRound(id);
    return ResponseEntity.ok(schedules);
  }

  @GetMapping("tructiep/{id}")
  public ResponseEntity<List<ScheduleDTO>> getSchedule(@PathVariable("id") String id) {
    List<ScheduleDTO> schedules = scheduleService.generateKnockOut(id);
    return ResponseEntity.ok(schedules);
  }
}
