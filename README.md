# QRdine

Commands to run this application on your machine:
```bash
# clone the ripo
git clone git@git.bajratechnologies.com:tarunregmi/qrdine.git


# install dependencies
npm i


# host this application on your local machine only (localhost)
npm run pb          # start backend
ng serve            # start frontend


# host this application on your local network (using IPv4)
# 
npm run pb:host     # start backend
npm run ng:host     # start frontend. (you must have python v3 installed on your linux os to execute this command)

ng serve --host=0.0.0.0   # run this if 'npm run ng:host' command not work
```

**Note**: The `backend` folder that contains the entire backend with the Pocketbase binary has not been made public yet, so you cannot run this project until you have the `backend`.
