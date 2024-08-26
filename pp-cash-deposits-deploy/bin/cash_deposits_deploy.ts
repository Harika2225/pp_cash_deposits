#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CashDepositsDeployStack } from "../lib/cash_deposits_deploy-stack";

const app = new cdk.App();

// get context from cdk.json
export const env = app.node.tryGetContext("env");
export const envConfig = app.node.tryGetContext(env);
export const projectName = app.node.tryGetContext("projectName") || "pp";
export const prefix = app.node.tryGetContext("prefix");
export const appName = app.node.tryGetContext("appName");
export const ui = app.node.tryGetContext("ui");
export const imageTag = process.env.IMAGE_TAG || `${env}`;

if (!envConfig) {
  throw new Error(`Context configuration for environment '${env}' is missing.`);
}

export const vpcName = `${prefix}-${env}`;
export const clusterName = `${prefix}-${appName}-${env}`;
export const repositoryName = `${prefix}-${appName}-${env}`;
export const loadBalancerName = `${prefix}-${appName}-${env}-lb`;
export const logGroupName = `${prefix}/${appName}/${env}`;

const cashdepositsdeploystack = new CashDepositsDeployStack(
  app,
  `${prefix}-${env}-${appName}-DeployStack`,
  {
    stackName: `${prefix}-${env}-${appName}-DeployStack`,
    containerName: envConfig.containerName,
    cpu: envConfig.cpu,
    memory: envConfig.memory,
    containerPort: envConfig.containerPort,
    vpcName: vpcName,
    clusterName: clusterName,
    repositoryName: repositoryName,
    albArn: envConfig.albArn,
    listenerArn: envConfig.listenerArn,
    logGroupName: logGroupName,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  }
);
