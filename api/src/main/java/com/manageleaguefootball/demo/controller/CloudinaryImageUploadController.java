package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.TeamDTO;
import com.manageleaguefootball.demo.service.impl.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/cloudinary")
@RequiredArgsConstructor
public class CloudinaryImageUploadController {

  private final CloudinaryService cloudinaryService;

  @PostMapping("/{id}")
  public ResponseEntity<TeamDTO> uploadImage(@RequestParam("image") MultipartFile file, @PathVariable String id){
    TeamDTO data = this.cloudinaryService.upload(file, id);
    return new ResponseEntity<>(data, HttpStatus.OK);
  }
}
