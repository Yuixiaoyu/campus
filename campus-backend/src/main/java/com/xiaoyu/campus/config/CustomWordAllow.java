package com.xiaoyu.campus.config;

import com.github.houbb.sensitive.word.api.IWordAllow;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CustomWordAllow implements IWordAllow {

  /**
     * 允许的内容-返回的内容不被当做敏感词
     * @return
     */
  @Override
  public List<String> allow() {
    // 从数据库中查询白名单敏感词
    return Arrays.asList("日","五星红旗","三级","信息");
  }

}
