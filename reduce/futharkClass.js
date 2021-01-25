futhark_context_config_new = Module.cwrap(
  'futhark_context_config_new', 'number', []
);

futhark_context_new = Module.cwrap(
  'futhark_context_new', 'number', ['number']
);

futhark_context_sync = Module.cwrap(
  'futhark_context_sync', 'number', ['number']
);

futhark_i64_1d = Module.cwrap(
  'futhark_new_i64_1d', 'number', ['number', 'number', 'number']
);


futhark_entry_main = Module.cwrap(
  'futhark_entry_main', 'number', ['number', 'number', 'number']
);


function initData(data) {
  var nDataBytes = data.BYTES_PER_ELEMENT;
  var dataPtr = Module._malloc(nDataBytes);
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));
  return dataHeap
}


function initArr(data) {
  var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
  var dataPtr = Module._malloc(nDataBytes);
  var dataHeap = new Uint8Array(Module.HEAPU8.buffer, dataPtr, nDataBytes);
  dataHeap.set(new Uint8Array(data.buffer));
  return dataHeap
}

class FutharkContext {
  constructor() {
    this.cfg = futhark_context_config_new();
    this.ctx = futhark_context_new(this.cfg);
  }


  main(in1) {
    var dataHeap0 = initData(new BigInt64Array(1));
    var dataHeap1 = initArr(in1);
    var arr = futhark_i64_1d(this.ctx, dataHeap1.byteOffset, in1.length);

    futhark_entry_main(this.ctx, dataHeap0.byteOffset, arr);
    var res0 = new BigInt64Array(dataHeap0.buffer, dataHeap0.byteOffset, 1);

    futhark_context_sync(this.ctx);
    return [res0[0]];
  }


}
