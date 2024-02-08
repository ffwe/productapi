CREATE TABLE product_inventory (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  unit_price INT NOT NULL,
  note TEXT
);
