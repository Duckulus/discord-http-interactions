# Setup Guide

## Requirements
- [Docker](https://www.docker.com)

## Guide

### Create a Discord Application
1. Navigate to the [Applications page](https://discordapp.com/developers/applications)
2. Click on "New Application"
3. On the left side click on Bot and add a Bot to your Application
4. To add your Application to a server go to OAuth2 🡢 URL Generator and select just the `applications.command` Scope. Now copy the url and use it to add your Application.

### Starting the Server
1. Clone this Repository
2. Set your environment variables by copying the `.env.sample` to a file named `.env` and change the values to your own. You find those values on your Discord Application page
3. Run the Server with docker-compose

        docker-compose up --build
        OR
        yarn docker:start

### Adding your URL to Discord
You need to do this step after your server is up and running. Otherwise Discord will not accept your URL. Make sure you have a
URL that is HTTPS and certified and points to your server. If you don't have such an URL you can use the URL from [ngrok](#ngrok).

1. Navigate to your Applications page
2. Go to General Information
3. Scroll down and enter your URL in the field called `Interactions Endpoint URL` and save the changes
4. If it worked Discord will show you a success message and in your server log there should be 2 incoming requests. An authorized one and an unauthorized one.

If that didn't work and Discord doesn't let you save, you need to make sure the Server is running and the URL is pointing to it.

### Ready
Now your Application is ready to use. To test it, head to the Discord Server which you referenced in your `.env` file
and right click on a user or a message and select Apps. Then click on your application. You can also try out slash commands
by typing a `/` in the chat.
        

## ngrok
if you dont have a valid URL or just want to serve the app on your local machine you can use a tool called ngrok. After installing it run
    
    ngrok http 3000 --region eu
Replace 3000 with the port you specified in `.env` and eu with the region you want to use. Ngrok will now show you a URL that points to your server.
