package fun.cyhgraph.mapper;

import com.github.pagehelper.Page;
import fun.cyhgraph.dto.ProductPageDTO;
import fun.cyhgraph.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;


@Mapper
public interface ProductMapper {
//    @AutoFill(OperationType.INSERT)
    void addProduct(Product product);

    Page<Product> getPageList(ProductPageDTO productPageDTO);
    //更改库存
    @Update("update product set number = #{num} where id = #{id}")
    void updatenum(Integer id,Integer num);

    //获得库存
    @Select("select number from product where id = #{id}")
    Integer getNum(Integer id);

    @Select("select * from product where id = #{id}")
    Product getById(Integer id);

//    @AutoFill(OperationType.UPDATE)
    void update(Product product);

    void deleteBatch(List<Integer> ids);

    @Update("update product set status = IF(status = 0, 1, 0) where id = #{id}")
    void onOff(Integer id);

    List<Product> getList(Product product);

    @Select("select count(id) from product where status = #{i}")
    Integer getByStatus(int i);

    @Select("select * from product where number = 0")
    List<Product> getProductList();

    @Update("update product set number = #{num} where id = #{id}")
    void updateNum(int id, int num);
}
