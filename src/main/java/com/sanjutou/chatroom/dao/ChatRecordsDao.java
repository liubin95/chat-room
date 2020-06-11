package com.sanjutou.chatroom.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.sanjutou.chatroom.dto.MyMessage;

/**
 * @author admin
 */
public interface ChatRecordsDao extends JpaRepository<MyMessage, Integer>, JpaSpecificationExecutor<MyMessage> {

}
