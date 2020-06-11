package com.sanjutou.chatroom.controller;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.alibaba.fastjson.JSON;
import com.sanjutou.chatroom.dto.MsgStatusEnum;
import com.sanjutou.chatroom.dto.MsgTypeEnum;
import com.sanjutou.chatroom.dto.MyMessage;
import com.sanjutou.chatroom.service.ChatRecordsService;

/**
 * @author admin
 */
@Component
public class HttpAuthHandler extends TextWebSocketHandler {

    private final ChatRecordsService chatRecordsService;

    private static final Logger LOGGER = LoggerFactory.getLogger(HttpAuthHandler.class);

    /**
     * 在线map 线程安全<用户id，session>
     */
    private final ConcurrentHashMap<Integer, WebSocketSession> onLineMap = new ConcurrentHashMap<>();

    @Autowired
    public HttpAuthHandler(ChatRecordsService chatRecordsService) {
        this.chatRecordsService = chatRecordsService;
    }

    public ConcurrentHashMap<Integer, WebSocketSession> getOnLineMap() {
        return onLineMap;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 放入redis
        LOGGER.info("建立连接 session-id:{}", session.getId());
        final int id = (Integer) session.getAttributes().get("id");
        onLineMap.put(id, session);
        // 通知所有人刷新列表
        final MyMessage myMessage = new MyMessage();
        myMessage.setMsgType(MsgTypeEnum.REFRESH_LIST);
        final TextMessage textMessage = new TextMessage(JSON.toJSONString(myMessage));
        onLineMap.forEach((integer, webSocketSession) -> {
            try {
                webSocketSession.sendMessage(textMessage);
            } catch (IOException e) {
                LOGGER.error("发送刷新列表消息失败；id：{};session:{}", integer, JSON.toJSONString(session), e);
            }
        });
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        LOGGER.info("发送消息:{}", message.getPayload());
        final int id = (Integer) session.getAttributes().get("id");
        try {
            final MyMessage myMessage = JSON.parseObject(message.getPayload(), MyMessage.class);
            final WebSocketSession socketSession = onLineMap.get(myMessage.getReceiveId());
            switch (myMessage.getMsgType()) {
                case TEXT_MSG:
                    final TextMessage textMessage = new TextMessage(JSON.toJSONString(myMessage));
                    // 向两方发送消息
                    socketSession.sendMessage(textMessage);
                    session.sendMessage(textMessage);
                    break;
                case REFRESH_LIST:
                    break;
                case IMG_MSG:
                    break;
                default:
                    LOGGER.error("消息类型解析异常msg：{}", message);
                    break;
            }
            // 默认所有消息已读
            myMessage.setStatus(MsgStatusEnum.READ);
            chatRecordsService.save(myMessage);
        } catch (Exception e) {
            LOGGER.error("消息解析异常。消息：{}；sendId：{}", message, id, e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        LOGGER.info("关闭连接id:{},status:{}", session.getId(), status);
        final int id = (Integer) session.getAttributes().get("id");
        onLineMap.remove(id);
    }
}
