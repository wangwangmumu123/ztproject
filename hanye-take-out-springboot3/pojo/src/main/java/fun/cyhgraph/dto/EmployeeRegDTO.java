package fun.cyhgraph.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRegDTO implements Serializable {

    private String account;
    private String password;
    private Integer age;
    private String phone;
    private Integer gender;
}
