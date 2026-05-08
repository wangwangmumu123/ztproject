package fun.cyhgraph.controller.admin;

import fun.cyhgraph.result.Result;
import fun.cyhgraph.service.WorkSpaceService;
import fun.cyhgraph.vo.BusinessDataVO;
import fun.cyhgraph.vo.ProductOverViewVO;
import fun.cyhgraph.vo.OrderOverViewVO;
import fun.cyhgraph.vo.SetmealOverViewVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
@RequestMapping("/admin/workspace")
@Slf4j
public class WorkSpaceController {

    @Autowired
    private WorkSpaceService workSpaceService;

    /**
     * 工作台今日数据查询
     * @return
     */
    @GetMapping("/businessData")
    public Result<BusinessDataVO> businessData(){
        LocalDateTime begin = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime end = LocalDateTime.now().with(LocalTime.MAX);
        BusinessDataVO businessDataVO = workSpaceService.getBusinessData(begin, end);
        return Result.success(businessDataVO);
    }

    /**
     * 查询订单管理数据
     * @return
     */
    @GetMapping("/overviewOrders")
    public Result<OrderOverViewVO> orderOverView(){
        OrderOverViewVO orderOverViewVO = workSpaceService.getOrderOverView();
        return Result.success(orderOverViewVO);
    }

    /**
     * 查询菜品总览
     * @return
     */
    @GetMapping("/overviewDishes")
    public Result<ProductOverViewVO> productOverView(){
        ProductOverViewVO productOverViewVO = workSpaceService.getProductOverView();
        return Result.success(productOverViewVO);
    }


}
