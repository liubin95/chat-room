package com.sanjutou.chatroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sanjutou.chatroom.dto.MyMessage;
import com.sanjutou.chatroom.dto.Result;
import com.sanjutou.chatroom.service.ChatRecordsService;

/**
 * @author admin
 */
@RestController
@RequestMapping("msg")
public class MsgController {

    private final ChatRecordsService chatRecordsService;

    @Autowired
    public MsgController(ChatRecordsService chatRecordsService) {
        this.chatRecordsService = chatRecordsService;
    }

    /**
     * 查询俩人对应的聊天记录。
     *
     * @param myMessage 收发消息id
     * @return 对象
     */
    @GetMapping("queryChatRecords")
    public Result<List<MyMessage>> queryChatRecords(MyMessage myMessage) {
        final Result<List<MyMessage>> result = new Result<>();
        if (myMessage == null || myMessage.getSendId() == null || myMessage.getReceiveId() == null) {
            result.setSuccess(false);
        } else {
            final List<MyMessage> myMessages = chatRecordsService.queryMsgBySendIdAndReceiveId(myMessage);
            result.setObj(myMessages);
            result.setSuccess(true);
        }
        return result;
    }
}
