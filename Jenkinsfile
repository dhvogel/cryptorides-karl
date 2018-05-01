pipeline {
    agent none
    stages {
        // stage('Lint and Unit Test') {
        //     agent {
        //         docker {
        //           image 'node:7-alpine'
        //         }
        //     }
        //     steps {
        //         sh '''
        //           export NODE_ENV=test
        //           npm install
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
        stage('Deploy Image to Dev Environment') {
          agent {
                docker {
                  image 'docker pull rastasheep/ubuntu-sshd'
                }
            }
            steps {
                sh '''
                  RAW_VERSION=$(cat package.json \
                    | grep version \
                    | head -1 \
                    | awk -F: '{ print $2 }' \
                    | sed 's/[",]//g')

                  PACKAGE_VERSION=`echo $RAW_VERSION`

                  sudo su -
                  apt-get update && apt-get install -y awscli

                  aws s3 cp s3://cb-secrets-bucket-042618/cb-karl.pem . --region us-east-1
                  chmod 400 cb-karl.pem
                  ssh-keygen -R hostname
                  ssh -tt -i ./cb-karl.pem ubuntu@54.209.147.227 /bin/bash << EOF
                    sudo su
                    docker ps
                  EOF
                '''
            }
        }
        // stage('Bump patch version') {
        //     agent {
        //         docker { image 'node:7-alpine' }
        //     }
        //     steps {
        //         sh '''
        //           CURRENT_VERSION=$(npm version patch)
        //           apk add --no-cache git
        //           git config --global user.name cbikes-bot
        //           git config --global user.email cbikesbot@gmail.com
        //           git commit package.json -m "bump patch version to $CURRENT_VERSION"
        //           git push https://cbikes-bot:cbikes94@github.com/dhvogel/cryptobikes-karl.git HEAD:master
        //         '''
        //     }
        // }
    }
}
