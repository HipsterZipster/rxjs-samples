/**
 * Created by hipsterzipster on 5/18/15.
 */

function callbackHell() {
	print('...');
	print('Callback Hell');
	print('...');
	app.get('/index', function(req, res, next) {
		User.get(req.params.userId, function(err, user) {
			if (err) next(err);
			db.find({
				user: user.name
			}, function(err, cursor) {
				if (err) next(err);
				cursor.toArray(function(err, items) {
					if (err) next(err);
					res.send(items);
				});
			});
		});
	});
}

function promises() {
	// simple iterative each subscriber gets all updates before others
	print('...');
	print('Promises Approach');
	print('...');

	tweetsAsync()
		.then(function(a) {
			return usersAsync(a);
		})
		.then(function(b) {
			return locationAsync(b);
		})
		.done(function(c) {
			render();
		});
	//composition
	//clean up handlers
	//perform operations on streams like merge, filter, aggregate
	//do we need to keep state to do these operations?
}

function multicast() {
	print('...');
	print('Multicast Subscribe Approach');
	print('...');
	var source = Rx.Observable.create(function(observer) {
		// Yield a single value and complete
		observer.onNext(42);
		observer.onCompleted();
		observer.onNext(50); // never gets here
		// Any cleanup logic might go here
		return function() {
			print('Disposed observer: ' + JSON.stringify(observer), 'Observable');
		}
	}).publish();
	var subscriptionA = source.subscribe(createObserver('Observer A'));
	var subscriptionB = source.subscribe(createObserver('Observer B'));
	source.connect();
}

function multicastRefCount() {
	print('...');
	print('Multicast Reference Counting Subscribe Approach');
	print('...');
	var source = Rx.Observable.create(function(observer) {
		// Yield a single value and complete
		observer.onNext(42);
		observer.onCompleted();
		observer.onNext(50); // never gets here
		// Any cleanup logic might go here
		return function() {
			print('Disposed observer: ' + JSON.stringify(observer), 'Observable');
		}
	}).share();

	var subscriptionA = source.subscribe(createObserver('Observer A'));
	var subscriptionB = source.subscribe(createObserver('Observer B'));

}

multicast();
multicastRefCount();


// subscribe returns a disposable to allow unsubscription from a sequence.
// you only need to call dispose when u wanna unsubscribe early or when the source observable has a longer life span than the observer.
// default
/*subscriptionA.dispose();*/

// disposing the subscription disposes the Observable since no one else is listening
/*subscriptionB.dispose();*/