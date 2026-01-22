"# CounterWatch"



# Install dotnet server

sudo add-apt-repository ppa:dotnet/backports

sudo apt-get update \&\&   
sudo apt-get install -y dotnet-sdk-10.0

# Run server command

dotnet dev-certs https --clean
dotnet dev-certs https -ep /certs/counterwatch.pfx -p StrongPassword123
dotnet dev-certs https --trust

\#docker image
git clone https://github.com/Vocaquill/CounterWatch.git
cd CounterWatch
cd CounterWatchApi
cd CounterWatchApi/

docker build -t counterwatch-api .
docker run -d --restart=always --name counterwatch\_container -p 4790:8080 counterwatch-api
docker run -d --restart=always -v /certs:/https -e ASPNETCORE\_Kestrel\_\_Certificates\_\_Default\_\_Password=StrongPassword123 --name counterwatch\_container -p 4790:8080 counterwatch-api



# All server commands

1  sudo nano /etc/ssh/sshd\_config

&nbsp;   2  PermitRootLogin yes

&nbsp;   3  sudo service ssh restart

&nbsp;   4  nano ~/.ssh/authorized\_keys

&nbsp;   5  systemctl restart ssh

&nbsp;   6  sudo apt update

&nbsp;   7  sudo apt install apt-transport-https ca-certificates curl software-properties-common

&nbsp;   8  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

&nbsp;   9  echo "deb \[signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb\_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

&nbsp;  10  sudo apt update

&nbsp;  11  sudo apt install docker-ce

&nbsp;  12  sudo systemctl start docker

&nbsp;  13  sudo systemctl enable docker

&nbsp;  14  sudo systemctl status docker

&nbsp;  15  sudo usermod -aG docker $USER

&nbsp;  16  docker --version

&nbsp;  17  mkdir CounterWatch

&nbsp;  18  cd CounterWatch

&nbsp;  19  docker-compose pull

&nbsp;  20  docker compose pull

&nbsp;  21  docker compose up -d

&nbsp;  22  docker ps -a

&nbsp;  23  curl ifconfig.me

&nbsp;  24  docker-compose down --volumes --rmi all

&nbsp;  25  cd CounterWatch

&nbsp;  26  docker-compose down --volumes --rmi all

&nbsp;  27  docker compose down --volumes --rmi all

&nbsp;  28  docker system prune -af

&nbsp;  29  docker compose up -d

&nbsp;  30  docker pas -a

&nbsp;  31  docker ps -a

&nbsp;  32  docker logs -f counterwatch-api

&nbsp;  33  docker compose down --volumes --rmi all

&nbsp;  34  docker system prune -af

&nbsp;  35  docker compose up -d

&nbsp;  36  docker logs -f counterwatch-api

&nbsp;  37  docker compose down --volumes --rmi all

&nbsp;  38  docker system prune -af

&nbsp;  39  cd CounterWatch

&nbsp;  40  docker compose up -d

&nbsp;  41  docker compose down --volumes --rmi all

&nbsp;  42  docker system prune -af

&nbsp;  43  docker compose down --volumes --rmi all

&nbsp;  44  docker system prune -af

&nbsp;  45  docker compose pull

&nbsp;  46  docker compose up -d

&nbsp;  47  docker compose down --volumes --rmi all

&nbsp;  48  docker system prune -af

&nbsp;  49  docker compose pull

&nbsp;  50  docker compose up -d

&nbsp;  51  ls

&nbsp;  52  cd ..

&nbsp;  53  ls

&nbsp;  54  cd ubuntu/

&nbsp;  55  ls -a

&nbsp;  56  history

&nbsp;  57  exit

&nbsp;  58  docker compose down --volumes --rmi all

&nbsp;  59  docker system prune -af

&nbsp;  60  cd CounterWatch

&nbsp;  61  docker compose down --volumes --rmi all

&nbsp;  62  docker compose up -d

&nbsp;  63  docker ps -a

&nbsp;  64  docker logs counterwatch-api

&nbsp;  65  docker compose down --volumes --rmi all

&nbsp;  66  docker system prune -af

&nbsp;  67  docker compose up -d

&nbsp;  68  docker compose down --volumes --rmi all

&nbsp;  69  docker compose up -d

&nbsp;  70  docker compose down --volumes --rmi all

&nbsp;  71  docker system prune -af

&nbsp;  72  docker compose up -d

&nbsp;  73  docker compose down --volumes --rmi all

&nbsp;  74  docker system prune -af

&nbsp;  75  docker compose up -d

&nbsp;  76  docker-compose pull

&nbsp;  77  docker compose pull

&nbsp;  78  docker compose up -d

&nbsp;  79  docker compose pull

&nbsp;  80  docker compose up -d

&nbsp;  81  docker compose pull

&nbsp;  82  docker compose up -d

