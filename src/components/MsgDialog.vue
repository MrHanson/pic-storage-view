<template>
  <div class="dialog-container" v-show="showMask">
    <div class="dialog">
      <h4 class="dialog-title">{{title}}</h4>
      <p class="content" v-html="content"></p>
      <div class="btn-wrapper">
        <div v-if="mode != 'confirm'" class="btn-default" @click="closeBtn">
          {{cancelText}}
        </div>
        <div v-if="mode == 'danger'" class="btn-danger" @click="dangerBtn">
          {{dangerText}}
        </div>
        <div v-if="mode == 'confirm'" class="btn-confirm" @click="confirmBtn">
          {{confirmText}}
        </div>
      </div>
      <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    value: {},
    // 类型包括 defalut 默认， danger 危险， confirm 确认，
    mode: {
      type: String,
      default: "default"
    },
    content: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    dangerText: {
      type: String,
      default: "删除"
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      showMask: false
    };
  },
  methods: {
    closeMask() {
      this.showMask = false;
    },
    closeBtn() {
      this.$emit("cancel");
      this.closeMask();
    },
    dangerBtn() {
      this.$emit("danger");
      this.closeMask();
    },
    confirmBtn() {
      this.$emit("confirm");
      this.closeMask();
    }
  },
  mounted() {
    this.showMask = this.value;
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.showMask = newVal;
      }
    },
    showMask(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="stylus" scoped>
.dialog-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;

  .dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    width: 150px;
    height: 150px;
    background-color: #fff;

    .dialog-title {
      font-weight: 999;
    }

    .btn-wrapper {
      width: 100%;
      height: 45px;
      position: absolute;
      bottom: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;

      & > div {
        height: 40px;
        line-height: 40px;
        padding: 0 14px;
        color: #ffffff;
        background: #f1f1f1;
        border-radius: 8px;
        cursor: pointer;
      }

      .btn-default {
        color: #787878;

        &:hover {
          color: #509EE3;
        }
      }

      .btn-danger {
        background: #EF8C8C;

        &:hover {
          background: rgb(224, 135, 135);
        }

        &:active {
          background: #EF8C8C;
        }
      }

      .btn-confirm {
        color: #ffffff;
        background: #509EE3;

        &:hover {
          background: #6FB0EB;
        }
      }
    }

    .close-btn {
      position: absolute;
      right: 5px;
      top: 5px;

      &:hover {
        color: #509EE3;
        cursor: pointer;
      }
    }
  }
}
</style>
