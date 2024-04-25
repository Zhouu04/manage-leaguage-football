package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.ScheduleDTO;
import com.manageleaguefootball.demo.service.ScheduleService;
import jakarta.validation.Valid;
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

  @PostMapping("round/{id}")
  public ResponseEntity<List<ScheduleDTO>> addScheduleRound(@PathVariable("id") String id) {
    List<ScheduleDTO> schedules = scheduleService.generateRound(id);
    return ResponseEntity.ok(schedules);
  }

  @PostMapping("knock-out/{id}")
  public ResponseEntity<List<ScheduleDTO>> addScheduleKnockOut(@PathVariable("id") String id) {
    List<ScheduleDTO> schedules = scheduleService.generateKnockOut(id);
    return ResponseEntity.ok(schedules);
  }

  @GetMapping("/{id}")
  public ResponseEntity<List<ScheduleDTO>> getSchedulesBySeasonId(@PathVariable("id") String id) {
    List<ScheduleDTO> schedules = scheduleService.getSchedulesByIdSeason(id);
    return ResponseEntity.ok(schedules);
  }

  @PutMapping("")
  public ResponseEntity<ScheduleDTO> updateScore(@RequestBody @Valid ScheduleDTO model) {
    ScheduleDTO schedule = scheduleService.updateScore(model);
    return ResponseEntity.ok(schedule);
  }
}
