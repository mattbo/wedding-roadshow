## How to deploy

In this directory, do
`gatsby build`

Then move to the firebase directory
`cd ../wedding-firebase`

Copy the public directory over
`cp -a ../wedding-gatsby/public .`

Deploy to firebase 
`firebase deploy`
or
`firebase deploy --only hosting`
