package fun.cyhgraph.service;

import fun.cyhgraph.dto.*;
import fun.cyhgraph.entity.Employee;
import fun.cyhgraph.result.PageResult;

import java.util.List;

public interface EmployeeService {
    Employee getEmployeeById(Integer id);

    Employee login(EmployeeLoginDTO employeeLoginDTO);

    void register(EmployeeRegDTO employeeRegDTO);

    PageResult employeePageList(PageDTO pageDTO);

    void update(EmployeeDTO employeeDTO);

    void delete(Integer id);

    void onOff(Integer id);

    void addEmployee(EmployeeDTO employeeDTO);

    void fixPwd(EmployeeFixPwdDTO employeeFixPwdDTO);

    void deleteBatch(List<Integer> ids);
}
