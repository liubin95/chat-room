package com.sanjutou.chatroom.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author admin
 */
@Controller
@RequestMapping("go")
public class GoController {

    /**
     * 跳转注册页面
     *
     * @return 注册页面
     */
    @GetMapping("register")
    public String goRegister() {
        return "register";
    }

    /**
     * 跳转登录页面
     *
     * @return 登录页面
     */
    @GetMapping("login")
    public String goLogin() {
        return "index";
    }

    /**
     * 主页面
     *
     * @return 主页面
     */
    @GetMapping("/main")
    public String goMain() {
        return "main";
    }
}
