-- ====================================
-- 外卖系统数据库建表脚本
-- 数据库版本: MySQL 8.0
-- ====================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS supermarket DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE supermarket;

-- ====================================
-- 1. 用户表
-- ====================================
CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(50) COMMENT '姓名',
    `openid` VARCHAR(100) COMMENT '微信openid',
    `phone` VARCHAR(20) COMMENT '手机号',
    `gender` TINYINT COMMENT '性别 0-女 1-男',
    `id_number` VARCHAR(18) COMMENT '身份证号',
    `pic` VARCHAR(500) COMMENT '头像',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_openid (`openid`),
    INDEX idx_phone (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- ====================================
-- 2. 员工表
-- ====================================
CREATE TABLE `employee` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(50) NOT NULL COMMENT '姓名',
    `account` VARCHAR(50) NOT NULL UNIQUE COMMENT '账号',
    `password` VARCHAR(100) NOT NULL COMMENT '密码',
    `phone` VARCHAR(20) COMMENT '手机号',
    `age` INT COMMENT '年龄',
    `gender` TINYINT COMMENT '性别 0-女 1-男',
    `pic` VARCHAR(500) COMMENT '头像',
    `status` TINYINT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
    `create_user` VARCHAR(50) COMMENT '创建人',
    `update_user` VARCHAR(50) COMMENT '修改人',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_account (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='员工表';

-- ====================================
-- 3. 分类表
-- ====================================
CREATE TABLE `category` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(50) NOT NULL COMMENT '分类名称',
    `sort` INT DEFAULT 0 COMMENT '排序',
    `status` TINYINT DEFAULT 1 COMMENT '状态 0-禁用 1-启用',
    `create_user` INT COMMENT '创建人',
    `update_user` INT COMMENT '修改人',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='分类表';

-- ====================================
-- 4. 商品表
-- ====================================
CREATE TABLE `product` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(100) NOT NULL COMMENT '商品名称',
    `pic` VARCHAR(500) COMMENT '商品图片',
    `detail` TEXT COMMENT '商品描述',
    `price` DECIMAL(10,2) NOT NULL COMMENT '价格',
    `status` VARCHAR(10) DEFAULT '1' COMMENT '状态',
    `category_id` INT COMMENT '分类id',
    `category` VARCHAR(50) COMMENT '分类名称',
    `number` INT DEFAULT 0 COMMENT '库存数量',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (`category_id`),
    INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- ====================================
-- 5. 套餐表
-- ====================================
CREATE TABLE `setmeal` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(100) NOT NULL COMMENT '套餐名称',
    `pic` VARCHAR(500) COMMENT '套餐图片',
    `detail` TEXT COMMENT '套餐描述',
    `price` DECIMAL(10,2) NOT NULL COMMENT '价格',
    `status` TINYINT DEFAULT 1 COMMENT '状态 0-停售 1-起售',
    `category_id` INT COMMENT '分类id',
    `create_user` INT COMMENT '创建人',
    `update_user` INT COMMENT '修改人',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_category_id (`category_id`),
    INDEX idx_status (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='套餐表';

-- ====================================
-- 6. 套餐菜品关联表
-- ====================================
CREATE TABLE `setmeal_dish` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(100) COMMENT '菜品名称',
    `price` DECIMAL(10,2) COMMENT '菜品价格',
    `copies` INT COMMENT '份数',
    `setmeal_id` INT NOT NULL COMMENT '套餐id',
    `dish_id` INT COMMENT '菜品id',
    INDEX idx_setmeal_id (`setmeal_id`),
    INDEX idx_dish_id (`dish_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='套餐菜品关联表';

-- ====================================
-- 7. 购物车表
-- ====================================
CREATE TABLE `cart` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(100) COMMENT '商品名称',
    `user_id` INT NOT NULL COMMENT '用户id',
    `product_id` INT COMMENT '商品id',
    `number` INT DEFAULT 1 COMMENT '数量',
    `amount` DECIMAL(10,2) COMMENT '金额',
    `pic` VARCHAR(500) COMMENT '图片',
    `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_user_id (`user_id`),
    INDEX idx_product_id (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- ====================================
-- 8. 地址簿表
-- ====================================
CREATE TABLE `address_book` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `user_id` INT NOT NULL COMMENT '用户id',
    `consignee` VARCHAR(50) NOT NULL COMMENT '收货人',
    `phone` VARCHAR(20) NOT NULL COMMENT '手机号',
    `gender` TINYINT COMMENT '性别 0-女 1-男',
    `province_code` VARCHAR(20) COMMENT '省级区划编号',
    `province_name` VARCHAR(50) COMMENT '省级名称',
    `city_code` VARCHAR(20) COMMENT '市级区划编号',
    `city_name` VARCHAR(50) COMMENT '市级名称',
    `district_code` VARCHAR(20) COMMENT '区级区划编号',
    `district_name` VARCHAR(50) COMMENT '区级名称',
    `detail` VARCHAR(200) COMMENT '详细地址',
    `label` VARCHAR(20) COMMENT '标签',
    `is_default` TINYINT DEFAULT 0 COMMENT '是否默认 0-否 1-是',
    INDEX idx_user_id (`user_id`),
    INDEX idx_is_default (`is_default`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='地址簿表';

-- ====================================
-- 9. 订单表
-- ====================================
CREATE TABLE `order` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `number` VARCHAR(50) NOT NULL UNIQUE COMMENT '订单号',
    `status` TINYINT DEFAULT 1 COMMENT '订单状态 1-待付款 2-待接单 3-已接单 4-派送中 5-已完成 6-已取消',
    `user_id` INT NOT NULL COMMENT '下单用户id',
    `address_book_id` INT COMMENT '地址id',
    `order_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '下单时间',
    `checkout_time` DATETIME COMMENT '结账时间',
    `pay_method` TINYINT COMMENT '支付方式 1-微信 2-支付宝',
    `pay_status` TINYINT DEFAULT 0 COMMENT '支付状态 0-未支付 1-已支付 2-退款',
    `amount` DECIMAL(10,2) NOT NULL COMMENT '实收金额',
    `remark` VARCHAR(200) COMMENT '备注',
    `user_name` VARCHAR(50) COMMENT '用户名',
    `phone` VARCHAR(20) COMMENT '手机号',
    `address` VARCHAR(200) COMMENT '地址',
    `consignee` VARCHAR(50) COMMENT '收货人',
    `cancel_reason` VARCHAR(200) COMMENT '订单取消原因',
    `rejection_reason` VARCHAR(200) COMMENT '订单拒绝原因',
    `cancel_time` DATETIME COMMENT '订单取消时间',
    `estimated_delivery_time` DATETIME COMMENT '预计送达时间',
    `delivery_status` TINYINT COMMENT '配送状态 1-立即送出 0-选择具体时间',
    `delivery_time` DATETIME COMMENT '送达时间',
    `pack_amount` INT DEFAULT 0 COMMENT '打包费',
    `tableware_number` INT DEFAULT 0 COMMENT '餐具数量',
    `tableware_status` TINYINT COMMENT '餐具数量状态 1-按餐量提供 0-选择具体数量',
    INDEX idx_number (`number`),
    INDEX idx_user_id (`user_id`),
    INDEX idx_status (`status`),
    INDEX idx_order_time (`order_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- ====================================
-- 10. 订单明细表
-- ====================================
CREATE TABLE `order_detail` (
    `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键',
    `name` VARCHAR(100) COMMENT '商品名称',
    `order_id` INT NOT NULL COMMENT '订单id',
    `product_id` INT COMMENT '商品id',
    `number` INT DEFAULT 1 COMMENT '数量',
    `amount` DECIMAL(10,2) COMMENT '金额',
    `pic` VARCHAR(500) COMMENT '图片',
    INDEX idx_order_id (`order_id`),
    INDEX idx_product_id (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单明细表';
