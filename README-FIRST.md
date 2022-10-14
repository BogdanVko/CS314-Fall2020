# README-FIRST

If you have not yet completed the instructions in [SETTING-UP.md](./SETTING-UP.md), start with them. They will help you download the tools required
to run the code as described in this file.

Here we describe how to run the code, specifically using the [bin/run.sh script](./bin/run.sh).

## Run Configurations

We have two configurations for our code. Here is a brief description of each and when you should use them.

### Development

#### Dev Environment Description

The development environment is the default environment for you to use while
developing your code. First of all, every time you change a file and save it,
the browser that you're viewing the project in will automatically refresh with
the updated code. This allows you to make frequent changes and quickly see them
in your dev environment. Unfortunately, since Java code is compiled (whereas Javascript
is interpreted), we cannot do the same process for the server. You will still need
to restart the server for every change you make.

Additionally, for the development server, the code is delivered "as is" to the client. While
this may seem like it should be the default, it usually isn't, for reasons we will describe below.
Since the code reaches your browser without being changed, you can view it in the browser, which
can help with debugging.

#### Using the Dev Environment

If you don't set the environment variable `CS314_RUN_MODE`, then the run script will default to development mode. To run the 
server in development mode, invoke the run script as is:

```bash
./bin/run.sh
```

This starts two processes:
* the client code running via `npm run devClient` listening on port 3000
* the server code running via `npm run server` listening on port 8000 

Your default browser should open automatically and display the project's
homepage after a few seconds (notice that it is running on `localhost:3000`).
If you see an error banner displayed at the top, it is likely that your JAR is
running on an unexpected port, or is not running at all.

The server listening on port 3000 is the "hot server" which tells the browser
when the code has been changed so it can refresh and get the new code. It
is different from your server which handles API requests from your client,
which listens on port 8000.

### Production

#### Prod Environment Description

While the dev environment is useful for developers, there are a lot of differences between
the dev and prod environments because user demand is different from dev demand.

First, in the prod environment, the client code is "minified". Imagine how big the Javascript
code for a website like Google Maps or Youtube might be. A user with low-throughput internet
might struggle downloading all the code. As a result, we use Webpack to "minify" our code. It
essentially reduces the code to be as small as possible without changing it's functionality.
This is great for users with low bandwith. A side-effect of minification is heavy obfuscation
of the code. This might be good for security purposes, but terrible for developers who might
want to look at the code in the browser while it's running, or get the line number from a
`console.log` statement.

Additionally, the prod environment "packages" resources together. For every image on the
website, this must be downloaded, and an image can be even worse for low-throughput users
than large code. As a result, Webpack will discard any resource which it believes isn't
necessary for running the client. This results in some side-effects. For example, if I am
trying to display an image:

```js
# Method 1
<Img src="./image.jpg />

# Method 2
import image_src from "./image.jpg";
<Img src={image_src} />
```

These normally would do the same thing. However, in the first example, Webpack doesn't
recognize that the image file is a required resource. This means the image won't be
properly packaged, and although it might appear in the dev environment, any user will
be unable to see this image. In the second, Webpack notices the import and does recognize 
the image as a required resource. As a result, you should *always* run your code in prod
once you believe everything is working to ensure that the change in environment leaves
functionality consistent.

#### Using the Prod Environment

The easiest way to run the server and make sure everything works is to use the
run script with the flag to tell which environment to use:

```bash
./bin/run.sh -e prod
```

This will install all npm dependencies (if they haven't been already), bundle
together all of the Javascript source, compile and test your React and Java Code, package
everything into a single JAR, and start running the server on the default port. Visit `http://localhost:8000` 
to see the web page.

Investigate what the run scripts actually do to better understand how our system
is built. All of the commands they run can be run manually as well, to perform a
single step of the build operation only.

### Deployment

Ultimately, you will deploy your production server to a different machine. To
package everything into a single executable jar file to be submitted through
checkin, use the run.sh script with the `-d` flag set:

```bash
./bin/run.sh -d
```

This will create a directory called `target` if it does not already exist and
write the jar file to this directory. This jar can then be copied and ran on 
any other machine with java.

### IntelliJ Run Configurations

In addition to the bash scripts mentioned above, we have provided a set of IntelliJ run configurations for you in
your repository. These can be invoked via the green run button towards the top left of the screen.
