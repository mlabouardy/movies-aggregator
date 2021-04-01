def imageName = "mlabouardy/movies-aggregator"
def registry = "ID.dkr.ecr.eu-central-1.amazonaws.com/mlabouardy/movies-aggregator"
def region = "eu-central-1"

node('workers'){
    stage('Checkout'){
        checkout scm 
        notifySlack('STARTED')
    }

    stage('Quality Tests'){
        docker.build("${imageName}-test", "-f Dockerfile.test .")
        sh "docker run --rm ${imageName}-test npm run lint"
    }

    stage('Unit Tests'){
        sh "docker run --rm ${imageName}-test npm run test"
        publishHTML (target : [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: "$PWD/coverage/lcov-report/",
            reportFiles: 'index.html',
            reportName: 'Coverage report',
        ])
    }

    stage('Static Code Analysis'){
        withSonarQubeEnv('sonarqube'){
            sh 'sonar-scanner'
        }
    }

    stage('Build'){
        docker.build(imageName)
    }

    stage('Push'){
        sh "\$(aws ecr get-login --no-include-email --region ${region}) || true"
        docker.withRegistry("https://${registry}"){
            docker.image(imageName).push(commitID())
        }
    }

    stage('Deploy'){
        docker.build("${imageName}-release", "-f Dockerfile.release .")
    }
}

def notifySlack(String buildStatus) {
    buildStatus =  buildStatus ?: 'SUCCESSFUL'
    def colorCode = '#FF0000'
    def subject = "Name: '${env.JOB_NAME}'\nStatus: ${buildStatus}\nBuild ID: ${env.BUILD_NUMBER}"
    def summary = "${subject}\nMessage: ${commitMessage()}\nAuthor: ${commitAuthor()}\nURL: ${env.BUILD_URL}"

    if (buildStatus == 'STARTED') {
        colorCode = '#546e7a'
    } else if (buildStatus == 'SUCCESSFUL') {
        colorCode = '#2e7d32'
    } else {
        colorCode = '#c62828c'
    }

    slackSend (color: colorCode, message: summary)
}

def commitAuthor() {
    sh 'git show -s --pretty=%an > .git/commitAuthor'
    def commitAuthor = readFile('.git/commitAuthor').trim()
    sh 'rm .git/commitAuthor'
    commitAuthor
}

def commitID() {
    sh 'git rev-parse HEAD > .git/commitID'
    def commitID = readFile('.git/commitID').trim()
    sh 'rm .git/commitID'
    commitID
}

def commitMessage() {
    sh 'git log --format=%B -n 1 HEAD > .git/commitMessage'
    def commitMessage = readFile('.git/commitMessage').trim()
    sh 'rm .git/commitMessage'
    commitMessage
}
