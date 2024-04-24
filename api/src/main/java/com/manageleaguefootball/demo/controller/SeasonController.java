package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.SeasonDTO;
import com.manageleaguefootball.demo.service.SeasonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/seasons")
public class SeasonController {
  private  final SeasonService service;

  @GetMapping()
  public ResponseEntity<List<SeasonDTO>> getAllSeasons() {
    List<SeasonDTO> seasons = service.getAllSeasons();
    return ResponseEntity.ok(seasons);
  }

  @GetMapping("/{id}")
  public ResponseEntity<SeasonDTO> getSeasonById(@PathVariable("id") String id) {
    SeasonDTO season = service.getSeasonById(id);
    return ResponseEntity.ok(season);
  }

  @GetMapping("/league/{id}")
  public ResponseEntity<List<SeasonDTO>> getAllByIdLeague(@PathVariable("id") String id) {
    List<SeasonDTO> seasons = service.findAllByIdLeague(id);
    return ResponseEntity.ok(seasons);
  }

  @PostMapping()
  public ResponseEntity<SeasonDTO> createSeason(@Valid @RequestBody SeasonDTO seasonDTO) {
    SeasonDTO season = service.createSeason(seasonDTO);
    return ResponseEntity.ok(season);
  }

  @PutMapping()
  public ResponseEntity<SeasonDTO> updateSeason(@Valid @RequestBody SeasonDTO seasonDTO) {
    SeasonDTO season = service.updateSeason(seasonDTO);
    return ResponseEntity.ok(season);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<SeasonDTO> deleteSeason(@PathVariable("id") String id) {
    SeasonDTO season = service.deleteSeason(id);
    return ResponseEntity.ok(season);
  }
}
