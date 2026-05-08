package fun.cyhgraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.annotations.Update;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewDTO {
    int id;
    int num;
}
