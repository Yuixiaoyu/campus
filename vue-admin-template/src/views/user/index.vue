<template>
  <div class="app-container">
    <!-- 搜索条件区域 -->
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        placeholder="用户ID"
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="listQuery.userName"
        placeholder="用户昵称"
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <el-input
        v-model="listQuery.userProfile"
        placeholder="用户简介"
        style="width: 200px;"
        class="filter-item"
        clearable
      />
      <el-select
        v-model="listQuery.userRole"
        placeholder="用户角色"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="filter-item"
        @click="handleFilter"
      >
        查询
      </el-button>
    </div>

    <!-- 表格区域 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      fit
      highlight-current-row
    >
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        width="80"
      />
      <el-table-column
        label="头像"
        align="center"
        width="100"
      >
        <template slot-scope="{row}">
          <el-avatar :src="row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户昵称"
        align="center"
      />
      <el-table-column
        prop="userPhone"
        label="手机号"
        align="center"
        width="120"
      />
      <el-table-column
        label="性别"
        align="center"
        width="80"
      >
        <template slot-scope="{row}">
          {{ row.gender | genderFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="积分"
        align="center"
        width="80"
      />
      <el-table-column
        prop="userProfile"
        label="简介"
        align="center"
        width="200"
      />
      <el-table-column
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="{row}">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="listQuery.current"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="listQuery.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { listUserVoByPageUsingPost, deleteUserUsingPost } from '@/api/userController'

export default {
  name: 'User',
  filters: {
    genderFilter(gender) {
      const genderMap = {
        0: '男',
        1: '女',
        2: '保密'
      }
      return genderMap[gender]
    }
  },
  data() {
    return {
      list: [], // 用户列表
      total: 0, // 总记录数
      listLoading: true, // 加载状态
      listQuery: {
        current: 1, // 当前页码
        pageSize: 10, // 每页数量
        id: null, // 用户ID
        userName: null, // 用户昵称
        userProfile: null, // 用户简介
        userRole: null // 用户角色
      },
      roleOptions: [
        { value: 'user', label: '普通用户' },
        { value: 'admin', label: '管理员' }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取用户列表
    getList() {
      this.listLoading = true
      console.log("listQuery",this.listQuery)
      listUserVoByPageUsingPost(this.listQuery).then(response => {
        console.log("response",response.data.records)
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 处理查询按钮点击
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    // 处理每页数量变化
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 处理页码变化
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    // 处理修改按钮点击
    handleUpdate(row) {
      // TODO: 实现修改功能
      console.log('修改用户:', row)
    },
    // 处理删除按钮点击
    handleDelete(row) {
      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserUsingPost({ id: row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    }
  }
}
</script>

<style scoped>
.filter-container {
  padding-bottom: 10px;
}
.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-right: 10px;
}
</style> 