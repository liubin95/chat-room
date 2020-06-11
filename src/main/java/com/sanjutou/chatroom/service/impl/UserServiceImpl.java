package com.sanjutou.chatroom.service.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanjutou.chatroom.dao.UserDao;
import com.sanjutou.chatroom.dto.Result;
import com.sanjutou.chatroom.dto.User;
import com.sanjutou.chatroom.service.UserService;

/**
 * @author admin
 */
@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public Result<User> register(User user) {
        final Result<User> result = new Result<>();
        final User byEmail = userDao.findByEmail(user.getEmail());
        if (byEmail == null) {
            final User user1 = userDao.saveAndFlush(user);
            result.setSuccess(true);
            result.setObj(user1);
        } else {
            result.setSuccess(false);
        }
        return result;
    }

    @Override
    public Result<User> login(User user) {
        final Result<User> result = new Result<>();
        final User byEmail = userDao.findByEmail(user.getEmail());
        if (byEmail == null || !user.getPassword().equals(byEmail.getPassword())) {
            result.setSuccess(false);
        } else {
            result.setSuccess(true);
            result.setObj(byEmail);
        }
        return result;
    }

    @Override
    public List<User> queryOnlineUserInfo(Set<Integer> idSet) {
        return userDao.findAllById(idSet);
    }
}
