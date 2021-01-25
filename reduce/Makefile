wasm_compile:  reduce.c reduce.h
	emcc  reduce.c -o reduce.js -s EXPORTED_FUNCTIONS="['_futhark_new_i64_1d', '_futhark_context_config_new','_futhark_context_new', '_futhark_entry_main', '_futhark_context_sync', '_malloc']" -s 'EXTRA_EXPORTED_RUNTIME_METHODS=["cwrap"]' --post-js futharkClass.js
