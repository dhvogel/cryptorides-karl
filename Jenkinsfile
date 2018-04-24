pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }
    stages {
        stage('Test') {
            steps {
               sh 'node -v'
               sh 'npm prune'
               sh 'npm install'
               sh 'npm test'
            }
        }
    }
}
