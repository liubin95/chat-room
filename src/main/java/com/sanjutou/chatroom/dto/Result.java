package com.sanjutou.chatroom.dto;

import java.io.Serializable;

/**
 * @author admin
 */
public class Result<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private boolean isSuccess;

    private T obj;

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public T getObj() {
        return obj;
    }

    public void setObj(T obj) {
        this.obj = obj;
    }

    public Result() {
    }

    public Result(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }
}
