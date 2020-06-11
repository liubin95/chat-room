package com.sanjutou.chatroom.service.impl;

import java.util.List;

import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sanjutou.chatroom.dao.ChatRecordsDao;
import com.sanjutou.chatroom.dto.MyMessage;
import com.sanjutou.chatroom.service.ChatRecordsService;

/**
 * @author admin
 */
@Service
public class ChatRecordsServiceImpl implements ChatRecordsService {

    private final ChatRecordsDao chatRecordsDao;

    @Autowired
    public ChatRecordsServiceImpl(ChatRecordsDao chatRecordsDao) {
        this.chatRecordsDao = chatRecordsDao;
    }

    @Override
    public void save(MyMessage myMessage) {
        chatRecordsDao.saveAndFlush(myMessage);
    }

    @Override
    public List<MyMessage> queryMsgBySendIdAndReceiveId(MyMessage myMessage) {
        final Specification<MyMessage> specification = (Specification<MyMessage>) (root, query, criteriaBuilder) -> {
            final Path<Integer> sendId = root.get("sendId");
            final Path<Integer> receiveId = root.get("receiveId");
            final Predicate predicate1 = criteriaBuilder.equal(sendId, myMessage.getSendId());
            final Predicate predicate2 = criteriaBuilder.equal(receiveId, myMessage.getReceiveId());
            final Predicate and1 = criteriaBuilder.and(predicate1, predicate2);

            final Predicate predicate3 = criteriaBuilder.equal(receiveId, myMessage.getSendId());
            final Predicate predicate4 = criteriaBuilder.equal(sendId, myMessage.getReceiveId());
            final Predicate and2 = criteriaBuilder.and(predicate3, predicate4);

            return criteriaBuilder.or(and1, and2);
        };
        return chatRecordsDao.findAll(specification);
    }
}
