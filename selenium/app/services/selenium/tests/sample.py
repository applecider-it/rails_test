import time
from selenium.webdriver.common.by import By

# サンプルテスト開始
def start_sample(driver):
  _setup(driver)
  _test(driver)

# セットアップ
def _setup(driver):
  link = driver.find_element(By.LINK_TEXT, "development")
  link.click()

  time.sleep(0.2)

  link = driver.find_element(By.LINK_TEXT, "view_test")
  link.click()

  time.sleep(0.2)

# テスト実行
def _test(driver):
  radio = driver.find_element(By.ID, "view_test_form_radio_val_val2")
  radio.click()

  time.sleep(0.5)

  btn = driver.find_element(By.CSS_SELECTOR, 'input[value="送信"]')
  btn.click()

  time.sleep(0.5)

  radio = driver.find_element(By.ID, "view_test_form_radio_val_val2")

  print(radio.is_selected())
