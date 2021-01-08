make: futhark_compile wasm_compile

futhark_compile: square.fut
	futhark wasm --library square.fut

wasm_compile:  square.c square.h
	emcc  square.c -o square.js -s EXPORTED_FUNCTIONS="['_futhark_context_config_new','_futhark_context_new', '_futhark_entry_main', '_futhark_context_sync', '_malloc']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["cwrap"]' --post-js futharkClass.js

clean: 
	rm square.c square.h square.wasm square.js
