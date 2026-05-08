package fun.cyhgraph.controller.user;

import fun.cyhgraph.constant.StatusConstant;
import fun.cyhgraph.entity.Product;
import fun.cyhgraph.result.Result;
import fun.cyhgraph.service.ProductService;
import fun.cyhgraph.vo.ProductVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("userProductController")
@RequestMapping("/user/product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * 根据分类查该分类下所有
     *
     * @return
     */
    @GetMapping("/list/{categoryId}")
    public Result<List<Product>> getProductList(@PathVariable Integer categoryId) {
        log.info("要查询当前的分类categoryId下的所有商品：{}", categoryId);
        // 用户端除了分类条件限制，且只能展示起售中的商品，因此还有status限制
        Product product = new Product();
        product.setStatus("1");
        product.setCategoryId(categoryId);
        // 如果不存在，查询数据库，将查询到的数据放入redis中
        List<Product> products = productService.getByCategory(product);

        return Result.success(products);
    }
    /**
     * 根据菜品id
     *
     * @param id
     * @return
     */
    @GetMapping("/product/{id}")
    public Result<ProductVO> getProduct(@PathVariable Integer id) {
        log.info("用户根据菜品id查询菜品详情和对应口味：{}", id);
        ProductVO productVO = productService.getProductById(id);
        return Result.success(productVO);
    }

}
