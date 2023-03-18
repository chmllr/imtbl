#!/bin/sh

set -x

rustup set profile minimal
rustup toolchain install 1.61.0
rustup override set 1.61.0
rustup target add wasm32-unknown-unknown

cargo build --target wasm32-unknown-unknown --release --package $1
WASM_FILE=target/wasm32-unknown-unknown/release/$1.wasm
ic-cdk-optimizer $WASM_FILE -o $WASM_FILE
gzip -nf9v $WASM_FILE
cp $WASM_FILE.gz ./build/canister.wasm.gz
