# midas-panel

## Ref link
Friendychat Source code:
https://github.com/firebase/friendlychat-web/tree/master/web


## Setup firebase
1. install firebase command tool by npm
`npm -g install firebase-tools`
`firebase --version` - to comfirm your version & 

installation

2. setup firebase on your project
###Frist time install
Go to your project directory then use command:
`firebase login` - login to your firebase acount
`firebase init` - generate a firebase.json
`firebase use --add` - set your project alias
`firebase serve` - start hosting

###Reopen project
Go to your project directory then use command:
`firebase use <alias>`
`firebase serve` - start hosting

**Error: An unexpected error has occurred.
Please find file `firebase-debug` in your project folder.
