package com.xiaoyu.campus.model.dto.article;

import com.xiaoyu.campus.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class ArticleQueryRequest extends PageRequest implements Serializable {

    private String content;

    private static final long serialVersionUID = 1L;

}
