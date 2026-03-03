# 開発者向けページのFormテスト管理
class DevelopmentServices::FormService
  # テスト用フォームデータ
  def form_data
    form = ViewTestForm.new
    form.list_val = 2
    form.radio_val = "val1"
    form.datetime_val = "2026-02-15T14:30"

    list_vals = {
      1 => "No. 1",
      2 => "No. 2",
      3 => "No. 3"
    }
    radio_vals = {
      "val1" => "Value 1",
      "val2" => "Value 2"
    }

    {
      form: form,
      list_vals: list_vals,
      radio_vals: radio_vals,
    }
  end
end
