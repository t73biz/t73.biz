After launching an initial site with [Cakephp 3.1](http://cakephp.org), I was aware of a few items that I needed to address before making the site live. I wanted to show a maintenance page, instead of just a blank white screen. (How uninformative.)

So after some google searching, I came across an old article from Mark Story about the [Quick and Dirty](http://mark-story.com/posts/view/quick-and-dirty-down-for-maintenance-page-with-cakephp) method for Cakephp 2.x, and it gave me inspiration to implement my own for Cakephp 3. In the article by Mark, he describes using a switch in the config section. Looks like a good place to start!

---

## Configuration

In the App config <b>(config/app.php)</b>, you need to add in the following key, and subkeys to your App section.
```
'maintenance' => [
    'enabled' => true,
    'message' => 'An optional message that overrrides the default.'
]
```

The enabled subkey is a boolean value that when set to true, will set your site in Maintenance Mode. The message subkey is an optional message with a default message used in the AppController to allow more flexability.

---

## AppController

First, be sure to add Cake Configure to your AppController <b>(src/Controller/AppController.php)</b>.
```php
use Cake\Core\Configure;
```

Next, you need to add the following to your beforeFilter() method.

```php
public function beforeFilter()
{
	if (Configure::read('App.maintenance.enabled')) {
		$message = 'We are currently working on the application, please check back later.';

		if(Configure::check('App.maintenance.message')) {
			$message = Configure::read('App.maintenance.message');
		}

		throw new MaintenanceModeException($message);

		exit();
	}
}
```

This will check your configuration file <b>(config/app.php)</b> for the App maintenance key, as well as the subkeys, enabled and message.

Once the configuration is checked, and the message is set, we throw a new MaintenanceModeException with the provided message.

---

## MaintenanceModeException

This part is where the magic starts to happen. Create a new class called MaintenanceModeException <b>(src/Controller/Exception/MaintenanceModeException.php)</b> and extend it from the Cake Core Exception Class <b>(Cake\Cor\Exception)</b>.

```php

namespace App\Controller\Exception;

use Cake\Core\Exception\Exception;
use Cake\Core\Configure;

class MaintenanceModeException extends Exception
{
	public function __construct($message)
	{
		Configure::write('debug', true);
		parent::__construct($message, 403);
	}
}
```

Since we are most likely in production mode when wanting to use this exception, it is important that we override the debug configuration. The Cakephp ErrorHandler will not render the template for our Maintenance Mode if we are in production mode.

As we are also throwing an exception, we need to send an appropriate status code. I have chose 403 "Forbidden" here as my choice. You can adjust it as you see fit. This will then send that code back to the browser within the response headers.

---

## Template and Layout

Almost done. We need to create 2 more files. The first is maintenance_mode.ctp <b>(src/Template/Error/maintenance_mode.ctp)</b> and include the following in your template.

```php
<?php $this->layout = 'maintenance'; ?>
```

This will be rendered by the ExceptionRederer and the $message variable will be passed in to the template. This also sets the layout to use as maintenance <b>(src/Template/Layout/maintenance.ctp)</b> which we will create next.

```php
<!doctype html>
<html>
	<head>
		<title>My App -<?= h($message) ?></title>
	</head>
	<body>
		<?= $this->fetch('content') ?>
	</body>
</html>
```
Of course you can use whatever layout you would like, I chose this as it doesn't display any actions that might be broken due to maintenance.
