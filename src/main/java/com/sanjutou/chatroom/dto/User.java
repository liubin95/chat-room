package com.sanjutou.chatroom.dto;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;

/**
 * @author admin
 */
@Entity
public class User implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Basic
    @Column(name = "user_name", nullable = false)
    private String userName;
    @Basic
    @Column(name = "email", nullable = false)
    private String email;
    @Basic
    @Column(name = "password", nullable = false)
    private String password;
    @Basic
    @Column(name = "avatar")
    private String avatar;
    @Basic
    @Column(name = "status", nullable = false)
    private int status;

    /**
     * 未读消息数。
     */
    @Transient
    private int unreadMsgNum = 0;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }


    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getUnreadMsgNum() {
        return unreadMsgNum;
    }

    public void setUnreadMsgNum(int unreadMsgNum) {
        this.unreadMsgNum = unreadMsgNum;
    }
}
