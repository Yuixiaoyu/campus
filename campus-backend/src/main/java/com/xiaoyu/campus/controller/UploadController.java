package com.xiaoyu.campus.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.ObjUtil;
import cn.hutool.core.util.StrUtil;
import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * ClassName: UploadController
 * Description:
 *
 * @Author: fy
 * @create: 2025-03-21 20:38
 * @version: 1.0
 */
@RestController()
@Slf4j
@RequestMapping("/upload")
public class UploadController {

    @Resource
    private UploadFilesService uploadFilesService;


    /**
     * 上传文件列表
     * @return
     */
    @PostMapping("/fileList")
    public BaseResponse<List<String>> uploadImages(@RequestParam("file") MultipartFile[] files){
        List<String> urlList = new ArrayList<>();
        if (ObjUtil.isNotEmpty(files)){
            try {
                urlList = uploadFilesService.uploadFileList(files);
            } catch (IOException e) {
                log.error("上传图片文件列表失败：{}",e.getMessage());
            }
        }
        return ResultUtils.success(urlList);
    }

    /**
     * 删除文件
     * @param url
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteFile(@RequestParam("url") String url){
        if (StrUtil.isBlank(url)){
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (url.equals("https://minio.fybreeze.cn/campus/INGCaCjrYtS459d8084868d79c9b3aa19644e705d2a6.webp")){
            return ResultUtils.success(true);
        }
        String fileName = FileUtil.mainName(url) + ".webp";
        uploadFilesService.deleteFile(fileName);
        return ResultUtils.success(true);
    }

}
