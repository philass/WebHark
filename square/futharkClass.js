futhark_entry_main = Module.cwrap(
  'futhark_entry_main', 'number', ['number', 'number', 'number']
);

futhark_context_config_new = Module.cwrap(
  'futhark_context_config_new', 'number', []
);

futhark_context_new = Module.cwrap(
  'futhark_context_new', 'number', ['number']
);

futhark_context_sync = Module.cwrap(
  'futhark_context_sync', 'number', ['number']
);


class FutharkContext {
  constructor() {
    this.cfg = futhark_context_config_new();
    console.log(this.cfg);
    // Possibly need to allocate some memory here
    this.ctx = futhark_context_new(this.cfg);
    console.log(this.ctx);
  }

  entry_main(x) {
      var data = new Int32Array([23]);
      var nDataBytes = 4;
      var dataPtr = Module._malloc(nDataBytes);

      // Copy data to Emscripten heap (directly accessed from Module.HEAPU8)
      var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
      dataHeap.set(new Uint8Array(data.buffer));

      // Call function and get result
      futhark_entry_main(this.ctx, dataHeap.byteOffset, x);
      var result = new Int32Array(dataHeap.buffer, dataHeap.byteOffset, 1);
      console.log("Printing the result below ...");
      console.log(result);
      console.log(result[0]);
      futhark_context_sync(this.ctx);
      return result[0];
  }
}
