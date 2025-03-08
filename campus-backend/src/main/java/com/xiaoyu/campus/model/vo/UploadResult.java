package com.xiaoyu.campus.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * ClassName: UploadResult
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-22 18:42
 * @version: 1.0
 */
@AllArgsConstructor
@Data
public class UploadResult {
    private final String storedName;
    private final String fileUrl;
    private final long fileSize;
}
