pipeline {
    agent {
        docker { image 'node:7-alpine' }
    }
    stages {
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
