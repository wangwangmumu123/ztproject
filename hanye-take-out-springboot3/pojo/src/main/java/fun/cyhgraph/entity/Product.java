package fun.cyhgraph.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class Product {
    private Integer id;
    private String name;
    private String pic;
    private String detail;
    private BigDecimal price;
    private String status;
    private Integer categoryId;
    private String category;
    private int number;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
