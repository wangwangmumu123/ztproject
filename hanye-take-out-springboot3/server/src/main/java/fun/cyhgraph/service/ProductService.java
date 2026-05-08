package fun.cyhgraph.service;

import fun.cyhgraph.dto.ProductDTO;
import fun.cyhgraph.dto.ProductPageDTO;
import fun.cyhgraph.entity.Product;
import fun.cyhgraph.result.PageResult;
import fun.cyhgraph.vo.ProductVO;

import java.util.List;

public interface ProductService {
    void addProduct(ProductDTO productDTO);

    PageResult getPageList(ProductPageDTO productPageDTO);

    ProductVO getProductById(Integer id);

    void onOff(Integer id);

    void updateProduct(ProductDTO productDTO);

    void deleteBatch(List<Integer> ids);

    List<Product> getByCategory(Product product);

    List<Product> getProductList();

    void updateProductNum(int id, int num);
}
