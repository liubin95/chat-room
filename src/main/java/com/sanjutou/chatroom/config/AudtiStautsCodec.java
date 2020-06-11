package com.sanjutou.chatroom.config;

import java.io.IOException;
import java.lang.reflect.Type;

import com.alibaba.fastjson.parser.DefaultJSONParser;
import com.alibaba.fastjson.parser.deserializer.ObjectDeserializer;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.ObjectSerializer;
import com.alibaba.fastjson.util.TypeUtils;
import com.sanjutou.chatroom.dto.MsgTypeEnum;

/**
 * @author admin
 */
public class AudtiStautsCodec implements ObjectSerializer, ObjectDeserializer {
    @Override
    public <T> T deserialze(DefaultJSONParser parser, Type type, Object o) {
        Object value = parser.parse();
        return value == null ? null : (T) MsgTypeEnum.convert(TypeUtils.castToInt(value));
    }

    @Override
    public int getFastMatchToken() {
        return 0;
    }

    @Override
    public void write(JSONSerializer jsonSerializer, Object o, Object o1, Type type, int i) throws IOException {
        jsonSerializer.write(((MsgTypeEnum) o).getCode());
    }
}
