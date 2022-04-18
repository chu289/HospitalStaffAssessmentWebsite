set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/chu289/HospitalStaffAssessmentWebsit_v1.git master:gh-pages

cd -