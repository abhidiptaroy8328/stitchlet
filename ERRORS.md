# Stitchlet Errors

## better-sqlite3 ERR_DLOPEN_FAILED in Docker

**What didn't work:** Using `node:22-alpine` as the Docker base image. Alpine uses musl libc, but `better-sqlite3` ships a prebuilt native binary compiled against glibc (`ld-linux-x86-64.so.2`). The binary simply cannot load in a musl environment.

**What worked instead:** Switching to `node:22-slim` (Debian-based, glibc). No rebuild of the native module needed — the prebuilt binary just works.

**Note for next time:** Any native Node addon (`.node` file) compiled against glibc will fail on Alpine. Either use a glibc base image, or compile the addon from source inside Alpine with build tools (`python3`, `make`, `g++`). The glibc base image is almost always simpler.
