pipeline {
    agent any

    environment {
        NVM_DIR = "$HOME/.nvm"
        NODE_VERSION = '18.17.0'
        PLAYWRIGHT_WORKSPACE = "${WORKSPACE}/path/to/project"
    }

    stages {
        stage('Install node') {
            steps {
                script {
                    sh '''
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
                        nvm install ${NODE_VERSION}
                        nvm use ${NODE_VERSION}
                    '''
                }
            }
        }

        stage('Install npm') {
            steps {
                script {
                    sh '''
                        npm install -g npm@latest
                    '''
                }
            }
        }

        stage('Install Playwright') {
            steps {
                script {
                    dir("${PLAYWRIGHT_WORKSPACE}") {
                        sh '''
                            npm install -D @playwright/test
                            npx playwright install
                        '''
                    }
                }
            }
        }

        stage('Run tests') {
            steps {
                script {
                    dir("${PLAYWRIGHT_WORKSPACE}") {
                        sh "npx playwright test"
                    }
                }
            }
        }

        stage('Copy Playwright HTML Report') {
            steps {
                script {
                    dir("${PLAYWRIGHT_WORKSPACE}") {
                        sh '''
                            mkdir -p ${WORKSPACE}/playwright-report-pipeline
                            cp -R playwright-report/* ${WORKSPACE}/playwright-report-pipeline/
                        '''
                    }
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
                      attachmentsPattern: '$WORKSPACE/playwright-report-pipeline/**/*.html'
        }
    }
}
