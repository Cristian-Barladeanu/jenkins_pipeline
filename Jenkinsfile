pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'Node 20.11.0'
        PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Install dependencies') {
            steps {
                script {
                    sh ''' 
                    npm install
                    '''
                }
            }
        }

        stage('Run tests') {
            steps {
                script {
                    sh ''' 
                    npm run test
                    '''
                }
            }
        }

        stage('Copy Playwright HTML Report') {
            steps {
                script {
                    sh '''
                        mkdir -p $WORKSPACE/playwright-report-pipeline
                        cp -R /Users/cbarladeanu/Documents/ci_cd_task/playwright-report/* $WORKSPACE/playwright-report-pipeline/
                    '''
                }
            }
        }

        stage('Get credentials for mail sending') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'GMAIL_APP_PASSWORD', variable: 'GMAIL_APP_PASSWORD')]) {
                        sh "export GMAIL_APP_PASSWORD=\$GMAIL_APP_PASSWORD"
                    }
                }
            }
        }
    }

    post {
        always {
            emailext subject: 'Playwright Test Results',
                      body: 'Check the attached Playwright HTML report for test results.',
                      to: 'cbarladeanu@griddynamics.com',
                      attachmentsPattern: '**/playwright-report-pipeline/index.html'
        }
    }
}