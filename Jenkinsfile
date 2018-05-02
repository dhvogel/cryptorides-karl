pipeline {
    agent none
    stages {
        stage('Lint and Unit Test') {
            agent {
                docker {
                  image 'node:7-alpine'
                }
            }
            steps {
                sh '''
                  export NODE_ENV=test
                  npm install
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
                  docker login -u cbikesbot -p cbikes94

                  RAW_VERSION=$(cat package.json \
                    | grep version \
                    | head -1 \
                    | awk -F: '{ print $2 }' \
                    | sed 's/[",]//g')

                  PACKAGE_VERSION=`echo $RAW_VERSION`

                  docker build -t dhvogel/cb-karl:$PACKAGE_VERSION .
                  docker push dhvogel/cb-karl:$PACKAGE_VERSION

                  docker tag dhvogel/cb-karl:$PACKAGE_VERSION dhvogel/cb-karl:latest
                  docker push dhvogel/cb-karl:latest
                '''
            }
        }
        stage('Deploy Image to Dev Environment') {
          agent {
                docker {
                  image 'ljfranklin/terraform-resource:0.11.7'
                }
            }
            steps {
                sh '''
                  rm -rf cb-infrastructure
                  git clone https://cbikes-bot:cbikes94@github.com/dhvogel/cb-infrastructure.git
                  cd cb-infrastructure/cb-karl-instance
                  terraform init
                  terraform destroy -auto-approve
                  terraform apply -auto-approve
                  terraform show
                '''
            }
        }
        stage('Bump patch version') {
            agent {
                docker { image 'node:7-alpine' }
            }
            steps {
                sh '''
                  CURRENT_VERSION=$(npm version patch)
                  apk add --no-cache git
                  git config --global user.name cbikes-bot
                  git config --global user.email cbikesbot@gmail.com
                  git commit package.json -m "bump patch version to $CURRENT_VERSION"
                  git push https://cbikes-bot:cbikes94@github.com/dhvogel/cryptobikes-karl.git HEAD:master
                '''
            }
        }
    }
}
