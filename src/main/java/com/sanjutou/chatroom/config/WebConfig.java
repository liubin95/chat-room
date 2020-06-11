package com.sanjutou.chatroom.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

/**
 * @author admin
 */
@Configuration
//@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        FastJsonConfig config = new FastJsonConfig();
        config.setSerializerFeatures(
                // List类型字段为null时输出[]而非null
                SerializerFeature.WriteNullListAsEmpty,
                // 显示空字段
                SerializerFeature.WriteMapNullValue,
                // 字符串类型字段为null时间输出""而非null
                SerializerFeature.WriteNullStringAsEmpty,
                // Boolean类型字段为null时输出false而null
                SerializerFeature.WriteNullBooleanAsFalse,
                // 美化json输出，否则会作为整行输出
                SerializerFeature.PrettyFormat,
                // 数值字段如果为null,输出为0,而非null
                SerializerFeature.WriteNullNumberAsZero,
                // Boolean字段如果为null,输出为false,而非null
                SerializerFeature.WriteNullBooleanAsFalse,
                // 时间格式yyyy-MM-dd HH: mm: ss
                SerializerFeature.WriteDateUseDateFormat,
                // 禁用循环引用检测
                SerializerFeature.DisableCircularReferenceDetect);
        converter.setFastJsonConfig(config);
        converters.add(converter);
        List<MediaType> supportedMediaTypes = new ArrayList<>();
        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
        supportedMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
        supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
        supportedMediaTypes.add(MediaType.APPLICATION_PDF);
        supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
        supportedMediaTypes.add(MediaType.APPLICATION_XML);
        supportedMediaTypes.add(MediaType.IMAGE_GIF);
        supportedMediaTypes.add(MediaType.IMAGE_JPEG);
        supportedMediaTypes.add(MediaType.IMAGE_PNG);
        supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
        supportedMediaTypes.add(MediaType.TEXT_HTML);
        supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
        supportedMediaTypes.add(MediaType.TEXT_PLAIN);
        supportedMediaTypes.add(MediaType.TEXT_XML);
        converter.setSupportedMediaTypes(supportedMediaTypes);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/");
    }
}
