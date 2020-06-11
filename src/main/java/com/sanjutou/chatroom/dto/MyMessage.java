package com.sanjutou.chatroom.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.StringJoiner;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.alibaba.fastjson.annotation.JSONField;
import com.sanjutou.chatroom.config.AudtiStautsCodec;
import com.sanjutou.chatroom.config.MsgStatusCodec;

/**
 * @author admin
 */
@Entity
@Table(name = "chat_records")
public class MyMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    /**
     * 接受者id
     */
    private Integer receiveId;
    /**
     * 发送者id
     */
    private Integer sendId;
    /**
     * 发送人昵称
     */
    private String sendName;
    /**
     * 消息
     */
    private String msg;
    /**
     * 消息类型
     */
    @JSONField(serializeUsing = AudtiStautsCodec.class, deserializeUsing = AudtiStautsCodec.class)
    private MsgTypeEnum msgType;
    /**
     * 接受时间
     */
    @JSONField(format = "yyyy-MM-dd HH:mm:ss")
    private Date receiveTime;
    /**
     * 文件路径
     */
    private String fileUrl;

    /**
     * 消息状态
     */
    @JSONField(serializeUsing = MsgStatusCodec.class, deserializeUsing = MsgStatusCodec.class)
    private MsgStatusEnum status;


    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public MsgTypeEnum getMsgType() {
        return msgType;
    }

    public void setMsgType(MsgTypeEnum msgType) {
        this.msgType = msgType;
    }

    public Date getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Date receiveTime) {
        this.receiveTime = receiveTime;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public Integer getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(Integer receiveId) {
        this.receiveId = receiveId;
    }

    public Integer getSendId() {
        return sendId;
    }

    public void setSendId(Integer sendId) {
        this.sendId = sendId;
    }

    public String getSendName() {
        return sendName;
    }

    public void setSendName(String sendName) {
        this.sendName = sendName;
    }

    public MsgStatusEnum getStatus() {
        return status;
    }

    public void setStatus(MsgStatusEnum status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", MyMessage.class.getSimpleName() + "[", "]")
                .add("receiveId=" + receiveId)
                .add("sendId=" + sendId)
                .add("sendName='" + sendName + "'")
                .add("msg='" + msg + "'")
                .add("msgType=" + msgType)
                .add("receiveTime=" + receiveTime)
                .add("fileUrl='" + fileUrl + "'")
                .add("status=" + status)
                .toString();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
