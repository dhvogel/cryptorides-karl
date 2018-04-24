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
        stage('Build into Docker Image') {
            agent {
                docker { image 'docker:18.04' }
            }
            steps {
                sh '''
                  version=$(node -e "console.log(require('./package.json').version);")
                  docker build -t dhvogel/cb-karl:$version .
                  docker push dhvogel/cb-karl:$version
                '''
            }
        }
        stage('Bump patch version') {
            steps {
                sh '''
                  npm version patch
                '''
            }
        }
    }
}
