/*
此组件假设数据为树形结构，以树形结构的方式进行展示
 */
<template>
  <div>
    <el-collapse class="checkboxCollapse">
      <el-collapse-item title="点击查看操作功能">
        <!-- 第一层 -->
        <div class="itemFirst"
             v-for="itemFirst in testItems"
             :key="itemFirst.key">
          <el-row>
            <el-checkbox :key="itemFirst.label"
                         v-model="itemFirst.checked"
                         :label="itemFirst.label"
                         @change="handleCheckedChange('itemFirst',itemFirst)">{{ itemFirst.label }}</el-checkbox>
          </el-row>
          <!-- 第二层 -->
          <div class="itemSecond"
               v-if="itemFirst.children"
               v-for="itemSecond in itemFirst.children"
               :key="itemSecond.key">
            <el-row>
              <el-checkbox :key="itemSecond.label"
                           v-model="itemSecond.checked"
                           :label="itemSecond.label"
                           @change="handleCheckedChange('itemSecond',itemSecond)">{{ itemSecond.label }}</el-checkbox>
            </el-row>
            <!-- 第三层 -->
            <el-row>

              <div class="itemThird"
                   v-if="itemSecond.children"
                   v-for="itemThird in itemSecond.children"
                   :key="itemThird.key">

                <el-col :span="6">
                  <el-checkbox :key="itemThird.label"
                               v-model="itemThird.checked"
                               :label="itemThird.label"
                               @change="handleCheckedChange('itemThird',itemThird)">{{ itemThird.label }}</el-checkbox>
                </el-col>

              </div>
            </el-row>

          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: 'CheckboxMore',
  data() {
    return {
      isChecked: false,
      testItems: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                },
                {
                  label: '三级 1-1-2'
                },
                {
                  label: '三级 1-1-1'
                },
                {
                  label: '三级 1-1-2'
                },
                {
                  label: '三级 1-1-1'
                },
                {
                  label: '三级 1-1-2'
                },
                {
                  label: '三级 1-1-1'
                },
                {
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                },
                {
                  label: '三级 2-1-1'
                },
                {
                  label: '三级 2-1-1'
                },
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    this.initData();
    // this.opreationData()
  },
  methods: {
    // 初始化数据
    initData() {
      this.testItems.forEach(item => {
        this.$set(item, 'checked', true);
        if (item.children.length > 0) {
          item.children.forEach(item => {
            this.$set(item, 'checked', true);
            if (item.children.length > 0) {
              item.children.forEach(item => {
                this.$set(item, 'checked', true);
              });
            }
          });
        }
      });
    },
    handleCheckedChange(level, item) {
      this.isChecked = item.checked;
      switch (level) {
        case 'itemFirst':
          // 如果点击的是第一层
          if (item.children.length > 0) {
            // 把第二层的item全部随第一层变化
            item.children.forEach(item => {
              item.checked = this.isChecked;
              // 把第三层的item全部随第一层变化
              if (item.children.length > 0) {
                item.children.forEach(item => {
                  item.checked = this.isChecked;
                });
              }
            });
          }
          break;
        case 'itemSecond':
          // 如果点击的是第二层
          if (item.children.length > 0) {
            // 把第三层的item全部随第一层变化
            item.children.forEach(item => {
              item.checked = this.isChecked;
            });
          }
          break;
        case 'itemThird':
          break;
      }
      this.opreationData();
    },
    // 根据第二层，第三层数据判断第一层数据是否被选择
    opreationData() {
      this.testItems.forEach(item => {
        item.children.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.checked = item.children.some(item => item.checked);
          }
        });

        if (item.children && item.children.length > 0) {
          item.checked = item.children.some(item => item.checked);
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.itemSecond {
  margin-left: 20px;
  line-height: 25px;
}
.itemThird {
  margin-left: 20px;
}
.checkboxCollapse {
  .el-collapse-item__header {
    height: 36px;
    line-height: 36px;
    justify-content: flex-end;
    .el-collapse-item__arrow {
      margin-left: 15px;
    }
  }
}
</style>

