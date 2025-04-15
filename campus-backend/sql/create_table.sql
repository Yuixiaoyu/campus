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

-- 活动表
create table activity
(
    id             bigint                                           not null comment 'id'
        primary key,
    title          varchar(255)                                     not null comment '活动标题',
    profile        varchar(512) default '活动发起人很懒，什么都没写' null comment '活动简介',
    category       varchar(255)                                     not null comment '活动类别',
    userId         bigint                                           not null comment '发布人ID',
    hits           int          default 0                           null comment '活动点击量',
    coverPicture   varchar(255)                                     not null comment '封面图片',
    organizers     varchar(255)                                     not null comment '主办单位',
    position       varchar(255)                                     not null comment '地址',
    maxSignups     int                                              not null comment '最大报名人数',
    currentSignups int          default 0                           null comment '当前报名人数',
    targetUsers    varchar(255)                                     not null comment '活动对象',
    status         tinyint      default 0                           not null comment '活动状态（0：未开始，1：进行中，2：已结束）',
    startTime      datetime                                         not null comment '开始时间',
    endTime        datetime                                         not null comment '结束时间',
    isDelete       tinyint      default 0                           not null comment '是否删除'
)
    row_format = DYNAMIC;

create index idx_end_time
    on activity (endTime);

create index idx_start_time
    on activity (startTime);

create index idx_status
    on activity (status);

-- 物品表
create table items
(
    id          bigint                             not null comment 'id'
        primary key,
    title       varchar(100)                       not null comment '标题（如：丢失黑色钱包）',
    description text                               null comment '详细描述',
    itemType    tinyint                            not null comment '类型（1：丢失，2：招领）',
    category    varchar(255)                       null comment '分类',
    userId      bigint                             not null comment '发布人ID',
    location    varchar(100)                       null comment '位置(如：7号楼711T）',
    status      tinyint  default 0                 null comment '状态（0：待找回，1：已找回）',
    url         varchar(1024)                      null comment '图片url',
    eventTime   datetime                           null comment '丢失/拾取时间',
    createTime  datetime default CURRENT_TIMESTAMP null comment '创建时间'
);

create index idx_categoryID
    on items (category);

create index idx_location
    on items (location);

create index idx_title
    on items (title);

create index idx_type_status
    on items (itemType, status);

create index idx_userID
    on items (userId);
