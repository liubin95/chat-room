package com.sanjutou.chatroom.service.impl;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.sanjutou.chatroom.ChatRoomApplication;
import com.sanjutou.chatroom.dao.ChatRecordsDao;
import com.sanjutou.chatroom.dto.MsgStatusEnum;
import com.sanjutou.chatroom.dto.MsgTypeEnum;
import com.sanjutou.chatroom.dto.MyMessage;
import com.sanjutou.chatroom.service.ChatRecordsService;

@SpringBootTest(classes = ChatRoomApplication.class)
class ChatRecordsServiceImplTest {

    @Autowired
    private ChatRecordsDao chatRecordsDao;

    @Autowired
    private ChatRecordsService chatRecordsService;

    @Test
    void save() {
        final MyMessage myMessage = new MyMessage();
        myMessage.setReceiveId(4);
        myMessage.setSendId(3);
        myMessage.setSendName("liubin");
        myMessage.setMsgType(MsgTypeEnum.TEXT_MSG);
        myMessage.setStatus(MsgStatusEnum.READ);
        myMessage.setMsg("回信");
        myMessage.setReceiveTime(new Date());
        chatRecordsDao.save(myMessage);
    }

    @Test
    void queryMsgBySendIdAndReceiveId() {
        final MyMessage myMessage = new MyMessage();
        myMessage.setReceiveId(4);
        myMessage.setSendId(3);
        final List<MyMessage> myMessages = chatRecordsService.queryMsgBySendIdAndReceiveId(myMessage);
        System.out.println("myMessages = " + myMessages);

    }
}