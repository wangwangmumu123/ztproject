package fun.cyhgraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPageDTO implements Serializable {

    private int page;
    private int pageSize;
    private String name;
    private String category;
    private Integer status;

}
