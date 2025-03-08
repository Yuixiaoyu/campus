
-- 创建数据库
create database if not exists campus;

-- 切换数据库
use campus;

-- 用户表
create table user
(
    id           bigint                                                                                   not null comment 'id'
        primary key,
    userAccount  varchar(100)                                                                             null comment '账户',
    userPassword varchar(255)                                                                             null comment '密码',
    openid       varchar(100)                                                                             null comment '微信id',
    userName     varchar(255) default '无名'                                                              not null comment '用户昵称',
    userRole     varchar(255) default 'user'                                                              not null comment '用户角色',
    userScore    int          default 0                                                                   not null comment '用户积分',
    userPhone    varchar(50)                                                                              null comment '用户手机号',
    userProfile  varchar(255)                                                                             null comment '用户简介',
    imageUrl     varchar(512) default 'https://a.520gexing.com/uploads/allimg/2021042109/uqaqhuvavt0.jpg' null comment '用户头像',
    editTime     datetime     default CURRENT_TIMESTAMP                                                   not null comment '编辑时间',
    createTime   datetime     default CURRENT_TIMESTAMP                                                   not null comment '创建时间',
    updateTime   datetime     default CURRENT_TIMESTAMP                                                   not null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint      default 0                                                                   not null comment '是否删除',
    constraint uk_openid
        unique (openid),
    constraint uk_userAccount
        unique (userAccount)
);
create index idx_userName
    on user (userName);
create index idx_userPhone
    on user (userPhone);

-- 文章表
create table article
(
    id           bigint                             not null comment '文章id'
        primary key,
    userId       bigint                             not null comment '作者id',
    content      text                               not null comment '文章内容',
    tags         varchar(512)                       null comment '标签（JSON数组）',
    viewCount    int      default 0                 null comment '浏览次数',
    likeCount    int      default 0                 null comment '点赞次数',
    commentCount int      default 0                 null comment '评论次数',
    status       tinyint  default 0                 null comment '文章状态（0：待审核，1：通过，2：驳回）',
    createTime   datetime default CURRENT_TIMESTAMP null comment '发布时间',
    updateTime   datetime default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',
    isDelete     tinyint  default 0                 not null comment '是否删除'
);

create index idx_userId
    on article (userId);
