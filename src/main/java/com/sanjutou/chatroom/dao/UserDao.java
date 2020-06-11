package com.sanjutou.chatroom.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sanjutou.chatroom.dto.User;

/**
 * @author admin
 */
public interface UserDao extends JpaRepository<User, Integer> {

    /**
     * 通过邮箱查询用户
     *
     * @param email 邮箱
     * @return 对象
     */
    User findByEmail(String email);
}
