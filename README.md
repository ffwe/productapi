# productapi

상품 재고 관리를 위한 REST API 프로젝트입니다. 이 API는 상품 재고의 조회, 추가, 수정, 삭제 기능을 제공합니다.

## 설치 및 실행

1. 레포지토리를 클론합니다: 
   ```
   git clone https://github.com/ffwe/productapi.git
   ```
2. 프로젝트 디렉토리로 이동합니다: 
   ```
   cd productapi
   ```
3. 의존성을 설치합니다: 
   ```
   npm install
   ```
4. 개발 서버를 시작합니다: 
   ```
   npm run start:dev
   ```

## 테스트

프로젝트의 테스트를 실행하려면, 다음 명령어를 실행하십시오: 
```
npm test
```
또한, e2e 테스트를 실행하려면 다음 명령어를 사용하십시오:
```
npm run test:e2e
```

이 프로젝트는 상품 재고 관리에 필요한 기본적인 기능을 갖추고 있습니다. 이 API는 확장성을 고려하여 설계되었으므로, 추가 기능이 필요한 경우 쉽게 확장할 수 있습니다.

## 로컬에서 테스트하기

이 API는 curl을 사용하여 로컬에서 테스트할 수 있습니다. 아래는 예시 명령어입니다:

1. 상품 재고 조회 (GET):
   ```
   curl -X GET http://localhost:3000/inventory
   ```

2. 상품 추가 (POST):
   ```
   curl -X POST http://localhost:3000/inventory -H "Content-Type: application/json" -d '{"product_name": "New Product", "quantity": 100, "unit_price": 5000}'
   ```

3. 상품 수정 (PUT):
   ```
   curl -X PUT http://localhost:3000/inventory/1 -H "Content-Type: application/json" -d '{"quantity": 80, "unit_price": 4500}'
   ```

4. 상품 삭제 (DELETE):
   ```
   curl -X DELETE http://localhost:3000/inventory/1
   ```

위 예시에서 `localhost:3000`은 서버가 실행 중인 주소와 포트입니다. 상황에 맞게 변경하십시오.  
또한
명령 프롬프트에서는 겹따옴표를 이스케이프(`\"`)해야 합니다.  
#### cmd 입력 예시:  
- 상품 추가 (POST):
   ```
   curl -X POST http://localhost:3000/inventory -H "Content-Type: application/json" -d "{\"product_name\": \"New Product\", \"quantity\": 100, \"unit_price\": 5000}"
   ```
- 상품 수정 (PUT):
   ```
   curl -X PUT http://localhost:3000/inventory/1 -H "Content-Type: application/json" -d "{\"quantity\": 80, \"unit_price\": 4500}"
   ```

## 개발 문서

프로젝트에 대한 자세한 내용은 개발 문서를 참조하십시오. [링크](./doc/목차.md)

## 버전 정보

이 프로젝트는 NestJS CLI를 사용하여 생성되었으며 아래의 버전을 사용하여 개발되었습니다:
- typescript ^5.1.3
- NestJS ^10.0.0
- TypeORM ^0.3.19
- SQLite3 ^5.1.7
- pg ^8.11.3
- PostgreSQL 16.1

위의 버전 정보는 프로젝트를 클론하여 직접 실행하거나 수정하려는 경우 참고하시기 바랍니다. 버전이 맞지 않을 경우 예상치 못한 문제가 발생할 수 있습니다.