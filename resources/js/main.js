(function(){
	
	var obj = {
		test: "test",
		test2: "test2"
	};


	function checker(/* validators */){
		var validators = _.toArray(arguments);

		return function(obj){
			return _.reduce(validators, function(errs, check){
				if(check(obj)){
					return errs;
				}else{
					return _.chain(errs).push(check.message).value();
				}
			}, []);
		};
	}

	function validator(message, fun){
		var f = function(/* args */){
			return fun.apply(fun, arguments);
		};

		f['message'] = message;
		return f;
	}

	function truthy(x){
		return x != null;
	}

	function not(f){
		return function(){
			return !f.apply(f, arguments);
		}
	}

	function composite(pred){
		return function(x, y){
			if(x === y){
				return 0;
			}
			if(pred(x, y)){
				return 1;
			}else{
				return -1;
			}
		};
	}

	var falsy = not(truthy);

	var greater = function(x, y){ return x > y; };
	var fewer = not(greater);

	var greaterString = function(x, y){
		return x.toString() > y.toString();
	};

	var greaterThan = composite(greater);
	var fewerThan = composite(fewer);

	var greaterThanString = composite(greaterString);

	function hasKeys(/* keys */){
		var keys = _.toArray(arguments);

		var f = function(obj){
			return _.every(keys, function(k){
				return _.has(obj, k);
			});
		};

		f.message = ["Must have values for keys:"].concat(keys).join(" ");
		return f;
	}

	var truthyValidator = validator("Obj is Null", truthy);

	var checkObj = checker(truthyValidator, hasKeys("test", "test2"));

	var arr = [6,5,8,3,56,98];
	var test = arr.sort(greaterThanString);

	console.log(test);

})();