package com.xiaoyu.campus.controller;

import com.xiaoyu.campus.common.BaseResponse;
import com.xiaoyu.campus.common.ResultUtils;
import com.xiaoyu.campus.model.vo.UploadResult;
import com.xiaoyu.campus.service.impl.UploadFilesService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;

@RestController
public class MinioDemoController {

    @Resource
    private UploadFilesService uploadFilesService;


    @PostMapping("/upload")
    public BaseResponse<List<String>> uploadFiles(@RequestParam("files") MultipartFile[] files) {

        List<String> stringList;
        try {
            stringList = uploadFilesService.uploadFileList(files);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResultUtils.success(stringList);
    }

}