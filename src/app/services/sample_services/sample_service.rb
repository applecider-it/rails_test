class SampleServices::SampleService
  def initialize
    @sub_service = SubService.new
  end

  def test_exec(val)
    @sub_service.sub_exec(val)
  end
end
