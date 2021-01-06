make: futhark_compile wasm_compile

futhark_compile: square.fut
	futhark wasm --library square.fut

wasm_compile: square_fun.c square.c square.h
	emcc square_fun.c square.c -o square.js -s EXPORTED_FUNCTIONS="['_square_fun', '_malloc']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["cwrap"]'

clean: 
	rm square.c square.h square.wasm square.js
