import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_ec2 as ec2, aws_ecs as ecs, aws_ecs_patterns as ecsPatterns, RemovalPolicy } from 'aws-cdk-lib';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Repository } from 'aws-cdk-lib/aws-ecr';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import * as logs from 'aws-cdk-lib/aws-logs';
import { SubnetType } from 'aws-cdk-lib/aws-ec2';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as iam from 'aws-cdk-lib/aws-iam';
import {
  projectName,
  env,
  prefix,
  appName,
  imageTag,
} from '../bin/cash_deposits_deploy';

interface CashDepositsDeployStackProps extends cdk.StackProps {
  containerName: string;
  cpu: number;
  memory: number;
  containerPort: number;
  vpcName: string;
  clusterName: string;
  repositoryName: string;
  albArn: string;
  listenerArn: string;
  logGroupName: string;
}



export class CashDepositsDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CashDepositsDeployStackProps) {
    super(scope, id, props);
      const vpc = ec2.Vpc.fromLookup(this, 'VPC', { vpcName: props.vpcName });

      const cluster = ecs.Cluster.fromClusterAttributes(
        this, `${env}-${prefix}-${appName}-cluster`, 
        {
        vpc: vpc,
        clusterName: props.clusterName,
        securityGroups: [],
        }
      );

      const image = ecs.ContainerImage.fromEcrRepository(
        Repository.fromRepositoryName(this, `${env}-${prefix}-${appName}-repo`, props.repositoryName),
        imageTag,
      );

      // Create the log driver with the fixed log group name
      const logDriver = ecs.LogDrivers.awsLogs({
        streamPrefix: `${env}-${prefix}-${appName}`,
        logGroup: new logs.LogGroup(this, props.logGroupName, {
          logGroupName: props.logGroupName,
          removalPolicy: RemovalPolicy.DESTROY,
          retention: logs.RetentionDays.ONE_MONTH,
        }),
      });

      const taskDefinition_cashdeposits = new ecs.FargateTaskDefinition(this, `${prefix}-${appName}-${env}-taskdef`, {
        memoryLimitMiB: props.memory,
        cpu: props.cpu,
      });    //  task definition for SPA


      const containerPort = props.containerPort;

      const container = taskDefinition_cashdeposits.addContainer(`${prefix}-${appName}-${env}`, {
        image: image,
        containerName: props.containerName,
        portMappings: [{ containerPort }],
        logging: logDriver,
      });

    //   const certificateArnSecret = secretsmanager.Secret.fromSecretNameV2(
    //     this,
    //     `${environment}-${prefix}-${appName}-secretcert`,
    //     `${environment}/infra/certificate`,
    //   );

    // // const certificateArn = certificateArnSecret.secretValueFromJson('arn').toString();
    //   const certificate = Certificate.fromCertificateArn(
    //     this,
    //     `${prefix}-cert`,
    //     certificateArnSecret.secretValueFromJson('arn').unsafeUnwrap(),
    //   );

    // // Define an array of KMS key aliases to look up
    //   const kmsAliases = [
    //     `alias/${projectName}-${environment}-secret-key`,
    //     `alias/${projectName}-${environment}-ecr-key`,
    //     `alias/${projectName}-${environment}-ecs-key`,
    //   ];

    //   const kmsKeys = kmsAliases.map(alias =>
    //     kms.Key.fromLookup(this, `${alias}-lookup`, {
    //       aliasName: alias,
    //     }),
    //   );

    //   for (const key of kmsKeys) {
    //     taskDefinition_textpay.addToTaskRolePolicy(
    //       new iam.PolicyStatement({
    //         effect: iam.Effect.ALLOW,
    //         actions: ['kms:Decrypt'],
    //         resources: [key.keyArn],
    //       }),
    //     );
    //   }

    // ============================= New Service with Single ALB START =============================

      const alb = elbv2.ApplicationLoadBalancer.fromLookup(this, 'ALB', {
        loadBalancerArn: props.albArn,
      });

      const targetGroup = new elbv2.ApplicationTargetGroup(this, 'TargetGroup', {
        vpc: vpc,
        protocol: elbv2.ApplicationProtocol.HTTP,
        port: 80,
        targetType: elbv2.TargetType.IP,
        targetGroupName: `${prefix}-${appName}-${env}`,
        healthCheck: {
          path: '/',
          healthyHttpCodes: '200,301,302',
        },
      });

      const new_uiService = new ecs.FargateService(this, `${prefix}-${appName}-${props.containerName}`, {
        cluster: cluster,
        assignPublicIp: true,
        desiredCount: 1,
        vpcSubnets: {
          subnetType: SubnetType.PUBLIC,
        },
        taskDefinition: taskDefinition_cashdeposits,
        serviceName: `${props.containerName}`,
        enableExecuteCommand: true,
        circuitBreaker: { rollback: true },
      });

      targetGroup.addTarget(
        new_uiService.loadBalancerTarget({
          containerName: props.containerName,
          containerPort: containerPort,
        }),
      );

      const listener = elbv2.ApplicationListener.fromLookup(this, 'ExistingListener', {
        listenerArn: props.listenerArn,
      });
      
      listener.addTargetGroups(`${prefix}-${appName}-${env}-listener-target-group`, {
        targetGroups: [targetGroup],
      });


    // ============================= New Service with Single ALB END =============================
  }
}