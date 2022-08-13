use ic_cdk::api::call::{arg_data_raw, reply_raw};
use ic_cdk_macros::*;

mod assets;

#[init]
fn init() {
    assets::load();
}

#[pre_upgrade]
fn pre_upgrade() {}

#[post_upgrade]
fn post_upgrade() {
    assets::load();
}

#[export_name = "canister_query greet"]
fn greet() {
    let name: String = parse(&arg_data_raw());
    reply(format!("Hello {}!", name));
}

fn parse<'a, T: serde::Deserialize<'a>>(bytes: &'a [u8]) -> T {
    serde_json::from_slice(bytes).expect("couldn't parse the input")
}

fn reply<T: serde::Serialize>(data: T) {
    reply_raw(serde_json::json!(data).to_string().as_bytes());
}
