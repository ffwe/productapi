// src/database.config.testing.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // 개발환경에서만 사용
  dropSchema: true,
};

export default typeOrmConfig;
