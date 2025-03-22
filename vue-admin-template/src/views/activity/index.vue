<template>
  <div class="app-container">
    <el-row :gutter="24">
      <!-- 左侧社团分类列表 -->
      <el-col :span="4">
        <el-card class="box-card" style="height: calc(100vh - 120px);">
          <div slot="header" class="clearfix">
            <span>社团分类</span>
          </div>
          <el-menu default-active="1" class="club-menu">
            <!-- 体育类社团 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>体育类社团</span>
              </template>
              <el-menu-item v-for="(club, index) in sportsClubs" 
                :key="'sports' + index" 
                :index="'1-' + index"
              >
                {{ club }}
              </el-menu-item>
            </el-submenu>

            <!-- 服务类社团 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-service"></i>
                <span>服务类社团</span>
              </template>
              <el-menu-item v-for="(club, index) in serviceClubs" 
                :key="'service' + index" 
                :index="'2-' + index"
              >
                {{ club }}
              </el-menu-item>
            </el-submenu>

            <!-- 学术类社团 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-reading"></i>
                <span>学术类社团</span>
              </template>
              <el-menu-item v-for="(club, index) in academicClubs" 
                :key="'academic' + index" 
                :index="'3-' + index"
              >
                {{ club }}
              </el-menu-item>
            </el-submenu>

            <!-- 艺术类社团 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-picture"></i>
                <span>艺术类社团</span>
              </template>
              <el-menu-item v-for="(club, index) in artClubs" 
                :key="'art' + index" 
                :index="'4-' + index"
              >
                {{ club }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-card>
      </el-col>

      <!-- 右侧内容区 -->
      <el-col :span="20">
        <el-card class="box-card">
          <!-- 顶部搜索和操作区 -->
          <div class="filter-container">
            <el-input
              v-model="listQuery.title"
              placeholder="活动标题"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="listQuery.profile"
              placeholder="活动简介"
              style="width: 200px;"
              class="filter-item"
            />
            <el-select v-model="listQuery.category" placeholder="活动类别" class="filter-item" style="width: 150px;">
              <el-option label="全部" value="" />
              <el-option v-for="type in activityTypes" :key="type" :label="type" :value="type" />
            </el-select>
            <el-input
              v-model="listQuery.organizer"
              placeholder="组织名称"
              style="width: 200px;"
              class="filter-item"
            />
            <el-input
              v-model="listQuery.targetUsers"
              placeholder="活动对象"
              style="width: 150px;"
              class="filter-item"
            />
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
              搜索
            </el-button>
            <el-button class="filter-item" type="success" icon="el-icon-plus" @click="handleCreate">
              发布活动
            </el-button>
          </div>

          <!-- 活动列表 -->
          <el-table 
            v-loading="listLoading"
            :data="activityList" 
            style="width: 100%; margin-top: 20px; height: calc(100vh - 290px)"
            :height="'calc(100vh - 290px)'"
            element-loading-text="加载中..."
            border
            stripe
            highlight-current-row
          >
            <el-table-column label="活动封面" width="120" fixed>
              <template slot-scope="{row}">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="row.coverPicture"
                  fit="cover"
                  :preview-src-list="[row.coverPicture]"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="活动标题" min-width="150" fixed />
            <el-table-column prop="profile" label="活动简介" min-width="200">
              <template slot-scope="{row}">
                <el-tooltip 
                  class="item" 
                  effect="dark" 
                  :content="row.profile || '暂无简介'" 
                  placement="top-start"
                >
                  <span>{{ row.profile | ellipsis }}</span>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="活动类别" width="100" />
            <el-table-column prop="organizers" label="主办单位" width="150" />
            <el-table-column prop="position" label="活动地点" width="150" />
            <el-table-column label="报名情况" width="120" align="center">
              <template slot-scope="{row}">
                {{ row.currentSignups }}/{{ row.maxSignups }}
              </template>
            </el-table-column>
            <el-table-column prop="targetUsers" label="活动对象" width="120" />
            <el-table-column prop="userId" label="创建人ID" width="100" align="center" />
            <el-table-column prop="hits" label="点击量" width="80" align="center" />
            <el-table-column prop="status" label="状态" width="100" align="center">
              <template slot-scope="{row}">
                <el-tag :type="row.status === 1 ? 'success' : 'info'">
                  {{ row.status === 1 ? '进行中' : '已结束' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="160" align="center" />
            <el-table-column prop="endTime" label="结束时间" width="160" align="center" />
            <el-table-column label="操作" width="150" fixed="right" align="center">
              <template slot-scope="{row}">
                <el-button type="text" @click="handleEdit(row)">编辑</el-button>
                <el-button type="text" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.current"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="listQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 活动发布/编辑对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" >
      <el-form ref="activityForm" :model="activityForm" :rules="rules" label-width="100px">
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="activityForm.title" placeholder="请输入活动标题" style="width: 90%" />
        </el-form-item>
        <el-form-item label="活动简介" prop="description">
          <el-input 
            type="textarea" 
            v-model="activityForm.profile" 
            rows="4" 
            placeholder="请输入活动简介(选填)"
            style="width: 90%" 
          />
        </el-form-item>
        <el-form-item label="活动类别" prop="category" required>
          <el-select v-model="activityForm.category" placeholder="请选择活动类别" style="width: 90%">
            <el-option v-for="type in activityTypes" :key="type" :label="type" :value="type" />
          </el-select>
        </el-form-item>
        <el-form-item label="发布人ID" prop="publisherId">
          <el-input v-model="activityForm.userId" disabled style="width: 90%" />
        </el-form-item>
        <el-form-item label="封面图片" prop="coverPicture" required>
          <el-upload
            class="avatar-uploader"
            action="/api/upload/fileList"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload">
            <img v-if="activityForm.coverPicture" :src="activityForm.coverPicture" class="avatar">
            <div v-else class="avatar-uploader-icon">
              <i class="el-icon-plus"></i>
              <div class="upload-text">点击上传封面图片</div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="主办单位" prop="organizers" required>
          <el-input v-model="activityForm.organizers" placeholder="请输入主办单位名称" style="width: 90%" />
        </el-form-item>
        <el-form-item label="活动地点" prop="position" required>
          <el-input v-model="activityForm.position" placeholder="请输入活动具体地点" style="width: 90%" />
        </el-form-item>
        <el-form-item label="最大报名人数" label-width="120px" prop="maxSignups" required>
          <el-input-number 
            v-model="activityForm.maxSignups"
            :min="1" 
            :max="1000"
            placeholder="请输入最大报名人数"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="活动对象" prop="targetUsers" required>
          <el-select v-model="activityForm.targetUsers" placeholder="请选择活动对象" style="width: 90%">
            <el-option v-for="target in targetAudienceOptions" 
              :key="target" 
              :value="target">
              {{ target }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" prop="timeRange">
          <el-date-picker
            v-model="activityForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 90%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { publishActivityUsingPost, getActivityListUsingPost, updateActivityUsingPost, removeActivityUsingPost } from '@/api/activityController'
import { mapState } from 'vuex'

export default {
  name: 'Activity',
  filters: {
    // 文本超过20个字符显示省略号
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0, 20) + '...'
      }
      return value
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '发布活动',
      activityList: [], // 活动列表数据
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        pageSize: 10,
        title: undefined,
        type: undefined,
        profile: undefined,
        organizer: undefined,
        targetUsers: undefined,
        startTime: undefined,
        endTime: undefined
      },
      
      // 活动类别选项
      activityTypes: ['体育类', '学术类', '艺术类', '服务类'],
      
      // 活动对象选项
      targetAudienceOptions: ['全体师生', '本科生', '研究生', '教职工'],
      
      // 表单数据
      activityForm: {
        id: undefined,
        title: '',
        profile: '',
        category: '',
        userId: '',
        coverPicture: '',
        organizers: '',
        position: '',
        maxSignups: 100,
        targetUsers: '',
        timeRange: []
      },
      
      // 表单验证规则
      rules: {
        title: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
        category: [{ required: true, message: '请选择活动类别', trigger: 'change' }],
        organizers: [{ required: true, message: '请输入主办单位名称', trigger: 'blur' }],
        position: [{ required: true, message: '请输入活动具体地点', trigger: 'blur' }],
        maxSignups: [
          { required: true, message: '请输入最大报名人数', trigger: 'blur' },
          { type: 'number', min: 1, message: '报名人数必须大于0', trigger: 'blur' }
        ],
        timeRange: [{ required: true, message: '请选择活动时间', trigger: 'change' }],
        targetUsers: [{ required: true, message: '请选择活动对象', trigger: 'change' }],
        coverPicture: [{ required: true, message: '请上传活动封面图片', trigger: 'change' }]
      },
      
      // 原有的社团数据保持不变
      sportsClubs: [
        '瑜伽协会', '译苑棋社', '篮球俱乐部', '武术协会', 
        '电子竞技协会', 'SRT沙尘暴滑轮协会', '羽毛球协会',
        '高尔夫俱乐部', '乒乓球协会', '网球协会'
      ],
      serviceClubs: [
        '图书馆学生管理委员会', '国旗班', '爱心协会',
        '希冀环保协会', '红十字会'
      ],
      academicClubs: [
        '红杉科技社', '英语口语尖兵队', '行知调研社', '经贸协会',
        '旅游协会', '辩论协会', '新外语学社', '创业联合协会',
        '大学生心理协会', '西班牙口语尖兵队', '韩语口语尖兵队',
        '日语口语尖兵队'
      ],
      artClubs: [
        '国学研习会', 'Mighty Force街舞研习社', '雏凤诗社',
        'E-LEVEL主持达人队', '动感漫研社', '书画协会',
        '冉飞研习剧社', '桃李文学通讯社', '摄影协会',
        '流行音乐文化社', '魔术协会', '蓝天艺术社'
      ]
    }
  },
  
  created() {
    // 在组件创建时设置发布者ID
    if (this.userInfo) {
      this.activityForm.userId = this.userInfo.id
    }
    // 获取活动列表
    this.getList()
  },
  
  watch: {
    // 监听用户信息变化
    userInfo: {
      handler(newVal) {
        if (newVal) {
          this.activityForm.userId = newVal.id
        }
      },
      immediate: true
    }
  },
  
  methods: {
    // 获取活动列表数据
    async getList() {
      this.listLoading = true
      try {
        // 处理查询参数
        const query = {
          ...this.listQuery
        }
        
        const response = await getActivityListUsingPost(query)
        this.activityList = response.data.records
        this.total = response.data.total
      } catch (error) {
        console.error('获取活动列表失败:', error)
        this.$message.error('获取活动列表失败')
      } finally {
        this.listLoading = false
      }
    },

    // 处理搜索
    handleSearch() {
      this.listQuery.current = 1
      this.getList()
    },
    
    // 处理创建活动
    handleCreate() {
      this.dialogTitle = '发布活动'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.activityForm.resetFields()
        // 重置表单数据
        this.activityForm = {
          id: undefined,
          title: '',
          profile: '',
          category: '',
          userId: this.userInfo ? this.userInfo.id : '',
          coverPicture: '',
          organizers: '',
          position: '',
          maxSignups: 100,
          targetUsers: '',
          timeRange: []
        }
      })
    },
    
    // 处理图片上传成功
    handleImageSuccess(res, file) {
      if (res.code === 200 && res.data && res.data.length > 0) {
        // 使用服务器返回的图片URL
        this.activityForm.coverPicture = res.data[0]
      } else {
        this.$message.error('图片上传失败')
      }
    },
    
    // 图片上传前的验证
    beforeImageUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    
    // 处理表单提交
    handleSubmit() {
      this.$refs.activityForm.validate(async (valid) => {
        if (valid) {
          try {
            // 格式化日期
            const formatDate = (date) => {
              const pad = (num) => (num < 10 ? `0${num}` : num)
              const year = date.getFullYear()
              const month = pad(date.getMonth() + 1)
              const day = pad(date.getDate())
              const hours = pad(date.getHours())
              const minutes = pad(date.getMinutes())
              const seconds = pad(date.getSeconds())
              return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            }

            const submitData = {
              id: this.activityForm.id,
              ...this.activityForm,
              startTime: formatDate(new Date(this.activityForm.timeRange[0])),
              endTime: formatDate(new Date(this.activityForm.timeRange[1]))
            }
            delete submitData.timeRange
            
            // 根据是否有id判断是新增还是编辑
            if (submitData.id) {
              await updateActivityUsingPost(submitData)
              this.$message.success('活动更新成功')
            } else {
              delete submitData.id
              await publishActivityUsingPost(submitData)
              this.$message.success('活动发布成功')
            }
            this.dialogVisible = false
            // 刷新活动列表
            this.getList()
          } catch (error) {
            const action = this.activityForm.id ? '更新' : '发布'
            this.$message.error(`活动${action}失败`)
          }
        }
      })
    },

    // 处理每页条数变化
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },

    // 处理页码变化
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },

    // 处理编辑活动
    handleEdit(row) {
      this.dialogTitle = '编辑活动'
      this.dialogVisible = true
      this.$nextTick(() => {
        // 将时间字符串转换为日期对象数组
        const timeRange = [new Date(row.startTime), new Date(row.endTime)]

        // 复制活动数据并添加时间范围
        this.activityForm = {
          ...row,
          timeRange
        }
        console.log('编辑表单数据:', this.activityForm)
      })
    },

    // 处理删除活动
    handleDelete(row) {
      this.$confirm('确认删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await removeActivityUsingPost({ id: row.id })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新活动列表
          this.getList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {
        // 取消删除时的处理
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script> 

<style scoped>
.filter-container {
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
/deep/ .el-table__fixed-right{
  z-index: 1 !important;
}
/deep/ .el-table__fixed::before{
  z-index: 1 !important;
}

.club-menu {
  border-right: none;
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.el-dialog__body {
  padding: 20px 40px;
}

.upload-text {
  font-size: 12px;
  color: #606266;
  margin-top: 10px;
}

.el-checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.pagination-container {
  padding: 32px 16px;
  text-align: right;
}
</style> 