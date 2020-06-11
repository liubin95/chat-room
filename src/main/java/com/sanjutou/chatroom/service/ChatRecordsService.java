package com.sanjutou.chatroom.service;

import java.util.List;

import com.sanjutou.chatroom.dto.MyMessage;

/**
 * 聊天记录
 *
 * @author admin
 */
public interface ChatRecordsService {

    /**
     * 保存
     *
     * @param myMessage 实体
     */
    void save(MyMessage myMessage);

    /**
     * '
     * 查询两个用户之间的聊天记录
     *
     * @param myMessage 收发消息id
     * @return 集合
     */
    List<MyMessage> queryMsgBySendIdAndReceiveId(MyMessage myMessage);
}
