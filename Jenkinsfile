pipeline {
    agent any

    stages {
        stage('NPM install') {
            steps {
                sh 'npm install'
            }
        }

        stage('NPM audit') {
            steps {
                sh 'npm audit'
            }
        }

        stage('Integration tests') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Build images') {
            steps {
                sh 'docker build -t vidraxmax/vidra-app-test:$BUILD_NUMBER .'
                sh 'docker tag vidraxmax/vidra-app-test:$BUILD_NUMBER vidraxmax/vidra-app-test:latest'
            }
        }

        stage('Push images to repo') {
            steps {
                script {
                      // Prompt for input approval
                      input('Confirm image push')
                }
                withCredentials([usernamePassword(credentialsId: '6403727c-8bb9-43ff-8ef2-cd786e9300a7', passwordVariable: 'pass', usernameVariable: 'usr')]) {
                    sh """docker login -u $usr --password $pass
                       docker push vidraxmax/vidra-app-test:$BUILD_NUMBER
                       docker push vidraxmax/vidra-app-test:latest"""
                }
            }
        }

        stage('Deploy in render using curl') {
            steps {
                script {
                      // Prompt for input approval
                      input('Confirm deploy')
                }
                sh 'curl "https://api.render.com/deploy/srv-co5ds8mv3ddc738vbmlg?key=PVVHRLSKtjg"'
            }
        }
    }
}