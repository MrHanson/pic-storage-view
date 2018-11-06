<template>
  <div class="home">
    <header>
      <div class="nav-btn"></div>
      <section>私人图片存储服务</section>
    </header>
    <div class="upload-wrap">
      <input type="file" name="photo" accept="image/*" capture="camera" @change="uploadPic" ref="inputFile">
      <p>点击上传图片</p>
    </div>
    <div class="demo-wrap" v-for="(pic, index) in picList" :key="index">
      <img :src="pic" :alt="index">
      <div class="delTag" @click="_delPic(pic)">x</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      picList: []
    };
  },
  mounted() {
    this._fetchPicList();
  },
  methods: {
    uploadPic(e) {
      const file = e.target.files[0];
      let formData = new FormData();
      formData.append("photo", file);

      // var _this = this; // 保存当前上下文环境
      // this._generateBase64(file, _this);

      this.$ajax("/upload", formData, "post").then(result => {
        result = JSON.parse(result);
        alert(result.errMsg);
        this._fetchPicList();
      });
    },
    _fetchPicList() {
      this.$ajax("/getPicList", null, "get").then(result => {
        result = JSON.parse(result);
        if (result.errCode === 1) {
          this.picList = result.picList;
        }
      });
    },
    _delPic(picPath) {
      let formData = new FormData();
      formData.append("picPath", picPath);
      console.log(picPath);
      this.$ajax("/delPic", formData, "delete").then(result => {
        result = JSON.parse(result);
        console.log(result);
        this._fetchPicList();
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

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

  .upload-wrap {
    position: relative;
    box-sizing: border-box;
    width: 50%;
    height: 15rem;
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
      font-size: 1.5rem;
      line-height: 15rem;
      text-align: center;
    }
  }

  .demo-wrap {
    position: relative;
    box-sizing: border-box;
    width: 50%;
    height: 15rem;
    border: 3px solid #f8f8f8;

    img {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 1rem;
    }

    .delTag {
      position: absolute;
      display: inline-block;
      background-color: #8f8f8f;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 15px;
      color: #fff;
      right: 5px;
      top: 5px;
    }
  }
}
</style>
