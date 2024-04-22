# QRdine

![Thubnail](https://repository-images.githubusercontent.com/772110619/71a51723-7ac9-4cbf-8d62-4dc90873b0af)

A full-stack web app representing a digital menu and ordering system for hotels/restaurants

Demo: [https://youtu.be/Xvbz-NCsAOQ](https://youtu.be/Xvbz-NCsAOQ)

## Commands to run this application on your machine:
```bash
# clone the ripo
git clone git@github.com:tarunregmi/qrdine.git

# install dependencies
npm i

# host this application on your local machine only (localhost)
npm run pb                # start backend
ng serve                  # start frontend

# host this application on your local network (using IPv4)
npm run pb:host           # start backend
npm run ng:host           # start frontend. (you must have python v3 installed on your linux os to execute this command)

ng serve --host=0.0.0.0   # run this if 'npm run ng:host' command not work
```

**Note**: The `backend` folder that contains the entire backend with the Pocketbase binary has not been made public yet, so you cannot run this project until you have the `backend`.

**Update**: The entire `backend` is public now. Now you can easily run the entire application using above commands.
