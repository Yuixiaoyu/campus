package com.xiaoyu.campus.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.InputStream;

/**
 * ClassName: ConvertResult
 * Description:
 *  图片封装转换结果类
 * @Author: fy
 * @create: 2025-02-22 17:47
 * @version: 1.0
 */
@AllArgsConstructor
@Data
public class ConvertResult {
    private final String fileName;
    private final InputStream inputStream;
    private final long streamSize;
    private final String contentType;
}
