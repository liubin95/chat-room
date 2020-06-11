package com.sanjutou.chatroom.config;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;


/**
 * @author admin
 */
@Component
public class MyInterceptor implements HandshakeInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(MyInterceptor.class);

    @Override
    public boolean beforeHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Map<String, Object> map) throws Exception {
        //获取请求参数，首先我们要获取HttpServletRequest对象才能获取请求参数；当ServerHttpRequset的层次结构打开后其子类可以获取到我们想要的http对象，那么就简单了。
        final HttpServletRequest servletRequest = ((ServletServerHttpRequest) serverHttpRequest).getServletRequest();
        final int id = Integer.parseInt(servletRequest.getParameter("id"));
        //我这里是把获取的请求数据绑定到session的map对象中（attributes）
        map.put("id", id);
        LOGGER.info("握手开始; map:{}", map.toString());
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse, WebSocketHandler webSocketHandler, Exception e) {
        LOGGER.info("握手结束;");
    }
}
