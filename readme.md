#Timer

use a single timer to run functions at given periods

let's have two functions run at different periods:

```javascript

var fizz = function() { console.log('fizz'); };
var buzz = function() { console.log('buzz'); };

var timer = new Timer();

timer.add(fizz, 3000);
timer.add(buzz, 5000);

timer.start();

// will log fizz every 3seconds and buzz every 5

timer.stop();

// will pause the current timer

timer.reset();

// will reset the count back to zero (3secs to fizz, 5 to buzz)

timer.start();

// will log fizz every 3 seconds and buzz every 5

timer.stop(fizz);

// will only buzz

timer.start(fizz);

// will start fizz from where it last was

timer.remove(buzz);

// will stop buzz entirely and remove

timer.add(buzz, 5000);

// will start buzz up again
```
