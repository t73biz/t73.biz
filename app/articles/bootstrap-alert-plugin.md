While working on a project recently, I had the need to update the user with information regarding ajax updates/saves. I created a simple plugin, that works nicely, although there isn't much flexibility, but this is due to the simple need in the situation.

I am using [Bootstrap 3.0](http://getbootstrap.com) and [jQuery 1.10.2](http://jquery.com) for this solution. The jsfiddle demo can be found at http://jsfiddle.net/t73biz/tGdkF/12/. It is using a local copy of the plugin and remote usage of the Bottstrap 3.0 library. There is a [gist](https://gist.github.com/t73biz/b8948e27611923aa2429) of the Alert Plugin, and has three options for it.

## Options

```
throb:boolean (default: false)
```

The first option, throb, will strobe the alert to draw attention to it. This is handy if your alert section isn't in an atypical location and you want to be sure that your users will notice the alert.

```
class:string (default: 'success')
```

The second option, class, is the suffix class value based on Bootstraps alert context. Valid values are success, info, warning, and danger. Also of note, if the class is set to 'success', it will fadeout and be removed from the dom after 5 seconds. This is accomplished via setTimeout.

```
message:string (default: '')
```

The last option, is simply a message that you want to supply to the alert and your users. This is a required field since the default is left empty.

## Usage

The usage for this plugin is fairly straight forward and can be used in just about any place needed. The demonstration here will walk you through the steps for using the plugin.

## Step 1 - Html Setup

You will need to setup your Bootstrap, jQuery, and Plugin inside of a basic html template, and then add in the section that you would like to have hold the alerts. For demonstration purposes, I am also going to add a button to the setup to be able to trigger the plugin with. 

```
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Bootstrap Alert Plugin</title>
        <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    </head>
    <body>
        <button id="successBtn">
            Add a success alert.
        </button>
        <div id="alertBox"></div>
        <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        <script src="https://gist.githubusercontent.com/t73biz/b8948e27611923aa2429/raw/f565916ab46abb85c839601803f06b3ff76814e7/boot_alert.js"></script>
    </body>

```

It should be noted, that this will also work with jQuery 2.x 

## Step 2 - JS Setup

Next, you will need to setup your javascript that you need to run, after the jQuery core script, and plugin script have loaded. You can do this inline on the html page, or from a seperate js file. I prefer to have mine seperate.

```
jQuery(document).ready(
    function($)
    {
        $('#successBtn').click(
            function ()
            {
                $('#alertBox').addAlert({
                    throb: true,
                    message: 'You clicked success!'
                });
            }
        );
    }
);
```

### Step 3 - CSS Setup (Optional)

You can set your alert box to be displayed all of the time by applying a fixed position to it, and this will ensure that your alerts will be seen, no matter where the user has scrolled to.

```
#alertBox {
    position: fixed;
    top: 50px;
}
	
```

## Wrap Up

This small plugin I hope will help someone to update their users and can be used freely. If you have any questions, thoughts, ideas, rants, let me know.

Until next time,

Ron
