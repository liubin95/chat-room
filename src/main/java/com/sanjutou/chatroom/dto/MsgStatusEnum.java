package com.sanjutou.chatroom.dto;

public enum MsgStatusEnum {

    /**
     * 已读
     */
    READ(0),
    /**
     * 未读
     */
    UNREAD(1);

    private Integer code;

    MsgStatusEnum(Integer code) {
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public static MsgStatusEnum convert(int code) {
        MsgStatusEnum[] enums = MsgStatusEnum.values();
        for (MsgStatusEnum e : enums) {
            if (e.code == code) {
                return e;
            }
        }
        return null;
    }
}
