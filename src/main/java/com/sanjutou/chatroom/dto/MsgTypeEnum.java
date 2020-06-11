package com.sanjutou.chatroom.dto;

/**
 * @author admin
 */

public enum MsgTypeEnum {

    /**
     * 文字消息
     */
    TEXT_MSG(0),
    /**
     * 图片消息
     */
    IMG_MSG(1),
    /**
     * 刷新在线列表
     */
    REFRESH_LIST(2);
    private int code;

    MsgTypeEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public static MsgTypeEnum convert(int code) {
        MsgTypeEnum[] enums = MsgTypeEnum.values();
        for (MsgTypeEnum e : enums) {
            if (e.code == code) {
                return e;
            }
        }
        return null;
    }
}


