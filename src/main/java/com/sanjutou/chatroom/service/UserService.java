package com.sanjutou.chatroom.service;

import java.util.List;
import java.util.Set;

import com.sanjutou.chatroom.dto.Result;
import com.sanjutou.chatroom.dto.User;

/**
 * @author admin
 */
public interface UserService {

    /**
     * 注册
     *
     * @param user 用户
     * @return 是否成功
     */
    Result<User> register(User user);

    /**
     * 登录
     *
     * @param user user
     * @return 结果
     */
    Result<User> login(User user);

    /**
     * 查询在线用户信息
     *
     * @param idSet id集合
     * @return 集合
     */
    List<User> queryOnlineUserInfo(Set<Integer> idSet);
}
