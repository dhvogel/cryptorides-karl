pipeline {

    stages {
        stage('Lint and Unit Test') {
            agent {
                docker { image 'node:7-alpine' }
            }
            steps {
                sh '''
                  npm run lint
                  npm test
                '''
            }
        }
        stage('Build into Docker Image') {
            agent {
                docker { image 'docker:17.09.1-ce' }
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
