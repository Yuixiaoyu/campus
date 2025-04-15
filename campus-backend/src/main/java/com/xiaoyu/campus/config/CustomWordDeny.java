package com.xiaoyu.campus.config;

import com.github.houbb.sensitive.word.api.IWordDeny;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

/**
 * 自定义敏感词
 */
@Service
public class CustomWordDeny implements IWordDeny {

  /**
     * 拒绝出现的数据-返回的内容被当做是敏感词
     *
     * @return
     */
  @Override
  public List<String> deny() {
    // 从数据库中查询自定义敏感词
    return Arrays.asList("");
  }

}
