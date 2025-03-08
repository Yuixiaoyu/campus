package com.xiaoyu.campus.service.impl;

import cn.hutool.core.util.ObjUtil;
import com.xiaoyu.campus.model.vo.ConvertResult;
import com.xiaoyu.campus.model.vo.UploadResult;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.service.UserService;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.S3Escaper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * ClassName: UploadFilesService
 * Description:
 *
 * @Author: fy
 * @create: 2025-02-22 18:48
 * @version: 1.0
 */
@Slf4j
@Service
public class UploadFilesService {

    @Resource
    private MinioClient minioClient;

    @Value("${minio.bucket-name}")
    private String bucketName;

    @Value("${minio.endpoint}")
    private String minioEndpoint;

    @Resource
    private UserService userService;

    @Resource
    private TransactionTemplate transactionTemplate;

    // 支持的图片MIME类
    List<String> SUPPORTED_IMAGE_TYPES = Arrays.asList(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg",
            "image/bmp"
    );

    public List<String> uploadFileList(MultipartFile[] files) throws IOException {
        if (ObjUtil.isEmpty(files)){
            return new ArrayList<>();
        }
        if (files.length>9){
            throw new BusinessException(ErrorCode.PARAMS_ERROR,"最多上传9张图片");
        }
        List<String> filesUrl = new ArrayList<>();
        //todo 添加事务，要么同时成功，要么全部失败
        //transactionTemplate.execute()
        for (MultipartFile file : files) {
            String originalName = file.getOriginalFilename();
            try {
                // 文件转换处理
                ConvertResult conversion = convertToWebpIfNeeded(file);

                // 上传到MinIO
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket(bucketName)
                                .object(conversion.getFileName())
                                .stream(conversion.getInputStream(), conversion.getStreamSize(), -1)
                                .contentType(conversion.getContentType())
                                .build()
                );

                // 生成访问URL
                String fileUrl = generatePublicUrl(conversion.getFileName());

                // 记录成功结果
                filesUrl.add(fileUrl);
            } catch (Exception e) {
                // 记录失败详情
                log.error("Failed to upload file: {}", originalName, e);
            }
        }
        return filesUrl;
    }

    /**
     * 生成永久访问URL
     */
    private String generatePublicUrl(String objectName) {
        try {
            // 使用Minio官方推荐编码方式
            String encodedName = S3Escaper.encode(objectName);
            return String.format("%s/%s/%s",
                    minioEndpoint,
                    bucketName,
                    encodedName);
        } catch (Exception e) {
            throw new RuntimeException("URL生成失败", e);
        }
    }

    private ConvertResult convertToWebpIfNeeded(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String contentType = file.getContentType();

        // 非图片文件直接返回
        if (!isImage(contentType)) {
            return new ConvertResult(
                    originalFileName,
                    file.getInputStream(),
                    file.getSize(),
                    contentType
            );
        }

        // 生成新的文件名（替换扩展名为webp）
        String newFileName = FilenameUtils.removeExtension(originalFileName) + ".webp";

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            // 使用ImageIO进行格式转换（需要webp-imageio依赖）
            BufferedImage image = ImageIO.read(file.getInputStream());
            ImageIO.write(image, "webp", outputStream);

            byte[] webpBytes = outputStream.toByteArray();
            return new ConvertResult(
                    newFileName,
                    new ByteArrayInputStream(webpBytes),
                    webpBytes.length,
                    "image/webp"
            );
        }
    }

    private boolean isImage(String contentType) {
        return contentType != null && SUPPORTED_IMAGE_TYPES.contains(contentType.toLowerCase());
    }
}
