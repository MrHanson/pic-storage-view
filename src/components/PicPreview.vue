<template>
  <div class="pic-preview-container" v-show="showMask">
    <div class="pic-preview">
      <img :src="picList[picIndex]" alt="图片预览">
      <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
      <div class="state pre" @click="pre">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="state next" @click="next">
        <i class="iconfont icon-gengduo"></i>
      </div>
      <div class="del-btn" @click="delPic">
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMask: false
    };
  },
  props: {
    value: {},
    picList: {
      type: Array
    },
    picIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    closeMask() {
      this.showMask = false;
    },
    pre() {
      this.$emit("pre");
    },
    next() {
      this.$emit("next");
    },
    delPic() {
      this.$emit("del");
    }
  },
  created() {
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
.pic-preview-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 500;

  .pic-preview {
    width: 90%;
    height: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 16px;

    i {
      font-size: 30px;
    }

    img {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      max-width: 100%;
      max-height: 85%;
      border-radius: 8px;
      user-select: none;
    }

    div:hover {
      color: #509EE3;
      cursor: pointer;
    }

    .close-btn {
      position: absolute;
      right: 5px;
      top: 5px;
    }

    .del-btn {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      text-align: center;
      background: #EF8C8C;
      color: #fff;
      border-radius: 8px;

      &:hover {
        background: rgb(224, 135, 135);
      }

      &:active {
        background: #EF8C8C;
      }

      i {
        font-size: 60px;
      }
    }

    .state {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      i {
        font-size: 45px;
      }
    }

    .pre {
      left: 10px;
    }

    .next {
      right: 10px;
    }
  }
}
</style>
