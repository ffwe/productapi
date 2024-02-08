### 재고 관련 기능
#### 1. 재고 조회
- HTTP 메서드: GET
- 엔드포인트: `/inventory`
- 설명: 전체 재고 정보 조회
- Response (성공)
```json
{
  "success": true,
  "data": [
    {
      "product_id": 1,
      "product_name": "Product A",
      "quantity": 100,
      "unit_price": 15000
    },
    {
      "product_id": 2,
      "product_name": "Product B",
      "quantity": 150,
      "unit_price": 22000
    }
  ]
}
```
- Response (실패)
```json
{
  "success": false,
  "error": "Failed to retrieve inventory information."
}
```

#### 2. 신규 품목 등록

- HTTP 메서드: POST
- 엔드포인트: `/inventory`
- 설명: 신규 품목 등록
- Body:
```json
{
  "product_name": "Product C",
  "quantity": 200,
  "unit_price": 28000
}
```
- Response (성공)
```json
{
  "success": true,
  "message": "New item added to inventory successfully.",
  "data": {
    "product_id": 3,
    "product_name": "Product C",
    "quantity": 200,
    "unit_price": 28000
  }
}
```
- Response (실패)
```json
{
  "success": false,
  "error": "Failed to add new item to inventory."
}
```

#### 3. 특정 품목 수정

- HTTP 메서드: PUT 또는 PATCH
- 엔드포인트: `/inventory/{product_id}`
- 설명: 특정 품목의 정보를 수정
- Body:
```json
{
  "quantity": 180,
  "unit_price": 24000
}
```
- Response (성공)
```json
{
  "success": true,
  "message": "Item with product_id 1 has been updated successfully.",
  "data": {
    "product_id": 1,
    "product_name": "Product A",
    "quantity": 180,
    "unit_price": 24000
  }
}
```
- Response (실패)
```json
{
  "success": false,
  "error": "Failed to update the item."
}
```

#### 4. 특정 품목 삭제

- HTTP 메서드: DELETE
- 엔드포인트: `/inventory/{product_id}`
- 설명: 특정 품목의 정보를 삭제
- Response (성공)
```json
{
  "success": true,
  "message": "Item with product_id 2 has been deleted successfully."
}
```
- Response (실패)
```json
{
  "success": false,
  "error": "Failed to delete the item."
}
```