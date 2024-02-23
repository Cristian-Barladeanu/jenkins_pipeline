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
    }

   post {
    always {
        script {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                reportTitles: 'Playwright Test Report'
            ])
            archiveArtifacts artifacts: 'playwright-report/*', followSymlinks: false
        }
    emailext subject: 'Playwright Test Results',
              body: 'Check the attached Playwright HTML report for test results.',
              to: 'cbarladeanu@griddynamics.com',
              attachmentsPattern: 'playwright-report/*'
}
}
}