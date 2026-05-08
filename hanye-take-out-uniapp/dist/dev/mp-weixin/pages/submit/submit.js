"use strict";
const common_vendor = require("../../common/vendor.js");
const api_address = require("../../api/address.js");
const api_cart = require("../../api/cart.js");
const api_order = require("../../api/order.js");
const stores_modules_address = require("../../stores/modules/address.js");
require("../../utils/http.js");
require("../../stores/modules/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "submit",
  setup(__props) {
    const store = stores_modules_address.useAddressStore();
    const cartList = common_vendor.ref([]);
    const CartAllNumber = common_vendor.ref(0);
    const CartAllPrice = common_vendor.ref(0);
    const address = common_vendor.ref("");
    const label = common_vendor.ref("");
    const consignee = common_vendor.ref("");
    const gender = common_vendor.ref(0);
    const phoneNumber = common_vendor.ref("");
    const estimatedDeliveryTime = common_vendor.ref("");
    common_vendor.ref("ios");
    common_vendor.ref(false);
    common_vendor.ref(-2);
    common_vendor.ref([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    common_vendor.ref(false);
    const remark = common_vendor.ref("");
    const arrivalTime = common_vendor.ref("");
    const addressId = common_vendor.ref(0);
    const getCartList = async () => {
      const res = await api_cart.getCartAPI();
      console.log("初始化购物车列表", res);
      cartList.value = res.data;
      CartAllPrice.value = cartList.value.reduce((acc, cur) => acc + cur.amount * cur.number, 0) + 6;
      console.log("CartAllPrice", CartAllPrice.value);
    };
    common_vendor.onLoad(async (options) => {
      await getAddressBookDefault();
      console.log("options", options);
      if (options.address) {
        const addressObj = JSON.parse(options.address);
        console.log("获取新的地址啊！addressObj", addressObj);
        addressId.value = addressObj.id;
        label.value = addressObj.label;
        address.value = addressObj.provinceName + addressObj.cityName + addressObj.districtName + addressObj.detail;
        phoneNumber.value = addressObj.phone;
        consignee.value = addressObj.consignee;
      } else if (options.remark) {
        remark.value = options.remark;
      }
      console.log("我地址id赋值了啊1-------------", addressId.value);
      await getCartList();
      getHarfAnOur();
    });
    common_vendor.onShow(async (options) => {
      console.log("options", options);
      await getCartList();
    });
    const DateToStr = (date) => {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hours = date.getHours();
      var min = date.getMinutes();
      var second = date.getSeconds();
      return year + "-" + (month + 1 > 9 ? month + 1 : "0" + (month + 1)) + "-" + (day > 9 ? day : "0" + day) + " " + (hours > 9 ? hours : "0" + hours) + ":" + (min > 9 ? min : "0" + min) + ":" + (second > 9 ? second : "0" + second);
    };
    const getHarfAnOur = () => {
      const date = /* @__PURE__ */ new Date();
      date.setTime(date.getTime() + 36e5);
      const formattedDate = DateToStr(date);
      estimatedDeliveryTime.value = formattedDate;
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10)
        hours = parseInt("0" + hours);
      if (minutes < 10)
        minutes = parseInt("0" + minutes);
      arrivalTime.value = hours + ":" + minutes;
    };
    const getAddressBookDefault = async () => {
      const res = await api_address.getDefaultAddressAPI();
      if (res.code === 0) {
        console.log("默认地址", res.data);
        addressId.value = 0;
        if (res.data.provinceName) {
          address.value = res.data.provinceName + res.data.cityName + res.data.districtName + res.data.detail;
        }
        phoneNumber.value = res.data.phone;
        consignee.value = res.data.consignee;
        gender.value = res.data.gender;
        addressId.value = res.data.id;
      }
    };
    const trans = (item) => {
      switch (item) {
        case "公司":
          return "1";
        case "家":
          return "2";
        case "学校":
          return "3";
        default:
          return "4";
      }
    };
    const goAddress = () => {
      store.addressBackUrl = "/pages/submit/submit";
      common_vendor.index.redirectTo({
        url: "/pages/address/address"
      });
    };
    const payOrderHandle = async () => {
      const unPayRes = await api_order.getUnPayOrderAPI();
      console.log("未支付订单", unPayRes);
      if (unPayRes.data !== 0) {
        console.log("有未支付订单", unPayRes.data);
        common_vendor.index.showToast({
          title: "有未支付订单，请先支付或取消！",
          icon: "none"
        });
        return false;
      }
      if (!address.value) {
        common_vendor.index.showToast({
          title: "请选择收货地址",
          icon: "none"
        });
        return false;
      }
      console.log("我传地址id了啊2--------------", addressId.value);
      const params = {
        payMethod: 1,
        addressId: addressId.value,
        remark: remark.value,
        estimatedDeliveryTime: estimatedDeliveryTime.value,
        // 预计到达时间
        deliveryStatus: 1,
        // 立即送出
        amount: CartAllPrice.value
      };
      console.log("生成订单params", params);
      const res = await api_order.submitOrderAPI(params);
      if (res.code === 0) {
        console.log("订单生成成功", res.data);
        common_vendor.index.redirectTo({
          url: "/pages/pay/pay?orderId=" + res.data.id + "&orderAmount=" + res.data.orderAmount + "&orderNumber=" + res.data.orderNumber + "&orderTime=" + res.data.orderTime
        });
      } else {
        common_vendor.index.showToast({
          title: res.msg || "操作失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !address.value
      }, !address.value ? {} : {}, {
        b: address.value
      }, address.value ? {
        c: common_vendor.t(label.value || "其他"),
        d: common_vendor.n("tag" + trans(label.value)),
        e: common_vendor.t(address.value),
        f: common_vendor.t(consignee.value),
        g: common_vendor.t(phoneNumber.value)
      } : {}, {
        h: common_vendor.o(goAddress),
        i: common_vendor.t(arrivalTime.value),
        j: common_vendor.f(cartList.value, (obj, index, i0) => {
          return common_vendor.e({
            a: obj.pic,
            b: common_vendor.t(obj.name),
            c: obj.number && obj.number > 0
          }, obj.number && obj.number > 0 ? {
            d: common_vendor.t(obj.number)
          } : {}, {
            e: common_vendor.t(obj.amount),
            f: index
          });
        }),
        k: common_vendor.t(CartAllPrice.value),
        l: common_vendor.t(CartAllNumber.value),
        m: common_vendor.t(parseFloat((Math.round(CartAllPrice.value * 100) / 100).toFixed(2))),
        n: common_vendor.o(($event) => payOrderHandle())
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb87e98c"], ["__file", "D:/code/git/supermarket-manager/hanye-take-out-uniapp/src/pages/submit/submit.vue"]]);
wx.createPage(MiniProgramPage);
