This project is me playing with React in Typescript and Firebase

# Prequisites
Firebase setup, installs for that and installs in 'client dir'

# To deploy
```
npm run deploy
```

Project Console: https://console.firebase.google.com/project/michaeltestingstuff/overview

Hosting URL: https://michaeltestingstuff.firebaseapp.com


# Dev

## Client/Front end
See the readme in the client dir.

## Everything else
TBD. Functions are TS, the rest are config files in JSON.


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

# Steps to repro / Notes
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

TODO: Need to learn how to use mui js styles, only done through scss so far.

Started looking at adding firebase sdk as I only want to support Google Login (so far)
- https://firebase.google.com/docs/web/setup

TODO: look at reserved urls: https://firebase.google.com/docs/hosting/reserved-urls

Created Firebase class as per codedamn video

I got login with Google working.

I need to remember the faff with wrapping
an event emitting function with another function if I want to keep `this`.

So that's 1, 2 and 3. Though I need to update the top bar to show this and ideally have a login button.

eslint not firing on vscode... Fixed: needed an eslint file, which vs code can start for me using a create eslint command

Now I need to go work out how to write proptypes in TS, it's weird to uninstall that...

So interfaces and types are... less fun.

Database:
this.db = app.firestore();
// Codedamn refer to above, firebase docs refer to below:
// https://firebase.google.com/docs/database/rtdb-vs-firestore
this.database = app.database();
// Firestore sounds the superior option and collections seems a bit like MongoDB.

Added Prettier to eslint, it's not complaining yet.
TODO: why isn't prettier complaining? Wait until vscode restart before worrying

Firestore writing worked... so the database rules say no, storage no, ah firestore.rules.

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```
Allow all. Neat. Should fix that.

Ooooh the data updates live on the console
 (which admittedly is a major selling point of both of those databases being able to do that)

Also that kept pushing new documents, it was add so that makes sense.

So want to secure that, can update only that with:
```
// Deploy your .rules file
firebase deploy --only firestore:rules
```

`allow write: if request.auth.uid != null;`... so that's suspiciously easy. Works though.
I'm curious how you restrict certain documents to certain users though. Will look when needed.

> Events for local changes
> Local writes in your app will invoke snapshot listeners immediately.
> This is because of an important feature called "latency compensation." When you perform a write,
> your listeners will be notified with the new data before the data is sent to the backend.
Noice. That definitely helps with user feedback
https://firebase.google.com/docs/firestore/query-data/listen
So yah. that's powerful

So when writing using add({...})
won't allow you to set a specific document id. Using doc('name').set({...}) does.
https://firebase.google.com/docs/firestore/manage-data/add-data does. This seems like UPSERT
OOOooooOOOooooh setWithMerge

Note: "Cloud Firestore always stores numbers as doubles, regardless of what type of number you use in your code."

```
useEffect(() => {
// Update the document title using the browser API
document.title = `You clicked ${count} times`;
}, []);
```
Ooh, so that will only run the once, that's neat. https://css-tricks.com/run-useeffect-only-once/

Data entry:
I went and created the entry in firestore manually as it's a prerequisite for the app.

Awesome, reads and listening works. Now just need to write on click increment and read on the homepage
So that's really neat and easy. That is awesome plus the local update first means that it won't suffer
 from race conditions with really simple code (well, with multiple devices pressing it, it might)

TODO: look at those firebase emulators

Oops, mind and run build `npm run deploy` as that builds the assets

So storage, I want to upload an arbitrary file and ONLY the person who uploaded it can download it.
Or something like that
1. Upload something, need an input and submit and all that, likely on click-increment
2. Restrict access to anything you uploaded, currently auth can do anything.
3. Also restrict upload size to say 5MB or something.

Oooh that image preview is gorgeous, I did not know you could do that.

Typescript... I don't know what the return type is for functional components with props or how
to do a promise one

```
const handleFileInputSelectedGetImageDataUrl: Promise<string> = (file: File) => {
  return new Promise<string>((resolve) => {
```
> Type '(file: File) => Promise<string>' is missing the following properties from type 'Promise<string>': then, catch, [Symbol.toStringTag], finallyts(2739)
index.tsx(3, 65): Did you mean to call this expression?

I did mean to call it, though I want those to be later in my code...

Thankfully it's tolerant enough to just let me delete the return type,
 though I should learn what it wants from me

TODO:
- Really gotta fix the UI showing the login button between logging in and the redirect bouncing back
- keep login state on refresh? login visibility seems a bit... off. Unless the login page is lagging
- I've been really liberal with making functions async
- App bar, I'd like a side drawer, I think, or not bother tbh. Do want to update the title though
- Hide counter until data fetched
- some styling



# My Dev setup
(As this is different from my normal dev laptop, keeping notes)

Note: run vscode on client dir for imports and stuff to work, something else on root. (Pycharm)
Set EOL for vscode to LF, might need to verify git config for that. (bottom bar and in settings)

## Git (on Git Bash)
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa_github

## VS plugins
Import Cost  (disabled, whilst neat, don't care for this project)
Auto Import
eslint (mind and actually make the config)
Firebase (toba) for firestore.rules