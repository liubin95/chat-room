package com.sanjutou.chatroom.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

import com.sanjutou.chatroom.dto.Result;
import com.sanjutou.chatroom.dto.User;
import com.sanjutou.chatroom.service.UserService;

/**
 * @author admin
 */
@RestController
@RequestMapping("/friend")
public class FriendController {



    private final UserService userService;

    /**
     *
     */
    private final HttpAuthHandler httpAuthHandler;

    @Autowired
    public FriendController(HttpAuthHandler httpAuthHandler, UserService userService) {
        this.httpAuthHandler = httpAuthHandler;
        this.userService = userService;
    }


    /**
     * 获取全部的在线用户信息。
     *
     * @return 集合
     */
    @GetMapping("queryOnLineFriends")
    public Result<List<User>> queryOnLineFriends(HttpSession httpSession) {
        final User user = (User) httpSession.getAttribute("loginUser");
        // 获取全部在线用户
        final ConcurrentHashMap<Integer, WebSocketSession> onLineMap = httpAuthHandler.getOnLineMap();
        final Set<Integer> integers = new HashSet<>(onLineMap.keySet());
        // 删除自己
        integers.remove(user.getId());
        // 查询信息
        final List<User> users = userService.queryOnlineUserInfo(integers);
        final Result<List<User>> result = new Result<>();
        result.setSuccess(true);
        result.setObj(users);
        return result;
    }
}
