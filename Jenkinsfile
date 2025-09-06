pipeline {
    agent any

    stages {
        stage('Checkout Backend') {
            steps {
                git branch: 'main', url: 'https://github.com/Vaishu0805/ecommerce-backend.git'
            }
        }

        stage('Checkout Frontend') {
            steps {
                dir('frontend') {
                    git branch: 'main', url: 'https://github.com/Vaishu0805/ecommerce-frontend.git'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Copy Frontend to Backend') {
            steps {
                sh '''
                  rm -rf src/main/resources/static/* || true
                  cp -r frontend/dist/* src/main/resources/static/
                '''
            }
        }

        stage('Build Backend') {
            steps {
                sh './mvnw clean package -DskipTests'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  # Kill any old process on port 9090
                  if lsof -ti:9090; then
                    kill -9 $(lsof -ti:9090)
                  fi

                  # Run the new JAR
                  JAR=$(ls target/*.jar | head -n1)
                  nohup java -jar $JAR --server.port=9090 --server.servlet.context-path=/ecommerce > app.log 2>&1 &
                  echo "Started backend with frontend static files!"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ App is live at http://<jenkins-host>:9090/ecommerce'
        }
        failure {
            echo '❌ Build failed. Check console output.'
        }
    }
}
