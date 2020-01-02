This project is me playing with React in Typescript and Firebase

# Prequisites
Firebase setup, installs for that and installs in 'client dir'

# To deploy
```
cd client && npm run build && cd ..
```

```
firebase deploy
```

(TODO: top level command for that+other stuff?)

Project Console: https://console.firebase.google.com/project/michaeltestingstuff/overview

Hosting URL: https://michaeltestingstuff.firebaseapp.com


# Plan:
1. Basic hosting through firebase built from typescript project.
1. Add Mui
1. Ability for user to log in with a Google account. (not planning to do user and password)
1. When logged in user can click a button which will increment a counter in the FireStore
1. On the homepage a there exists some text which displays the amount of clicks
    1. When clicked when logged in should update this using real time messaging

Something with functions and storage.

Storage:
- Set your avatar?

TODO: find out what the service worker file is used for, not used it before, seems like it will speed up the non-route urls and bounce them back to index.html

# Steps to repro
(that I remember)

Firebase stuff, see console for install, I ticked all the boxes
```
firebase login
firebase init
```

Deploy
```
firebase deploy
```
Requires setting location for resources (eur3 - europe west), setting up FireCloud and FireStore.

Creating front end code
```
create-react-app client --template typescript
```

After this I made the top level package.json.
I changed the hosting location in the firebase.json to:
```
  "hosting": {
    "public": "./client/build",
```
rather than copying it about.

TODO: remove top level public dir. Keeping for sdk reference, though will be doing in react and tsx

Starting watching "Firebase + React HOOKS authentication tutorial" - codedamn

Added Mui, react-router-dom.
Minor deviations, added 'components' and 'pages' folders

# My Dev setup
(As this is different from my normal dev laptop, keeping notes)

Note: vscode on client dir for imports and stuff to work, something else on root.

## Git (on Git Bash)
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa_github

## VS plugins
Import Cost  (disabled, whilst neat, don't care for this project)
Auto Import