<template>
  <div class="home">
    <header>
      <div class="nav-btn"></div>
      <section>私人图片存储服务</section>
    </header>
    <article>
      <div class="upload-wrap">
        <input type="file" name="photo" accept="image/*" multiple="multiple" capture="camera" @change="uploadPic" ref="inputFile">
        <p>点击上传图片</p>
      </div>
      <div class="demo-wrap" v-for="(pic, index) in picList" :key="index">
        <img :src="pic" :alt="index">
        <div class="tool">
          <div class="delTag" @click="showDialog('确认删除该图片', 'danger', index)">
            <i class="iconfont icon-close"></i>
          </div>
          <div class="searchTag" @click="showPreview(index)">
            <i class="iconfont icon-search"></i>
          </div>
        </div>
      </div>
    </article>
    <MsgDialog v-model="showMsgDialog" :mode="mode" :title="dialogTitle" :content="dialogContent" @danger="delPic(picList[picIndex])" @confirm="confirmDialog"></MsgDialog>
    <PicPreview v-model="showPicPreview" :picList="picList" :picIndex="picIndex" @pre="prePic" @next="nextPic" @del="showDialog('确认删除该图片', 'danger', picIndex)"></PicPreview>
  </div>
</template>

<script>
import { isLowerAndroid8Version } from "@/common/js/utils";

// 消息弹窗组件
import MsgDialog from "@/components/MsgDialog";

// 图片预览组件
import PicPreview from "@/components/PicPreview";

export default {
  name: "home",
  data() {
    return {
      picList: [],
      // MsgDialog组件参数
      showMsgDialog: false, // 是否显示消息框
      dialogTitle: "提示",
      dialogContent: "",
      mode: "default",
      // PicPreview组件参数
      showPicPreview: false, // 是否显示图片预览框
      picIndex: 0 // 当前展示的图片序号
    };
  },
  mounted() {
    this.fetchPicList();

    // 处理安卓手机上传兼容问题
    this.$nextTick(() => {
      if (isLowerAndroid8Version()) {
        this.$refs.inputFile.removeAttribute("capture");
      }
    });
  },
  methods: {
    showPreview(picIndex) {
      this.showPicPreview = true;
      this.picIndex = picIndex;
    },
    prePic() {
      this.picIndex =
        this.picIndex === 0 ? this.picList.length - 1 : this.picIndex - 1;
    },
    nextPic() {
      this.picIndex =
        this.picIndex === this.picList.length - 1 ? 0 : this.picIndex + 1;
    },
    showDialog(msg, mode, delIndex) {
      this.showMsgDialog = true;
      this.dialogContent = msg;
      this.mode = mode;
      if (Number.isInteger(delIndex)) {
        this.picIndex = delIndex;
      }
    },
    confirmDialog() {
      this.showMsgDialog = false;
      this.fetchPicList();
    },
    uploadPic(e) {
      let formData = new FormData();
      const files = e.target.files;
      for (const file of files) {
        if (file.size < 5242880) {
          // 限制文件小于5MB
          formData.append("photo", file);
        }
      }

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
      this.showPicPreview = false;
      let formData = new FormData();
      formData.append("picPath", picPath);
      this.$ajax("/delPic", formData, "delete").then(result => {
        result = JSON.parse(result);
        this.showDialog(result.errMsg, "confirm");
      });
    }
  },
  components: {
    MsgDialog,
    PicPreview
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

        &:hover {
          cursor: pointer;
        }
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

      &:hover .tool {
        display: block;
        cursor: pointer;
      }

      .tool {
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
          color: #8f8f8f;
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
