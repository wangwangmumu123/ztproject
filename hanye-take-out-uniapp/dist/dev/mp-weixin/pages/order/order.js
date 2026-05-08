"use strict";
const common_vendor = require("../../common/vendor.js");
const api_shop = require("../../api/shop.js");
const api_category = require("../../api/category.js");
const api_product = require("../../api/product.js");
require("../../utils/http.js");
const api_cart = require("../../api/cart.js");
require("../../stores/modules/user.js");
if (!Math) {
  Navbar();
}
const Navbar = () => "./components/Navbar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "order",
  setup(__props) {
    const status = common_vendor.ref(true);
    const categoryList = common_vendor.ref([]);
    const activeIndex = common_vendor.ref(0);
    common_vendor.ref(0);
    const dishList = common_vendor.ref([]);
    const openCartList = common_vendor.ref(false);
    const cartList = common_vendor.ref([]);
    const CartAllNumber = common_vendor.ref(0);
    const CartAllPrice = common_vendor.ref(0);
    common_vendor.ref(false);
    common_vendor.ref();
    const getCategoryData = async () => {
      const res = await api_category.getCategoryAPI();
      console.log(res);
      categoryList.value = res.data;
      console.log("categoryList", categoryList.value);
    };
    const getDishOrSetmealList = async (index) => {
      activeIndex.value = index;
      console.log("index", index);
      console.log("getList by this category", categoryList.value[index]);
      let res = await api_product.getDishListAPI(categoryList.value[index].id);
      console.log(res);
      dishList.value = res.data;
    };
    const getCartList = async () => {
      const res = await api_cart.getCartAPI();
      console.log("初始化购物车列表", res);
      cartList.value = res.data;
      CartAllNumber.value = cartList.value.reduce((acc, cur) => acc + cur.number, 0);
      CartAllPrice.value = cartList.value.reduce((acc, cur) => acc + cur.amount * cur.number, 0);
      console.log("CartAllNumber", CartAllNumber.value);
      console.log("CartAllPrice", CartAllPrice.value);
      if (cartList.value.length === 0) {
        openCartList.value = false;
      }
    };
    const getCopies = (dish) => {
      var _a;
      console.log("getCopies", dish);
      return ((_a = cartList.value.find((item) => item.productId === dish.id)) == null ? void 0 : _a.number) || 0;
    };
    const addDishAction = async (item, form) => {
      console.log("点击了dialog的 “+” 添加菜品数量按钮", item, form);
      const currentCartQuantity = getCopies(item);
      console.log(currentCartQuantity);
      if (currentCartQuantity + 1 > item.number) {
        console.log("打印有没有检查");
        common_vendor.index.showToast({
          title: "库存不足，无法继续添加",
          icon: "none"
        });
        return;
      }
      if (form == "购物车") {
        console.log("addCart", item);
        const partialCart = {
          productId: item.productId
          // setmealId: item.setmealId,
          // dishFlavor: item.dishFlavor,
        };
        await api_cart.addToCartAPI(partialCart);
      } else {
        console.log("普通页面下的dish，点击能直接添加(而不弹出dialog)的菜品说明无口味", item);
        const partialCart = { productId: item.id };
        await api_cart.addToCartAPI(partialCart);
      }
      await getCartList();
    };
    const subDishAction = async (item, form) => {
      console.log("点击了减少菜品数量按钮subDishAction--------------------", item, form);
      if (form == "购物车") {
        console.log("subCart", item);
        const partialCart = {
          productId: item.dishId
          // setmealId: item.setmealId,
          // dishFlavor: item.dishFlavor,
        };
        await api_cart.subCartAPI(partialCart);
      } else {
        console.log("普通页面下的dish，不是dialog中的菜品说明无口味", item);
        const partialCart = { productId: item.id };
        await api_cart.subCartAPI(partialCart);
      }
      await getCartList();
    };
    const clearCart = async () => {
      await api_cart.cleanCartAPI();
      await getCartList();
      openCartList.value = false;
    };
    const submitOrder = () => {
      console.log("submitOrder");
      common_vendor.index.navigateTo({
        url: "/pages/submit/submit"
      });
    };
    common_vendor.onLoad(async () => {
      const res = await api_shop.getStatusAPI();
      console.log("店铺状态---------", res);
      status.value = res.data === 1 ? true : false;
      await getCategoryData();
      await getDishOrSetmealList(0);
      await getCartList();
    });
    common_vendor.onShow(async () => {
      await getCategoryData();
      await getCartList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(categoryList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: item.id,
            c: index === activeIndex.value ? 1 : "",
            d: common_vendor.o(($event) => getDishOrSetmealList(index), item.id)
          };
        }),
        b: common_vendor.f(dishList.value, (dish, k0, i0) => {
          return common_vendor.e({
            a: dish.pic,
            b: common_vendor.t(dish.name),
            c: common_vendor.t(dish.detail),
            d: common_vendor.t(dish.price),
            e: getCopies(dish) > 0
          }, getCopies(dish) > 0 ? {
            f: common_vendor.o(($event) => subDishAction(dish, "普通"), dish.id)
          } : {}, {
            g: getCopies(dish) > 0
          }, getCopies(dish) > 0 ? {
            h: common_vendor.t(getCopies(dish))
          } : {}, {
            i: common_vendor.o(($event) => addDishAction(dish, "普通"), dish.id),
            j: dish.id
          });
        }),
        c: cartList.value.length === 0
      }, cartList.value.length === 0 ? {} : {
        d: common_vendor.t(CartAllNumber.value),
        e: common_vendor.t(parseFloat((Math.round(CartAllPrice.value * 100) / 100).toFixed(2))),
        f: common_vendor.o(($event) => submitOrder()),
        g: common_vendor.o(() => openCartList.value = !openCartList.value)
      }, {
        h: common_vendor.o(($event) => clearCart()),
        i: common_vendor.f(cartList.value, (obj, index, i0) => {
          return common_vendor.e({
            a: obj.pic,
            b: common_vendor.t(obj.name),
            c: common_vendor.t(obj.amount),
            d: obj.number && obj.number > 0
          }, obj.number && obj.number > 0 ? {
            e: common_vendor.o(($event) => subDishAction(obj, "购物车"), index)
          } : {}, {
            f: obj.number && obj.number > 0
          }, obj.number && obj.number > 0 ? {
            g: common_vendor.t(obj.number)
          } : {}, {
            h: common_vendor.o(($event) => addDishAction(obj, "购物车"), index),
            i: index
          });
        }),
        j: common_vendor.o(($event) => openCartList.value = openCartList.value),
        k: openCartList.value,
        l: common_vendor.o(($event) => openCartList.value = !openCartList.value)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-88bf5328"], ["__file", "D:/code/git/supermarket-manager/hanye-take-out-uniapp/src/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
