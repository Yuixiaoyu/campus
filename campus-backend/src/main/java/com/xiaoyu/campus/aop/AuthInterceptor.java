package com.xiaoyu.campus.aop;

import com.xiaoyu.campus.annotation.AuthCheck;
import com.xiaoyu.campus.exception.BusinessException;
import com.xiaoyu.campus.exception.ErrorCode;
import com.xiaoyu.campus.model.entity.User;
import com.xiaoyu.campus.model.enums.UserRoleEnum;
import com.xiaoyu.campus.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * ClassName: AuthInterceptor
 * Description:
 *
 * @Author: fy
 * @create: 2024-12-12 22:30
 * @version: 1.0
 */
@Aspect
@Component
public class AuthInterceptor {

    @Resource
    private UserService userService;


    /**
     * 执行拦截
     * @return
     */
    @Around("@annotation(authCheck)")
    public Object doInterceptor(ProceedingJoinPoint joinPoint, AuthCheck authCheck) throws Throwable {
        String mustRole = authCheck.mustRole();
        //获取当前登录用户
        User loginUser = userService.getLoginUser();

        UserRoleEnum mustRoleEnum = UserRoleEnum.getEnumByValue(mustRole);
        //不需要权限，放行
        if (mustRoleEnum==null) {
            return joinPoint.proceed();
        }
        //必须有权限才会通过
        String userRole = loginUser.getUserRole();
        UserRoleEnum userRoleEnum = UserRoleEnum.getEnumByValue(userRole);
        if (userRoleEnum == null){
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }

        //必须有管理员权限，但用户没有权限
        if (UserRoleEnum.ADMIN.equals(mustRoleEnum) && !UserRoleEnum.ADMIN.equals(userRoleEnum)){
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }

        return joinPoint.proceed();
    }



}
