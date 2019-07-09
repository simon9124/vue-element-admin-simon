<template>
  <div class="container">
    <ComponentForm :name="this.pageTitle"
                   :is-edit="this.isEdit()">
      <el-form slot="form"
               :model="formData"
               :rules="formRules"
               ref="formData"
               label-width="120px"
               label-position="right">
        <el-row>
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <el-form-item label="角色类型名称"
                          prop="roleName">
              <el-input v-model="formData.roleName"
                        placeholder="请输入角色类型名称（唯一）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <el-form-item label="角色类型标识"
                          prop="roleKey">
              <el-input v-model="formData.roleKey"
                        placeholder="请输入角色类型标识（唯一）"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <el-form-item label="操作功能"
                          prop="roleKey">
              <CheckboxMore></CheckboxMore>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="editor-container">
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <el-form-item label="备注"
                          prop="remark">
              <el-input class="input-textarea"
                        :autosize="{ minRows: 6, maxRows: 16}"
                        placeholder="请输入备注"
                        v-model="formData.remark"
                        type="textarea"
                        maxlength="500"
                        show-word-limit>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col v-if="this.isEdit()"
                  :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <el-form-item label="状态"
                          prop="roleStatus">
              <el-switch v-model="formData.roleStatus"
                         :active-value=1
                         :inactive-value=0>
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row class="form-content-submit">
          <el-col class="el-form-col-block"
                  :xs="2"
                  :sm="3"
                  :lg="6"
                  :xl="7"></el-col>
          <el-col :xs="20"
                  :sm="18"
                  :lg="12"
                  :xl="10">
            <!-- class="text-center" -->
            <el-form-item>
              <el-button type="warning"
                         icon="el-icon-close"
                         @click="close"> 关 闭 </el-button>
              <el-button type="success"
                         icon="el-icon-tickets"
                         v-show="!isEdit()"
                         @click="submitForm()"> 新 增</el-button>
              <el-button type="primary"
                         icon="el-icon-edit"
                         v-show="isEdit()"
                         @click="submitForm()"> 更 新 </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </ComponentForm>
  </div>

</template>
<script>
import ComponentForm from '@/components/ComponentForm';
import CheckboxMore from '@/components/CheckboxMore';
import { getRoleByCode, update, insert } from '@/api/role/role';
import { params } from '@/utils/params';

export default {
  name: 'RoleEdit',
  components: {
    ComponentForm,
    CheckboxMore
  },
  data() {
    return {
      // title字段
      pageTitle: '角色',
      // 表单数据
      formData: {
        // 默认状态
        roleStatus: 1
      },
      // 表单规则
      formRules: {
        roleKey: [{ required: true, message: '请输入角色', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        roleStatus: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      // 表单主键
      code: ''
    };
  },
  created() {
    this.code = params(this, 'roleCode');
    // 页面初始化
    this.init();
  },
  methods: {
    isEdit() {
      // 是否接收到code
      return this.code !== null;
    },
    init() {
      // 渲染编辑数据
      if (this.isEdit()) {
        getRoleByCode(this.code).then(result => {
          this.formData = result.data;
        });
      }
    },
    close() {
      // 关闭
      this.$router.push({
        path: '/settings/role'
      });
    },
    submitForm() {
      this.$refs['formData'].validate(valid => {
        if (valid && this.isEdit()) {
          // 更新
          update(this.formData);
        } else if (valid && !this.isEdit()) {
          // 新增
          this.formData.roleStatus = 1;
          insert(this.formData).then(() => {
            this.close();
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
</style>
