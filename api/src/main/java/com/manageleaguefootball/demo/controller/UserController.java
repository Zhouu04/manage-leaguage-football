package com.manageleaguefootball.demo.controller;

import com.manageleaguefootball.demo.dto.UserDTO;
import com.manageleaguefootball.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@CrossOrigin("*")
public class UserController {
  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserDTO userDTO) {
    UserDTO savedUser = userService.saveUser(userDTO);
    return ResponseEntity.ok(savedUser);
  }

  @PostMapping("/login")
  public boolean login(@Valid @RequestBody UserDTO userDTO) {
    return userService.login(userDTO);
  }

  @GetMapping("/check-email")
  public ResponseEntity<Boolean> checkEmailExists(@RequestParam String email) {
    boolean exists = userService.checkEmailExists(email);
    return ResponseEntity.ok(exists);
  }


}
