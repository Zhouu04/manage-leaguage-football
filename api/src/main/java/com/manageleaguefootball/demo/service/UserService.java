package com.manageleaguefootball.demo.service;

import com.manageleaguefootball.demo.dto.UserDTO;

public interface UserService {
  UserDTO saveUser(UserDTO userDTO);
  boolean checkPassword(String email, String password);
  boolean checkEmailExists(String email);
  boolean login(UserDTO userDTO);
}
