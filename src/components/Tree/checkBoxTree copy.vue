<!--
  树形组件 - checkBox
-->
<template>
  <div>
    <!-- <el-collapse class="checkboxCollapse"> -->
    <!-- <el-collapse-item title="点击查看操作功能"> -->
    <!-- 第一层 -->
    <div class="itemFirst"
         v-for="itemFirst in checkBoxItems"
         :key="itemFirst.key">
      <el-row>
        <el-checkbox :key="itemFirst.label"
                     v-model="itemFirst.checked"
                     :label="itemFirst.label"
                     @change="handleCheckedChange('itemFirst',itemFirst)">{{ itemFirst.label }}</el-checkbox>
      </el-row>

      <!-- 第二层 -->
      <div class="itemSecond"
           v-if="itemFirst.children && itemFirst.isExpand"
           v-for="itemSecond in itemFirst.children"
           :key="itemSecond.key">
        <el-row>
          <el-checkbox :key="itemSecond.label"
                       v-model="itemSecond.checked"
                       :label="itemSecond.label"
                       @change="handleCheckedChange('itemSecond',itemSecond)">{{ itemSecond.label }}</el-checkbox>
        </el-row>

        <!-- 第三层 -->
        <div class="itemThird"
             v-if="itemSecond.children">
          <el-row>
            <el-col v-for="itemThird in itemSecond.children"
                    :key="itemThird.key"
                    :span="8">
              <el-checkbox :key="itemThird.label"
                           v-model="itemThird.checked"
                           :label="itemThird.label"
                           @change="handleCheckedChange('itemThird',itemThird)">{{ itemThird.label }}</el-checkbox>
            </el-col>
          </el-row>
        </div>

      </div>

    </div>
    <!-- </el-collapse-item> -->
    <!-- </el-collapse> -->
  </div>
</template>
<script>
export default {
  name: "CheckboxTree",
  data() {
    return {
      isChecked: false,
      checkBoxItems: [
        {
          label: "权限",
          children: [
            {
              label: "用户管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            },
            {
              label: "文章管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            },
            {
              label: "代码管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            },
            {
              label: "角色管理",
              children: [
                {
                  label: "查看"
                },
                {
                  label: "修改"
                },
                {
                  label: "删除"
                }
              ]
            }
          ],
          isExpand: true
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
      this.checkBoxItems.forEach(item => {
        this.$set(item, "checked", true);
        if (item.children.length > 0) {
          item.children.forEach(item => {
            this.$set(item, "checked", true);
            if (item.children.length > 0) {
              item.children.forEach(item => {
                this.$set(item, "checked", true);
              });
            }
          });
        }
      });
    },
    handleCheckedChange(level, item) {
      this.isChecked = item.checked;
      switch (level) {
        case "itemFirst":
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
        case "itemSecond":
          // 如果点击的是第二层
          if (item.children.length > 0) {
            // 把第三层的item全部随第一层变化
            item.children.forEach(item => {
              item.checked = this.isChecked;
            });
          }
          break;
        case "itemThird":
          break;
      }
      this.opreationData();
    },
    // 根据第二层，第三层数据判断第一层数据是否被选择
    opreationData() {
      this.checkBoxItems.forEach(item => {
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
  // line-height: 25px;
}
.itemThird {
  margin-left: 20px;
  // line-height: 25px;
}
// .checkboxCollapse {
//   .el-collapse-item__header {
//     height: 36px;
//     line-height: 36px;
//     justify-content: flex-end;
//     .el-collapse-item__arrow {
//       margin-left: 15px;
//     }
//   }
// }
</style>

