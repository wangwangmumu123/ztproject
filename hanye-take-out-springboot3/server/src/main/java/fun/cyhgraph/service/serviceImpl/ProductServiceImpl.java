package fun.cyhgraph.service.serviceImpl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import fun.cyhgraph.dto.ProductDTO;
import fun.cyhgraph.dto.ProductPageDTO;
import fun.cyhgraph.entity.Category;
import fun.cyhgraph.entity.Product;
import fun.cyhgraph.mapper.CategoryMapper;
import fun.cyhgraph.mapper.ProductMapper;
import fun.cyhgraph.result.PageResult;
import fun.cyhgraph.service.ProductService;
import fun.cyhgraph.vo.ProductVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private CategoryMapper categoryMapper;

    @Override
    public void addProduct(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        product.setCreateTime(LocalDateTime.now());
        product.setUpdateTime(LocalDateTime.now());
        if(product.getNumber()>0)
        {
            product.setStatus("1");
        }else{
            product.setStatus("0");
        }

        if (categoryMapper.countByName(productDTO.getCategory()) == 0) {
            Category category = new Category();
            category.setStatus(1);
            category.setName(productDTO.getCategory());
            category.setCreateTime(LocalDateTime.now());
            category.setUpdateTime(LocalDateTime.now());
            categoryMapper.add(category);
        }

        product.setCategoryId(categoryMapper.getId(productDTO.getCategory()));
        productMapper.addProduct(product);
    }

    @Override
    public PageResult getPageList(ProductPageDTO productPageDTO) {
        PageHelper.startPage(productPageDTO.getPage(), productPageDTO.getPageSize());
        Page<Product> productList = productMapper.getPageList(productPageDTO);
        return new PageResult(productList.getTotal(), productList.getResult());
    }

    @Override
    public ProductVO getProductById(Integer id) {
         Product product =  productMapper.getById(id);
         ProductVO productVO = new ProductVO();
         BeanUtils.copyProperties(product, productVO);
        return productVO;
    }

    @Override
    public void onOff(Integer id) {
        log.info("根据id改");
        productMapper.onOff(id);
    }

    @Override
    public void updateProduct(ProductDTO productDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        product.setUpdateTime(LocalDateTime.now());
        productMapper.update(product);

        int n = product.getNumber();
        log.info("number:"+n);
        if (product.getNumber()>0) {
            log.info(product.getStatus());
            if ("0".equals(product.getStatus()))
            {
                log.info(product.getStatus());
                productMapper.onOff(product.getId());
            }
        }
    }

    @Override
    public void deleteBatch(List<Integer> ids) {
        productMapper.deleteBatch(ids);
    }

    @Override
    public List<Product> getByCategory(Product product) {
        List<Product> productVOList = productMapper.getList(product);
        return productVOList;
    }

    @Override
    public List<Product> getProductList() {
        List<Product> list = productMapper.getProductList();
        return list;
    }

    @Override
    public void updateProductNum(int id, int num) {
        productMapper.updateNum(id,num);
        productMapper.onOff(id);
    }
}
