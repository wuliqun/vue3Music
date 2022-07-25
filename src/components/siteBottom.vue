<template>
  <div class="m-bottom">
    <div class="bottom">
      <div class="infos">
        <div class="links">
          <template v-for="link in bottomLinks" :key="link.txt">
            <a :href="link.url" target="_blank">{{ link.txt }}</a
            ><span class="sep">|</span>
          </template>
        </div>
        <div class="line">
          网易公司版权所有©1997-2022 &nbsp;&nbsp;&nbsp;&nbsp;
          杭州乐读科技有限公司运营：<a
            href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png"
            >浙网文[2021] 1186-054号</a
          >
        </div>
        <div class="line">
          <a href="https://beian.miit.gov.cn/#/Integrated/index"
            >粤B2-20090191-18 工业和信息化部备案管理系统网站</a
          >
          &nbsp;&nbsp;
          <a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564"
          >
            <img src="../img/header/police.png" alt="" />浙公网安备
            33010902002564号</a
          >
        </div>
        <div class="line">互联网宗教信息服务许可证：浙（2022）0000120</div>
      </div>
      <div class="icons">
        <div class="icon" v-for="(icon, index) in bottomIcons" :key="icon">
          <div class="ico" :class="`ico-${index}`"></div>
          <div class="txt">{{ icon }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const bottomLinks = [
  {
    txt: "服务条款",
    url: "https://st.music.163.com/official-terms/service",
  },
  {
    txt: "隐私政策",
    url: "https://st.music.163.com/official-terms/privacy",
  },
  {
    txt: "儿童隐私政策",
    url: "https://st.music.163.com/official-terms/children",
  },
  {
    txt: "版权投诉",
    url: "https://music.163.com/st/staticdeal/complaints.html",
  },
  {
    txt: "投资者关系",
    url: "http://ir.music.163.com/",
  },
  {
    txt: "广告合作",
    url: "https://music.163.com/ui/resource",
  },
  {
    txt: "廉正举报",
    url: "https://jubao.163.com/",
  },
  {
    txt: "联系我们",
    url: "https://mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html?source=Music-Main-Station",
  },
];

const bottomIcons = [
  "Amped Studio",
  "用户认证",
  "独立音乐人",
  "赞赏",
  "视频奖励",
];
</script>
<style lang="scss">
.m-bottom {
  padding-bottom: 58px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  .bottom {
    display: flex;
    width: 980px;
    margin: 0 auto;
    .infos {
      padding-top: 15px;
      .links {
        line-height: 24px;
        a {
          color: #999;
          &:hover {
            text-decoration: underline;
          }
        }
        .sep {
          color: #999;
          margin: 0 5px;
          &:last-child {
            display: none;
          }
        }
      }
      .line {
        line-height: 28px;
        a {
          color: #333;
          &:hover {
            text-decoration: underline;
          }
        }
        img {
          position: relative;
          top: -2px;
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }
      }
    }
    .icons {
      display: flex;
      margin-top: 33px;
      margin-left: auto;
      .icon {
        width: 60px;
        margin-right: 30px;
        &:last-child{
          margin-right: 0;
        }
        .ico {
          width: 50px;
          height: 45px;
          margin:0 auto;
          background-size: 100% 100%;
          @for $i from 0 through 4 {
            &.ico-#{$i} {
              background-image: url(../img/header/foot-ico-#{$i}.png);
            }
          }
        }
        .txt{
          white-space: nowrap;
          margin-top: 6px;
          color:#999;
          font-size: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>