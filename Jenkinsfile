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
                    ls -lh
                    '''
                }
            }
        }
        stage('Archive artifacts') {
            steps {
                script {
                    archiveArtifacts artifacts: 'playwright-report/*', followSymlinks: false
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