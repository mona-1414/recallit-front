python aws-login.py kid

del /s /q build

yarn build

aws s3 --profile kid --region us-east-1 sync build/ s3://recalllit-frontend/