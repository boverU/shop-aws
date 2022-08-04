import type { AWS } from '@serverless/typescript';

import { importProductsFile } from '@functions/index'

const serverlessConfiguration: AWS = {
  service: 'import-service',
  useDotenv: true,
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-dotenv-plugin', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      BUCKET_NAME: process.env.BUCKET_NAME,
      BUCKET_REGION: process.env.BUCKET_REGION
    },
    stage: 'dev',
    region: "eu-west-1",
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          'arn:aws:s3:::${env:BUCKET_NAME}'
        ]
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          'arn:aws:s3:::${env:BUCKET_NAME}/*'
        ]
      },
    ]
  },
  // import the function via paths
  functions: { importProductsFile },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
