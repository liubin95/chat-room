package com.sanjutou.chatroom.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjutou.chatroom.dto.Result;
import com.sanjutou.chatroom.dto.User;
import com.sanjutou.chatroom.service.UserService;

/**
 * @author admin
 */
@RestController
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 注册
     *
     * @param user user
     * @return 结果
     */
    @PostMapping("register")
    public Result<User> register(User user) {
        if (user == null || StringUtils.isBlank(user.getEmail()) || StringUtils.isBlank(user.getUserName()) || StringUtils.isBlank(user.getPassword())) {
            return new Result<>(false);
        } else {
            return userService.register(user);
        }
    }

    /**
     * 登录
     *
     * @param user user
     * @return 结果
     */
    @PostMapping("login")
    public Result<User> login(User user, HttpSession httpSession) {
        if (user == null || StringUtils.isBlank(user.getEmail()) || StringUtils.isBlank(user.getPassword())) {
            return new Result<>(false);
        } else {
            final Result<User> result = userService.login(user);
            httpSession.setAttribute("loginUser", result.getObj());
            return result;
        }
    }
}
