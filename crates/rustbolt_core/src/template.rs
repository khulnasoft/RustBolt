use std::sync::LazyLock;

use regex::Regex;

pub struct Template;
static COMMENT_END_REGEX: LazyLock<Regex> =
  LazyLock::new(|| Regex::new(r"\*\/").expect("should construct regex"));

impl Template {
  pub fn to_comment(str: &str) -> String {
    if str.is_empty() {
      return String::new();
    }
    format!("/*! {} */", COMMENT_END_REGEX.replace(str, "* /"))
  }

  pub fn to_normal_comment(str: &str) -> String {
    if str.is_empty() {
      return String::new();
    }
    format!("/* {} */", COMMENT_END_REGEX.replace(str, "* /"))
  }
}
