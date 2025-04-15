package com.xiaoyu.campus.model.dto.activity;

import com.xiaoyu.campus.common.PageRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActivityQueryRequest extends PageRequest implements Serializable {

    private String category;

    private String title;

    private String profile;

    private Long userId;

    private String organizers;

    private static final long serialVersionUID = 1L;

}
