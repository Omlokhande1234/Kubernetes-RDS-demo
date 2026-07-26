pipeline {
    agent any

    environment {
        AWS_REGION   = "ap-south-1"
        ECR_REPO     = "962415228964.dkr.ecr.ap-south-1.amazonaws.com/student-attendance-dev-application"
        CLUSTER_NAME = "student-attendance-dev-cluster"
        NAMESPACE    = "student-attendance"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('ECR Login') {
            steps {
                sh """
                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login --username AWS --password-stdin ${ECR_REPO}
                """
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('student-registry-backend') {
                    sh "docker build -t ${ECR_REPO}:backend-v1 ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('student-registry-frontend') {
                    sh "docker build -t ${ECR_REPO}:frontend-v1 ."
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh """
                    docker push ${ECR_REPO}:backend-v1
                    docker push ${ECR_REPO}:frontend-v1
                """
            }
        }

        stage('Update Kubeconfig') {
            steps {
                sh "aws eks update-kubeconfig --name ${CLUSTER_NAME} --region ${AWS_REGION}"
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh """
                    kubectl rollout restart deployment/backend -n ${NAMESPACE}
                    kubectl rollout restart deployment/frontend -n ${NAMESPACE}
                """
            }
        }

        stage('Verify Rollout') {
            steps {
                sh """
                    kubectl rollout status deployment/backend -n ${NAMESPACE} --timeout=180s
                    kubectl rollout status deployment/frontend -n ${NAMESPACE} --timeout=180s
                """
            }
        }
    }

    post {
        success {
            echo "Deployment succeeded — backend-v1 and frontend-v1 redeployed."
        }
        failure {
            echo "Pipeline failed — check console output above for the failing stage."
        }
        always {
            sh "docker system prune -f || true"
        }
    }
}