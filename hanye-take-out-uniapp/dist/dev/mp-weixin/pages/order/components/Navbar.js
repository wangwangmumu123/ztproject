"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_shop = require("../../../api/shop.js");
require("../../../utils/http.js");
require("../../../stores/modules/user.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Navbar",
  setup(__props) {
    const status = common_vendor.ref(true);
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    common_vendor.onLoad(async () => {
      const res = await api_shop.getStatusAPI();
      console.log("店铺状态---------", res);
      status.value = res.data === 1 ? true : false;
    });
    const back = () => {
      common_vendor.index.switchTab({ url: "/pages/index/index" });
    };
    return (_ctx, _cache) => {
      var _a;
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(back),
        c: common_assets._imports_1,
        d: ((_a = common_vendor.unref(safeAreaInsets)) == null ? void 0 : _a.top) + "px"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e1a17746"], ["__file", "D:/code/git/supermarket-manager/hanye-take-out-uniapp/src/pages/order/components/Navbar.vue"]]);
wx.createComponent(Component);
