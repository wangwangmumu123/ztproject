package fun.cyhgraph.mapper;

import com.github.pagehelper.Page;
import fun.cyhgraph.annotation.AutoFill;
import fun.cyhgraph.dto.CategoryTypePageDTO;
import fun.cyhgraph.entity.Category;
import fun.cyhgraph.enumeration.OperationType;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CategoryMapper {

    @AutoFill(OperationType.INSERT)
    @Insert("insert into category (name, status, create_user, update_user, create_time, update_time) VALUES " +
            "(#{name}, #{status}, #{createUser}, #{updateUser}, #{createTime}, #{updateTime})")
    void add(Category category);

    @Select("SELECT COUNT(*) FROM category WHERE name = #{name}")
    int countByName(String name);

    Page<Category> getPageList(CategoryTypePageDTO categoryTypePageDTO);

    @Select("select * from category where id = #{id}")
    Category getById(Integer id);

    @Select("select id from category where name = #{name}")
    int getId(String name);

    @AutoFill(OperationType.UPDATE)
    void update(Category category);

    @Delete("delete from category where id = #{id}")
    void delete(Integer id);

    @Update("update category set status = IF(status = 0, 1, 0) where id = #{id}")
    void onOff(Integer id);

    /**
     * 根据type查询分类，没有就查所有，且只能查有启用的分类
     * @param type
     * @return
     */
    List<Category> getList(Integer type);
}