&nbsp;  83  docker ps -a

&nbsp;  84  docker compose pull

&nbsp;  85  docker compose up -d

&nbsp;  86  docker ps -a

&nbsp;  87  docker compose pull

&nbsp;  88  docker compose up -d

&nbsp;  89  docker compose pull

&nbsp;  90  docker compose up -d

&nbsp;  91  docker ps -a

&nbsp;  92  docker stop df

&nbsp;  93  docker ps -a

&nbsp;  94  docker compose up -d

&nbsp;  95  docker ps -a

&nbsp;  96  docker compose down --volumes --rmi all

&nbsp;  97  docker ps -a

&nbsp;  98  docker rm df

&nbsp;  99  docker ps -a

&nbsp; 100  docker compose pull

&nbsp; 101  docker compose up -d

&nbsp; 102  docker compose down --volumes --rmi all

&nbsp; 103  docker compose pull

&nbsp; 104  docker compose up -d

&nbsp; 105  cd CounterWatch

&nbsp; 106  docker compose down --volumes --rmi all

&nbsp; 107  sudo apt update

&nbsp; 108  sudo apt install -y nginx

&nbsp; 109  systemctl status nginx

&nbsp; 110  sudo systemctl enable nginx

&nbsp; 111  sudo systemctl reload nginx

&nbsp; 112  systemctl status nginx

&nbsp; 113  docker ps -a

&nbsp; 114  docker compose pull

&nbsp; 115  docker compose up -d

&nbsp; 116  docker ps -a

&nbsp; 117  sudo systemctl reload nginx

&nbsp; 118  apt-get update

&nbsp; 119  apt-get install snapd

&nbsp; 120  snap --version

&nbsp; 121  sudo snap install --classic certbot

&nbsp; 122  certbot

&nbsp; 123  sudo systemctl reload nginx

&nbsp; 124  docker compose down --volumes --rmi all

&nbsp; 125  docker compose pull

&nbsp; 126  docker compose up -d

&nbsp; 127  docker compose down --volumes --rmi all

&nbsp; 128  docker compose pull

&nbsp; 129  docker compose up -d

&nbsp; 130  docker compose down --volumes --rmi all

&nbsp; 131  docker compose pull4

&nbsp; 132  docker compose pull

&nbsp; 133  docker compose up -d

&nbsp; 134  docker compose down --volumes --rmi all

&nbsp; 135  cd CounterWatch

&nbsp; 136  docker compose down --volumes --rmi all

&nbsp; 137  docker compose pull

&nbsp; 138  docker compose up -d

&nbsp; 139  sudo systemctl reload nginx

&nbsp; 140  docker compose down --volumes --rmi all

&nbsp; 141  docker compose pull

&nbsp; 142  docker compose up -d

&nbsp; 143  docker compose down --volumes --rmi all

&nbsp; 144  docker compose pull

&nbsp; 145  docker compose up -d

&nbsp; 146  sudo systemctl reload nginx

&nbsp; 147  docker compose down --volumes --rmi all

&nbsp; 148  docker system prune -af

&nbsp; 149  docker compose pull

&nbsp; 150  docker compose up -d

&nbsp; 151  sudo systemctl reload nginx

&nbsp; 152  docker compose down --volumes --rmi all

&nbsp; 153  docker system prune -af

&nbsp; 154  docker compose pull

&nbsp; 155  docker compose up -d

&nbsp; 156  sudo systemctl reload nginx

&nbsp; 157  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 158  docker compose down --volumes --rmi all

&nbsp; 159  docker system prune -af

&nbsp; 160  docker compose pull

&nbsp; 161  docker pa -a

&nbsp; 162  docker ps -a

&nbsp; 163  docker compose up -d

&nbsp; 164  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 165  cerbot

&nbsp; 166  certbot

&nbsp; 167  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 168  docker ps -a

&nbsp; 169  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 170  docker compose down --volumes --rmi all

&nbsp; 171  docker system prune -af

&nbsp; 172  docker compose pull

&nbsp; 173  docker compose up -d

&nbsp; 174  docker ps -a

&nbsp; 175  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 176  docker compose down --volumes --rmi all

&nbsp; 177  docker compose pull

&nbsp; 178  docker compose up -d

&nbsp; 179  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 180  docker compose down --volumes --rmi all

&nbsp; 181  docker system prune -af

&nbsp; 182  docker compose pull

&nbsp; 183  docker compose up -d

&nbsp; 184  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 185  certbot

&nbsp; 186  docker compose down --volumes --rmi all

&nbsp; 187  docker system prune -af

&nbsp; 188  docker compose pull

&nbsp; 189  docker compose up -d

&nbsp; 190  sudo nginx -t \&\& sudo systemctl reload nginx

&nbsp; 191  cd CounterWatch

&nbsp; 192  history



