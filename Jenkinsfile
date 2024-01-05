pipeline {
    agent any
    environment{
        DOCKERHUB_CREDENCIALS = credentials ('dockerhub')
        RepoDockerHub = 'edgar4all'
        NameContainer = 'react-todo-list'
    }

    stages {
        stage('Lint Dockerfile') {
            steps {
                script {
                    def result = sh(script: "hadolint Dockerfile", returnStatus: true)
                    if (result != 0) {
                        error("hadolint failed with exit code ${result}")
                    }
                }
            }
        }

        stage('Build'){
            steps{
                sh "docker build -t ${env.RepoDockerHub}/${env.NameContainer}:${env.BUILD_NUMBER} ."
            }
        }

        stage('Login to Dockerhub'){
            steps{
                sh "echo $DOCKERHUB_CREDENCIALS_PSW | docker login -u $DOCKERHUB_CREDENCIALS_USR --password-stdin "
            }
        }

        stage('Push image to Dockerhub'){
            steps{
                sh "docker push ${env.RepoDockerHub}/${env.NameContainer}:${env.BUILD_NUMBER} "
            }
        }
        
        stage('Deploy container'){
            steps{
                sh "if [ 'docker stop ${env.NameContainer}' ] ; then docker rm -f ${env.NameContainer} && docker run -d --name ${env.NameContainer} -p 3000:3000 ${env.RepoDockerHub}/${env.NameContainer}:${env.BUILD_NUMBER} ; else docker run -d --name ${env.NameContainer} -p 3000:3000 ${env.RepoDockerHub}/${env.NameContainer}:${env.BUILD_NUMBER} ; fi"
            }
        }
        
        stage('Docker logout'){
            steps{
                sh "docker logout"
            }
        }

        
    }
}
