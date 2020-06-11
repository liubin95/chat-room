package com.sanjutou.chatroom.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.sanjutou.chatroom.controller.HttpAuthHandler;

/**
 * @author admin
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final HttpAuthHandler httpAuthHandler;
    private final MyInterceptor myInterceptor;

    @Autowired
    public WebSocketConfig(HttpAuthHandler httpAuthHandler, MyInterceptor myInterceptor) {
        this.httpAuthHandler = httpAuthHandler;
        this.myInterceptor = myInterceptor;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry.addHandler(httpAuthHandler, "chatRoom").addInterceptors(myInterceptor).setAllowedOrigins("/*");
    }
}
