import time
import argparse

from .init import init_driver
from .tests.sample import start_sample

# セレニウムプロセス開始
def start_selenium():
  parser = argparse.ArgumentParser()
  parser.add_argument("test_name", nargs="?", default="none")

  args = parser.parse_args()

  print("test_name: " + args.test_name)

  driver = init_driver()

  driver.get("http://localhost:3000/")

  time.sleep(0.2)

  if args.test_name == "sample":
    start_sample(driver)

  input("Enter押すまで終了しない...")
