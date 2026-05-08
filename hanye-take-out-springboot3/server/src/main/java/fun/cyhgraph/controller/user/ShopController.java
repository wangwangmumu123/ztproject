package fun.cyhgraph.controller.user;

import fun.cyhgraph.result.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("userShopController") // 重命名，防止两个端admin、user的ShopController冲突
@RequestMapping("/user/shop")
@Slf4j
public class ShopController {

    // 将店铺状态存储在内存中，1表示营业中，0表示打烊中
    private static Integer shopStatus = 1; // 默认为营业中

    @GetMapping("/status")
    public Result<Integer> getStatus() {
        log.info("当前店铺状态为：{}", shopStatus == 1 ? "营业中" : "打烊中");
        return Result.success(shopStatus);
    }

}
