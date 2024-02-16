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
        stage('Publish HTML tests report') {
            steps {
                script {
                    def htmlReportDir = "${env.WORKSPACE}/playwright-report"

            sh "ls -R ${htmlReportDir}"
            
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: htmlReportDir,
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
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