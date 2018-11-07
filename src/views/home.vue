<template>
  <div class="home">
    <header>
      <div class="nav-btn"></div>
      <section>私人图片存储服务</section>
    </header>
    <article>
      <div class="upload-wrap">
        <input type="file" name="photo" accept="image/*" capture="camera" @change="uploadPic" ref="inputFile">
        <p>点击上传图片</p>
      </div>
      <div class="demo-wrap" v-for="(pic, index) in picList" :key="index">
        <img :src="pic" :alt="index">
        <div class="preview">
          <div class="delTag" @click="showDialog('确认删除该图片', 'danger', index)">
            <i class="iconfont icon-close"></i>
          </div>
          <div class="searchTag">
            <i class="iconfont icon-search"></i>
          </div>
        </div>
      </div>
    </article>
    <MsgDialog v-model="showMask" :mode="mode" :title="dialogTitle" :content="dialogContent" @confirm="_setShowMaskFalse" @danger="delPic(picList[delIndex])"></MsgDialog>
  </div>
</template>

<script>
import { isLowerAndroid8Version } from "@/common/js/utils";
import MsgDialog from "@/components/MsgDialog";

export default {
  name: "home",
  data() {
    return {
      picList: [],
      showMask: false,
      dialogTitle: "提示",
      dialogContent: "",
      mode: "default",
      delIndex: -1
    };
  },
  mounted() {
    this.fetchPicList();

    // 处理安卓手机上传框兼容问题
    this.$nextTick(() => {
      if (isLowerAndroid8Version()) {
        this.$refs.inputFile.removeAttribute("capture");
      }
    });
  },
  methods: {
    showDialog(msg, mode, delIndex) {
      this.showMask = true;
      this.dialogContent = msg;
      this.mode = mode;
      this.delIndex = delIndex ? delIndex : -1;
    },
    uploadPic(e) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("photo", file);

      // var _this = this; // 保存当前上下文环境
      // this._generateBase64(file, _this);

      this.$ajax("/upload", formData, "post").then(result => {
        result = JSON.parse(result);
        this.showDialog(result.errMsg, "confirm");
        this.fetchPicList();
      });
    },
    fetchPicList() {
      this.$ajax("/getPicList", null, "get").then(result => {
        result = JSON.parse(result);
        if (result.errCode === 1) {
          this.picList = result.picList;
        }
      });
    },
    delPic(picPath) {
      let formData = new FormData();
      formData.append("picPath", picPath);
      console.log(picPath);
      this.$ajax("/delPic", formData, "delete").then(result => {
        result = JSON.parse(result);
        this.showDialog(result.errMsg, "confirm");
        this.fetchPicList();
      });
    },
    _generateBase64(file, _this) {
      var reader = new FileReader();

      //读取文件过程方法
      reader.onloadstart = function() {
        console.log("开始读取....");
      };
      reader.onprogress = function() {
        console.log("正在读取中....");
      };
      reader.onabort = function() {
        console.log("中断读取....");
      };
      reader.onerror = function() {
        console.log("读取异常....");
      };
      reader.onload = function(e) {
        console.log("成功读取....");
        _this.fileResult = e.target.result;
        console.log(_this.fileResult);
      };
      // 将图片转为base64
      reader.readAsDataURL(file);
    },
    _setShowMaskFalse() {
      // this.showMask = false;
    }
  },
  components: {
    MsgDialog
  }
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
  width: 100%;

  header {
    width: 100%;
    padding: 1rem 0;
    height: 3rem;
    line-height: 3rem;
    font-size: 2rem;
    color: #000;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
    margin-bottom: 2rem;
  }

  article {
    display: flex;
    flex-wrap: wrap;

    .upload-wrap {
      position: relative;
      box-sizing: border-box;
      height: 10rem;
      border: 3px dashed #8f8f8f;
      text-align: left;

      input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
      }

      p {
        margin: 0;
        font-size: 1rem;
        font-weight: bolder;
        line-height: 10rem;
        text-align: center;
      }
    }

    .demo-wrap {
      position: relative;
      box-sizing: border-box;
      height: 10rem;
      border: 3px solid #f8f8f8;

      &:hover .preview {
        display: block;
        cursor: pointer;
      }

      .preview {
        position: absolute;
        display: none;
        width: 100%;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 500;

        .searchTag {
          color: #fff;
          line-height: 10rem;

          i {
            font-size: 40px;
          }
        }

        .delTag {
          position: absolute;
          color: #000;
          right: 5px;
          top: 5px;

          &:hover {
            color: #509EE3;
            cursor: pointer;
          }
        }
      }

      img {
        position: absolute;
        box-sizing: border-box;
        max-width: 100%;
        max-height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
