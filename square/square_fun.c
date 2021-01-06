#include "square.h"

int square_fun(int input, int* output) {

  struct futhark_context_config *cfg = futhark_context_config_new();
  struct futhark_context *ctx = futhark_context_new(cfg);

  futhark_entry_main(ctx, output, input);
  futhark_context_sync(ctx);

  futhark_context_free(ctx);
  futhark_context_config_free(cfg);

  return 0;
}
