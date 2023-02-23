echo "---------- INSTALLING NANO ----------"
sudo yum install nano -y

echo "---------- INSTALLING EKSCTL ----------"
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version


echo "---------- INSTALLING HELM ----------"
export VERIFY_CHECKSUM=false
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash