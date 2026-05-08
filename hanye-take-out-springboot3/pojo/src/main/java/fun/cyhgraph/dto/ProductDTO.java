package fun.cyhgraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String name;
    private String pic;
    private String detail;
    private BigDecimal price;
    private String status;
    private String category;
    private int number;
}
