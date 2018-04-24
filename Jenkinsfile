pipeline {
    agent none
    stages {
        // stage('Lint and Unit Test') {
        //     agent {
        //         docker { image 'node:7-alpine' }
        //     }
        //     steps {
        //         sh '''
        //           npm run lint
        //           npm test
        //         '''
        //     }
        // }
        // stage('Build into Docker Image') {
        //     agent {
        //         docker { image 'docker:17.09.1-ce' }
        //     }
        //     steps {
        //         sh '''
        //           docker login -u cbikesbot -p cbikes94
        //
        //           RAW_VERSION=$(cat package.json \
        //             | grep version \
        //             | head -1 \
        //             | awk -F: '{ print $2 }' \
        //             | sed 's/[",]//g')
        //
        //           PACKAGE_VERSION=`echo $RAW_VERSION`
        //
        //           docker build -t dhvogel/cb-karl:$PACKAGE_VERSION .
        //           docker push dhvogel/cb-karl:$PACKAGE_VERSION
        //         '''
        //     }
        // }
        stage('Bump patch version') {
            agent {
                docker { image 'node:7-alpine' }
            }
            steps {
                sh '''
                  npm version patch
                  apk add --no-cache git
                  git commit package.json -m 'bump patch version'
                '''
            }
        }
    }
}
