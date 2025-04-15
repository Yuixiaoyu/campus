package com.xiaoyu.campus.activity;

import cn.hutool.core.io.FileUtil;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * ClassName: ActivityTest
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-22 17:48
 * @version: 1.0
 */
@SpringBootTest
public class ActivityTest {

    @Resource
    private UploadFilesService uploadFilesService;

    @Test
    public void testRemoveActivity(){
        String url = "https://minio.fybreeze.cn/campus/3nfn0RhELhY60cac5f99500e8a0ae101d7465f51f97b.webp";
        String mainName = FileUtil.mainName(url)+".webp";
        System.out.println(mainName);
        uploadFilesService.deleteFile(mainName);

    }
}
