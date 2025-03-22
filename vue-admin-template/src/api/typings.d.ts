declare namespace API {
  type ActivityAddRequest = {
    category?: string;
    coverPicture?: string;
    endTime?: string;
    maxSignups?: number;
    organizers?: string;
    position?: string;
    profile?: string;
    startTime?: string;
    targetUsers?: string;
    title?: string;
    userId?: number;
  };

  type ActivityEditRequest = {
    category?: string;
    coverPicture?: string;
    endTime?: string;
    id?: number;
    maxSignups?: number;
    organizers?: string;
    position?: string;
    profile?: string;
    startTime?: string;
    targetUsers?: string;
    title?: string;
    userId?: number;
  };

  type ActivityQueryRequest = {
    category?: string;
    current?: number;
    organizers?: string;
    pageSize?: number;
    profile?: string;
    sortField?: string;
    sortOrder?: string;
    title?: string;
    userId?: number;
  };

  type ActivityRegisterRequest = {
    activityId?: number;
    userId?: number;
  };

  type ActivityVO = {
    id?: number;
    category?: string;
    coverPicture?: string;
    currentSignups?: number;
    endTime?: string;
    userId?: number;
    hits?: number;
    maxSignups?: number;
    organizers?: string;
    position?: string;
    profile?: string;
    startTime?: string;
    status?: number;
    targetUsers?: string;
    title?: string;
  };

  type ArticleAddRequest = {
    content?: string;
    images?: string[];
    tags?: string[];
  };

  type ArticleQueryRequest = {
    content?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type ArticleReportRequest = {
    articleId?: number;
    images?: string[];
    reason?: string;
    userId?: number;
  };

  type ArticleVO = {
    commentCount?: number;
    content?: string;
    createTime?: string;
    id?: number;
    imagesList?: string[];
    isLike?: boolean;
    likeCount?: number;
    tags?: string[];
    userId?: number;
    userVO?: UserVO;
    viewCount?: number;
  };

  type BaseResponseArticleVO_ = {
    code?: number;
    data?: ArticleVO;
    message?: string;
  };

  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseListArticleVO_ = {
    code?: number;
    data?: ArticleVO[];
    message?: string;
  };

  type BaseResponseListCommentVO_ = {
    code?: number;
    data?: CommentVO[];
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseLoginUserVo_ = {
    code?: number;
    data?: LoginUserVo;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageActivityVO_ = {
    code?: number;
    data?: PageActivityVO_;
    message?: string;
  };

  type BaseResponsePageArticleVO_ = {
    code?: number;
    data?: PageArticleVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser_ = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BaseResponseWxUserVO_ = {
    code?: number;
    data?: WxUserVO;
    message?: string;
  };

  type CommentAddRequest = {
    articleId?: number;
    content?: string;
    parentId?: number;
    userId?: number;
  };

  type CommentVO = {
    articleId?: number;
    content?: string;
    createTime?: string;
    id?: number;
    parentUserVO?: UserVO;
    replies?: CommentVO[];
    userVO?: UserVO;
  };

  type DeleteRequest = {
    id?: number;
  };

  type FeedbackAddRequest = {
    content?: string;
    imageList?: string[];
    relation?: string;
    userId?: number;
  };

  type getArticleByArticleIdUsingGETParams = {
    /** articleId */
    articleId?: number;
  };

  type getArticleByUserIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCommentListByArticleIdUsingGETParams = {
    /** articleId */
    articleId?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type likeCommentUsingGETParams = {
    /** id */
    id: number;
  };

  type LoginUserVo = {
    constellation?: string;
    createTime?: string;
    editTime?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    token?: string;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type PageActivityVO_ = {
    current?: number;
    pages?: number;
    records?: ActivityVO[];
    size?: number;
    total?: number;
  };

  type PageArticleVO_ = {
    current?: number;
    pages?: number;
    records?: ArticleVO[];
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    current?: number;
    pages?: number;
    records?: UserVO[];
    size?: number;
    total?: number;
  };

  type removeActivityUsingPOSTParams = {
    /** id */
    id: number;
  };

  type User = {
    constellation?: string;
    createTime?: string;
    editTime?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    isDelete?: number;
    openid?: string;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
    userScore?: number;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    constellation?: string;
    createTime?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    userAccount?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserWxUpdateRequest = {
    constellation?: string;
    gender?: number;
    id?: number;
    imageUrl?: string;
    userName?: string;
    userProfile?: string;
  };

  type wxLoginUsingPOSTParams = {
    /** code */
    code: string;
  };

  type WxUserVO = {
    constellation?: string;
    createTime?: string;
    editTime?: string;
    gender?: string;
    id?: number;
    imageUrl?: string;
    updateTime?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
