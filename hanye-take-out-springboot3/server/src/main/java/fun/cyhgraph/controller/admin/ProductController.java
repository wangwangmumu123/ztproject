package fun.cyhgraph.controller.admin;

import fun.cyhgraph.dto.NewDTO;
import fun.cyhgraph.dto.ProductDTO;
import fun.cyhgraph.dto.ProductPageDTO;
import fun.cyhgraph.entity.Product;
import fun.cyhgraph.result.PageResult;
import fun.cyhgraph.result.Result;
import fun.cyhgraph.service.ProductService;
import fun.cyhgraph.vo.ProductVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;
    /**
     * 添加菜品
     * @return
     */
    @PostMapping
    public Result addProduct(@RequestBody ProductDTO productDTO){
//        log.info("要添加的菜品信息：{}", dishDTO);
        productService.addProduct(productDTO);
        return Result.success();
    }

    /**
     * 菜品条件分页查询
     * @return
     */
    @GetMapping("/page")
    public Result<PageResult> getPageList(ProductPageDTO productPageDTO){
        log.info("菜品dish分页条件page：{}", productPageDTO);
        PageResult pageResult = productService.getPageList(productPageDTO);
        return Result.success(pageResult);
    }

    /**
     * 根据id查询菜品
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public Result<ProductVO> getProductById(@PathVariable Integer id){
        log.info("根据id查询菜品：{}", id);
        ProductVO productVO = productService.getProductById(id);
        return Result.success(productVO);
    }

    /**
     * 根据id修改起售停售状态
     * @param id
     * @return
     */
    @PutMapping("/status/{id}")
    public Result onOff(@PathVariable Integer id){
        log.info("根据id修改状态，{}", id);
        productService.onOff(id);
        return Result.success();
    }

    /**
     * 更新菜品
     * @return
     */
    @PutMapping
    public Result updateProduct(@RequestBody ProductDTO productDTO){
//        log.info("用户传过来的新菜品数据，{}", dishDTO);
        productService.updateProduct(productDTO);

        return Result.success();
    }

    /**
     * 根据ids批量删除菜品数据
     * @RequestParam 表示必须要ids参数，否则会报错
     * @param ids
     * @return
     */
    @DeleteMapping
    public Result deleteBatch(@RequestParam List<Integer> ids){
        log.info("要删除的菜品id列表，{}", ids);
        productService.deleteBatch(ids);

        return Result.success();
    }

    @GetMapping("/list")
    public Result<List<Product>> getProductList(){
        List<Product> list = productService.getProductList();
        return Result.success(list);
    }

    @PutMapping("/updateNum")
    public Result updateProductNum(@RequestBody NewDTO newDTO) {
        log.info("补货:"+newDTO.toString());
        int id = newDTO.getId();
        int num = newDTO.getNum();
        productService.updateProductNum(id,num);
        return Result.success();
    }

}
